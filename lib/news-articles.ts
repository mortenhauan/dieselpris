export interface NewsSource {
  href: string;
  label: string;
}

export interface NewsArticle {
  id: string;
  category: string;
  intro: string;
  publishedAt: string;
  sources: NewsSource[];
  summary: string;
  takeawayTitle: string;
  takeaways: string[];
  title: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    category: "Oppfølging",
    id: "regjeringen-folger-opp-fra-1-april",
    intro:
      "Finansdepartementet sier at veibruksavgiften på drivstoff settes til 0 fra 1. april. For diesel tilsvarer det 2,85 kroner lavere pumpepris per liter inkludert mva hvis hele kuttet slår ut i prisen.",
    publishedAt: "30. mars 2026",
    sources: [
      {
        href: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
        label: "Regjeringen: oppfølging av vedtaket",
      },
      {
        href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811",
        label: "Stortinget: vedtakene",
      },
    ],
    summary:
      "Dette er den mest konkrete beskjeden vanlige bilister har fått så langt. Regjeringen skriver at selve veibruksavgiften på diesel reduseres med 2,28 kroner per liter, og at dette blir 2,85 kroner per liter når merverdiavgift regnes med. De understreker samtidig at dette gjelder dersom avgiftskuttet faktisk veltes over i pumpeprisen.",
    takeawayTitle: "Hva betyr dette for deg?",
    takeaways: [
      "Diesel kan bli merkbart billigere i perioden 1. april til 1. september.",
      "Prisen på stasjonen kan fortsatt variere fra sted til sted og fra dag til dag.",
      "Oljepris, kronekurs og konkurranse mellom kjedene påvirker fortsatt totalprisen.",
    ],
    title: "Regjeringen sier dieselavgiften kuttes fra 1. april",
  },
  {
    category: "Vedtak",
    id: "stortinget-har-vedtatt-midlertidig-kutt",
    intro:
      "Stortinget har ferdigbehandlet saken om midlertidig kutt i drivstoffavgiftene. På vedtakssiden står det at veibruksavgiften settes til 0 kroner i en avgrenset periode.",
    publishedAt: "26. mars 2026",
    sources: [
      {
        href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=107811",
        label: "Stortinget: saksgang og status",
      },
      {
        href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811",
        label: "Stortinget: vedtak og satser",
      },
    ],
    summary:
      "For folk flest er hovedpoenget enkelt: Stortinget har sagt ja til et midlertidig kutt i veibruksavgiften på bensin og autodiesel. Vedtaket sier at satsen settes til 0 kroner fra 1. april, eller senest fra 1. mai dersom det er strengt nødvendig, og at ordningen skal vare til 1. september 2026.",
    takeawayTitle: "Det viktigste å få med seg",
    takeaways: [
      "Dette er et vedtak, ikke bare et forslag.",
      "Kuttet er midlertidig og varer ikke hele året.",
      "Det er veibruksavgiften som fjernes i perioden, ikke alle deler av pumpeprisen.",
    ],
    title: "Stortinget har vedtatt midlertidig kutt i drivstoffavgiftene",
  },
  {
    category: "Forklart",
    id: "co2-avgiften-er-fortsatt-ikke-helt-avklart",
    intro:
      "Ikke alle CO2-endringene er klare ennå. Regjeringen skriver at noen deler kan settes i verk med en gang, mens andre må avklares først.",
    publishedAt: "30. mars 2026",
    sources: [
      {
        href: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
        label: "Regjeringen: hva som er iverksatt nå",
      },
      {
        href: "https://www.stortinget.no/no/Saker-og-publikasjoner/Vedtak/Vedtak/Sak/?p=107811",
        label: "Stortinget: hele CO2-vedtaket",
      },
    ],
    summary:
      "Stortinget vedtok også flere endringer i CO2-avgiften på mineralske produkter. Regjeringen skriver likevel at bare enkelte deler iverksettes fra 1. april nå, og at resten må vurderes nærmere fordi de kan reise praktiske spørsmål og spørsmål om statsstøtte i EØS. Kort sagt: det som er vedtatt, og det som er gjennomført akkurat nå, er ikke helt det samme ennå.",
    takeawayTitle: "Slik er det enklest å lese saken",
    takeaways: [
      "Skille mellom hva Stortinget har vedtatt og hva regjeringen har rukket å sette i verk.",
      "For vanlige dieselkunder er beskjeden om veibruksavgiften foreløpig den enkleste og tydeligste delen.",
      "CO2-reglene kan bli justert igjen når avklaringene er ferdige.",
    ],
    title: "CO2-avgiften er fortsatt ikke helt avklart",
  },
];
