export type RegionId =
  | "national"
  | "ost"
  | "sor"
  | "vest"
  | "midt"
  | "nord";

export type RegionPriceProfile = {
  id: RegionId;
  label: string;
  shortLabel: string;
  distributionNokPerLiter: number;
  summary: string;
  factors: string[];
};

export const DEFAULT_REGION_ID: RegionId = "national";

export const REGION_PRICE_PROFILES: ReadonlyArray<RegionPriceProfile> = [
  {
    id: "national",
    label: "Norge (snitt)",
    shortLabel: "Norge",
    distributionNokPerLiter: 3.5,
    summary: "Bruker nasjonalt snitt for distribusjon og margin i estimatet.",
    factors: [
      "Gir et nøytralt utgangspunkt når du ikke har valgt region.",
      "Skal tolkes som et prisestimat, ikke en live stasjonspris.",
    ],
  },
  {
    id: "ost",
    label: "Østlandsområdet",
    shortLabel: "Østlandet",
    distributionNokPerLiter: 3.2,
    summary:
      "Ofte lavere påslag i områder med mange stasjoner og høy omsetning.",
    factors: [
      "Tett mellom stasjonene gir ofte hardere lokal priskonkurranse.",
      "Høy trafikk og stort volum kan gi lavere kostnad per liter.",
      "Prisen kan fortsatt variere mye mellom kjeder og bydeler.",
    ],
  },
  {
    id: "sor",
    label: "Sørlandet",
    shortLabel: "Sørlandet",
    distributionNokPerLiter: 3.35,
    summary:
      "Ligger ofte nær snittet, men påvirkes av sesongtrafikk og lokal konkurranse.",
    factors: [
      "Kysttrafikk og ferietrafikk kan gi større utslag i perioder.",
      "Noen områder har tett konkurranse, andre har langt mellom stasjonene.",
      "Lokale kampanjer og kjedemiks betyr ofte mer enn landsdel alene.",
    ],
  },
  {
    id: "vest",
    label: "Vestlandet",
    shortLabel: "Vestlandet",
    distributionNokPerLiter: 3.45,
    summary:
      "Store forskjeller mellom byområder og mer krevende kyst- og fjordlogistikk.",
    factors: [
      "Byområder kan ha sterk konkurranse og lavere påslag.",
      "Fjorder, ferger og mer krevende logistikk kan trekke kostnaden opp andre steder.",
      "Prisforskjellen mellom nabostasjoner kan fortsatt være stor samme dag.",
    ],
  },
  {
    id: "midt",
    label: "Midt-Norge",
    shortLabel: "Midt-Norge",
    distributionNokPerLiter: 3.7,
    summary:
      "Litt høyere modellert påslag enn snittet, særlig utenfor de største markedene.",
    factors: [
      "Lengre avstander og færre alternative stasjoner kan gi svakere pristrykk.",
      "Byområder kan ligge lavere enn distriktene i samme region.",
      "Vær, vinterdrift og lokal logistikk kan gi ekstra utslag.",
    ],
  },
  {
    id: "nord",
    label: "Nord-Norge",
    shortLabel: "Nord-Norge",
    distributionNokPerLiter: 4.1,
    summary:
      "Høyest modellert påslag på grunn av lange avstander og mer krevende logistikk.",
    factors: [
      "Lange transportetapper gir ofte høyere kostnader per liter.",
      "Færre stasjoner og svakere lokal konkurranse kan holde prisene oppe.",
      "Vær og regularitet i transporten kan gi større variasjon enn sørpå.",
    ],
  },
] as const;

export function getRegionPriceProfile(regionId?: RegionId): RegionPriceProfile {
  return (
    REGION_PRICE_PROFILES.find(
      (profile) => profile.id === (regionId ?? DEFAULT_REGION_ID),
    ) ?? REGION_PRICE_PROFILES[0]
  );
}
