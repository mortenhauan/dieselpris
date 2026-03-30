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
    category: "Forklart",
    intro:
      "Olje handles i dollar. Når kronen er svak, betaler du mer for diesel – selv om oljeprisen er stabil. Slik fungerer det.",
    publishedAtIso: "2025-06-15T10:00:00+02:00",
    slug: "kronekursen-og-dieselprisen-en-sammenheng-fa-tenker-pa",
    title: "Kronekursen og dieselprisen – en sammenheng få tenker på",
  },
  {
    category: "Nyhet",
    intro:
      "CO₂-avgiften på diesel øker 25 prosent fra nyttår. Samlet betaler du 43 øre mer per liter i faste avgifter fra 1. januar 2024.",
    publishedAtIso: "2023-12-19T17:00:00+01:00",
    slug: "dieselavgiftene-for-2024-co2-avgiften-stiger-videre",
    title: "Dieselavgiftene for 2024: CO₂-avgiften stiger videre",
  },
  {
    category: "Bakgrunn",
    intro:
      "Brent-oljen falt 19 prosent i 2025. Likevel endte norske dieselpriser høyere enn året før. Her er forklaringen.",
    publishedAtIso: "2026-01-10T12:00:00+01:00",
    slug: "oljearet-2025-prisen-falt-men-dieselen-ble-dyrere",
    title: "Oljeåret 2025: prisen falt, men dieselen ble dyrere",
  },
  {
    category: "Nyhet",
    intro:
      "CO₂-avgiften på diesel øker 20 prosent fra nyttår. Samlet betaler du 60 øre mer per liter i faste avgifter fra 1. januar 2025.",
    publishedAtIso: "2024-12-13T17:00:00+01:00",
    slug: "dieselavgiftene-for-2025-nok-et-ar-med-okt-co2-avgift",
    title: "Dieselavgiftene for 2025: nok et år med økt CO₂-avgift",
  },
  {
    category: "Forklart",
    intro:
      "Råolje, raffineringsmargin, distribusjon og avgifter – slik blir prisen du betaler ved pumpa.",
    publishedAtIso: "2025-02-15T10:00:00+01:00",
    slug: "slik-settes-dieselprisen-fra-oljefat-til-pumpe",
    title: "Slik settes dieselprisen: fra oljefat til pumpe",
  },
  {
    category: "Forklart",
    intro:
      "23 land bestemmer hvor mye olje verden får. I 2025 har de åpnet kranene – og det merkes på pumpa.",
    publishedAtIso: "2025-09-15T11:00:00+02:00",
    slug: "hva-er-opec-og-hva-har-de-med-dieselprisen-a-gjore",
    title: "Hva er OPEC+ og hva har de med dieselprisen å gjøre?",
  },
  {
    category: "Nyhet",
    intro:
      "Fra 1. april fjernes veibruksavgiften midlertidig. For vanlig diesel kan det bety rundt 2,85 kroner billigere per liter på pumpa.",
    publishedAtIso: "2026-03-30T13:00:00+02:00",
    slug: "drivstoffavgiftene-kuttes-fra-1-april",
    title: "Drivstoffavgiftene kuttes fra 1. april – dette er det som skjer",
  },
  {
    category: "Nyhet",
    intro:
      "CO₂-avgiften på diesel øker med over 60 øre per liter fra nyttår. For et vogntog betyr det over 23 000 kroner mer i året.",
    publishedAtIso: "2025-12-22T18:00:00+01:00",
    slug: "dieselavgiftene-for-2026-er-vedtatt",
    title: "Dieselavgiftene for 2026 er vedtatt",
  },
  {
    category: "Nyhet",
    intro:
      "Et bredt flertall stemte ned Senterpartiets forslag om å stanse ETS2. Den nye EU-kvoteprisen på drivstoff kommer til Norge, trolig fra 2028.",
    publishedAtIso: "2026-02-03T13:00:00+01:00",
    slug: "stortinget-sa-ja-til-ets2",
    title: "Stortinget sa ja til ETS2 – forslaget om å stoppe ble nedstemt",
  },
  {
    category: "Forklart",
    intro:
      "Stortinget debatterer om Norge skal stoppe ETS2 – et nytt EU-system som kan legge en ekstra kvotepris oppå dieselavgiftene du allerede betaler.",
    publishedAtIso: "2026-01-29T14:00:00+01:00",
    slug: "kan-eu-kreve-ny-avgift-pa-diesel-i-norge",
    title: "Kan EU kreve ny avgift på diesel i Norge?",
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
      "Stortinget vedtok nye CO₂-satser for flere drivstofftyper, men regjeringen sier at ikke alt kan settes i verk med en gang.",
    publishedAtIso: "2026-03-30T09:00:00+02:00",
    slug: "co2-kutt-som-ikke-er-klare-enda",
    title: "Flere CO₂-kutt er vedtatt, men ennå ikke satt i verk",
  },
  {
    category: "Nyhet",
    intro:
      "Angrepet på Iran og stenging av Hormuz-stredet har sendt oljeprisen til 119 dollar fatet. Dieselen har passert 30 kroner literen.",
    publishedAtIso: "2026-03-20T14:00:00+01:00",
    slug: "krig-i-midtosten-sender-dieselprisen-over-30-kroner",
    title: "Krig i Midtøsten sender dieselprisen over 30 kroner",
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
