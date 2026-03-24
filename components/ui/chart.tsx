"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type {
  DefaultLegendContentProps,
  DefaultTooltipContentProps,
  TooltipPayloadEntry,
  TooltipProps,
} from "recharts";

import { cn } from "@/lib/utils";

const THEMES = { dark: ".dark", light: "" } as const;

const INITIAL_DIMENSION = { height: 200, width: 320 } as const;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

interface ChartContextProps {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextProps | null>(null);

const useChart = function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
};

const getPayloadConfigFromPayload = function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
};

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const cssText = React.useMemo(() => {
    const colorConfig = Object.entries(config).filter(
      ([, item]) => item.theme ?? item.color
    );

    if (!colorConfig.length) {
      return "";
    }

    return Object.entries(THEMES)
      .map(
        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`
      )
      .join("\n");
  }, [config, id]);

  const styleRef = React.useRef<HTMLStyleElement>(null);

  React.useLayoutEffect(() => {
    const node = styleRef.current;
    if (node) {
      node.textContent = cssText;
    }
  }, [cssText]);

  if (!cssText) {
    return null;
  }

  return <style ref={styleRef} suppressHydrationWarning />;
};

const ChartContainer = function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
  initialDimension?: { width: number; height: number };
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replaceAll(":", "")}`;

  const chartContextValue = React.useMemo(() => ({ config }), [config]);

  return (
    <ChartContext.Provider value={chartContextValue}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={initialDimension}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const tooltipEntryKey = function tooltipEntryKey(
  item: TooltipPayloadEntry,
  resolvedKey: string
): string {
  const gid = item.graphicalItemId;
  if (typeof gid === "string" || typeof gid === "number") {
    return String(gid);
  }
  return [
    resolvedKey,
    String(item.dataKey ?? ""),
    String(item.name ?? ""),
    String(item.value ?? ""),
    String(item.color ?? ""),
  ].join("|");
};

const ChartTooltipPayloadDefaultRow = function ChartTooltipPayloadDefaultRow({
  hideIndicator,
  indicator,
  indicatorColor,
  item,
  itemConfig,
  nestLabel,
  tooltipLabel,
}: {
  hideIndicator: boolean;
  indicator: "line" | "dot" | "dashed";
  indicatorColor: string | undefined;
  item: TooltipPayloadEntry;
  itemConfig: ReturnType<typeof getPayloadConfigFromPayload>;
  nestLabel: boolean;
  tooltipLabel: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
        indicator === "dot" && "items-center"
      )}
    >
      {itemConfig?.icon ? (
        <itemConfig.icon />
      ) : (
        hideIndicator === false && (
          <div
            className={cn(
              "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
              {
                "h-2.5 w-2.5": indicator === "dot",
                "my-0.5": nestLabel && indicator === "dashed",
                "w-0 border-[1.5px] border-dashed bg-transparent":
                  indicator === "dashed",
                "w-1": indicator === "line",
              }
            )}
            style={
              {
                "--color-bg": indicatorColor,
                "--color-border": indicatorColor,
              } as React.CSSProperties
            }
          />
        )
      )}
      <div
        className={cn(
          "flex flex-1 justify-between leading-none",
          nestLabel ? "items-end" : "items-center"
        )}
      >
        <div className="grid gap-1.5">
          {nestLabel ? tooltipLabel : null}
          <span className="text-muted-foreground">
            {itemConfig?.label ?? item.name}
          </span>
        </div>
        {item.value === null ? null : (
          <span className="text-foreground font-mono font-medium tabular-nums">
            {typeof item.value === "number"
              ? item.value.toLocaleString()
              : String(item.value)}
          </span>
        )}
      </div>
    </div>
  );
};

const ChartTooltipPayloadRow = function ChartTooltipPayloadRow({
  color,
  config,
  formatter,
  hideIndicator,
  indicator,
  item,
  index,
  nameKey,
  nestLabel,
  payload,
  tooltipLabel,
}: {
  color?: string;
  config: ChartConfig;
  formatter?: DefaultTooltipContentProps["formatter"];
  hideIndicator: boolean;
  indicator: "line" | "dot" | "dashed";
  item: TooltipPayloadEntry;
  index: number;
  nameKey?: string;
  nestLabel: boolean;
  payload: readonly TooltipPayloadEntry[];
  tooltipLabel: React.ReactNode;
}) {
  const resolvedKey = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
  const itemConfig = getPayloadConfigFromPayload(config, item, resolvedKey);
  const indicatorColor = color ?? item.payload?.fill ?? item.color;

  if (formatter && item?.value !== undefined && item.name) {
    return (
      <div
        className={cn(
          "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
          indicator === "dot" && "items-center"
        )}
      >
        {formatter(item.value, item.name, item, index, payload)}
      </div>
    );
  }

  return (
    <ChartTooltipPayloadDefaultRow
      hideIndicator={hideIndicator}
      indicator={indicator}
      indicatorColor={indicatorColor}
      item={item}
      itemConfig={itemConfig}
      nestLabel={nestLabel}
      tooltipLabel={tooltipLabel}
    />
  );
};

const ChartTooltipContent = function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: TooltipProps &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  } & Omit<DefaultTooltipContentProps, "accessibilityLayer">) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {nestLabel ? null : tooltipLabel}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item: TooltipPayloadEntry, index: number) => {
            const resolvedKey = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
            return (
              <ChartTooltipPayloadRow
                key={tooltipEntryKey(item, resolvedKey)}
                color={color}
                config={config}
                formatter={formatter}
                hideIndicator={hideIndicator}
                indicator={indicator}
                item={item}
                index={index}
                nameKey={nameKey}
                nestLabel={nestLabel}
                payload={payload}
                tooltipLabel={tooltipLabel}
              />
            );
          })}
      </div>
    </div>
  );
};

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean;
  nameKey?: string;
} & DefaultLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const legendKey = [
            key,
            String(item.dataKey ?? ""),
            String(item.value ?? ""),
            String(item.color ?? ""),
          ].join("|");

          return (
            <div
              key={legendKey}
              className="[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
};

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
