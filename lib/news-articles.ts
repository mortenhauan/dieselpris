export interface NewsSource {
  href: string;
  label: string;
}

export interface NewsIndexEntry {
  category: string;
  intro: string;
  publishedAtIso: string;
  slug: string;
  title: string;
}

const dateFormatter = new Intl.DateTimeFormat("nb-NO", {
  day: "numeric",
  month: "long",
  timeZone: "Europe/Oslo",
  year: "numeric",
});

export const formatNewsDate = function formatNewsDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
};

const entries: NewsIndexEntry[] = [
  {
    category: "Nyhet",
    intro:
      "Fra 1. april fjernes veibruksavgiften midlertidig. For vanlig diesel kan det bety rundt 2,85 kroner billigere per liter på pumpa.",
    publishedAtIso: "2026-03-30T13:00:00+02:00",
    slug: "drivstoffavgiftene-kuttes-fra-1-april",
    title: "Drivstoffavgiftene kuttes fra 1. april – dette er det som skjer",
  },
  {
    category: "Forklart",
    intro:
      "Vedtaket behandler ikke all diesel likt. Autodiesel, anleggsdiesel, fiske og sjøfart får forskjellige endringer, og ikke alt er klart ennå.",
    publishedAtIso: "2026-03-30T11:00:00+02:00",
    slug: "slik-pavirkes-autodiesel-anleggsdiesel-og-sjofart",
    title: "Slik påvirkes prisen for autodiesel, anleggsdiesel og sjøfart",
  },
  {
    category: "Forklart",
    intro:
      "Stortinget vedtok nye CO2-satser for flere drivstofftyper, men regjeringen sier at ikke alt kan settes i verk med en gang.",
    publishedAtIso: "2026-03-30T09:00:00+02:00",
    slug: "co2-kutt-som-ikke-er-klare-enda",
    title: "Flere CO2-kutt er vedtatt, men ennå ikke satt i verk",
  },
  {
    category: "Bakgrunn",
    intro:
      "Høyre la frem forslaget tirsdag 25. mars. Dagen etter hadde Stortinget debattert, stemt og vedtatt de største avgiftskuttene på drivstoff i nyere norsk historie.",
    publishedAtIso: "2026-03-26T19:00:00+01:00",
    slug: "fra-forslag-til-vedtak-pa-to-dager",
    title: "Fra forslag til vedtak på to dager",
  },
];

export const NEWS_INDEX: NewsIndexEntry[] = [...entries].toSorted(
  (a, b) =>
    new Date(b.publishedAtIso).getTime() - new Date(a.publishedAtIso).getTime()
);

export const getAllNewsSlugs = function getAllNewsSlugs(): string[] {
  return NEWS_INDEX.map((e) => e.slug);
};
