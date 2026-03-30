interface JsonLdProps {
  data: Record<string, unknown>;
}

export const JsonLd = function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      // oxlint-disable-next-line react/no-danger -- static JSON-LD from server
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
};
