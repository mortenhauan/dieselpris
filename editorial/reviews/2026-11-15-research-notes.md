# Nyhetsresearch 15. november 2026

Kun utkast. Ingen nye artikler er publisert, registrert i NEWS_INDEX eller tatt inn i sitemap. Siste offentlige artikkel i arbeidsgrunnlaget var 21. august 2026. Septemberteksten er bevart som upublisert referanse og brukes ikke som en ny publisert hendelse.

## Valgte saker

1. **2027-budsjettets ulike utslag for autodiesel og anleggsdiesel.** Regjeringens konkrete satser fra 7. oktober er nye etter publiseringsgrensen og relevante før årsskiftet. Forslag, ikke vedtak. Primærkilder: Finansdepartementets satstabell og Prop. 1 LS (2026–2027), Stortingets budsjettoversikt.
2. **Ny IEA-rapport 13. november: råoljen falt mer enn diesel.** Strukturell forklaring på fortsatt høye dieselkostnader. Rapporten gir et konkret nytt holdepunkt; ukens beskjedne futuresendring alene forsvarer ingen egen nyhet.

Ingen tredje sak presses frem. Fiskeflåtens vedtak 6. oktober og ubesvarte spørsmål 13. november er et relevant oppfølgingsspor, men ikke behandlet som et allerede innført avgiftsfritak. Beredskapslagringens varslede høring er et oppfølgingsspor; selve høringsvarslet har ingen bekreftet umiddelbar prisvirkning.

## Markedshenting

Standardkommando med npx kom ikke frem til scriptkjøringen. Alternativ kjøring av samme eksisterende script med installert tsx-loader og tillatt nettverk lyktes (kjøreresultat sesjon 9244). Markedsdag, ikke hentetid, brukes i utkastet:

| Børsdato   | ULS1 slutt, USD/tonn | NOK/liter fra scriptets datobestemte valutakurs |
| ---------- | -------------------: | ----------------------------------------------: |
| 2026-11-05 |              1294,25 |                                           10,23 |
| 2026-11-06 |              1301,75 |                                           10,44 |
| 2026-11-09 |              1270,75 |                                           10,17 |
| 2026-11-10 |              1218,00 |                                            9,80 |
| 2026-11-11 |              1278,50 |                                           10,37 |
| 2026-11-12 |              1249,75 |                                           10,13 |
| 2026-11-13 |              1287,50 |                                           10,47 |

Norges Bank USD/NOK: 9,5634, 13. november. Brent BRN1 siste børsdag 13. november: 95,84 USD/fat. Siste 48 timebarer ULS1: lav1235,75/høy1301,25; slutt minus første slutt +39,00 USD/tonn. Et senere forsøk på å lagre utskriften traff en pågående reinstallasjon av avhengigheter og feilet på manglende zod. Tabellen over er transkribert fra den første vellykkede hentingen, ikke generert fra fallback. Faktakontrolløren hentet senere de samme sentrale verdiene uavhengig og lagret dem i `2026-11-15-facts-market-snapshot.txt`; den vellykkede kontrollutskriften er også kopiert til `2026-11-15-market-snapshot.txt`.

Utkastets sammenligning holder 13. november-kursen fast for begge fredager for å isolere endringen i futuresreferansen. Det er bevisst forskjellig fra scriptets NOK/liter-historikk, som bruker hver dags valutakurs. 1176 liter/tonn er sidens egen modellantakelse, ikke ICEs kontraktspesifikasjon. Sammenhengende futures kan bytte kontrakt; fysiske IEA-priser er en annen referanse.

## Kilder kontrollert

- [Finansdepartementet: Avgiftssatser 2027](https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2027/id3173439/).
- [Prop. 1 LS, kapittel 10.8 og 10.12](https://www.regjeringen.no/no/dokumenter/prop.-1-ls-20262027/id3176120/?ch=2).
- [Stortinget: 2027-budsjettet](https://stortinget.no/no/Saker-og-publikasjoner/Statsbudsjettet/statsbudsjettet-2027/).
- [IEA: Oil Market Report november 2026](https://www.iea.org/reports/oil-market-report-november-2026), åpne deler.
- [ICE: kontraktspesifikasjon](https://www.ice.com/products/34361119/Low-Sulphur-Gasoil-Futures).
- [Norges Bank: valutametode](https://www.norges-bank.no/tema/Statistikk/Valutakurser/).
- [IRU: Diesel prices ease, supply doesn't, 13. november](https://www.iru.org/system/files/story/Diesel%20prices%20ease,%20supply%20doesn't.html), bakgrunn; norske prisnivåer herfra brukes ikke i utkastet.
- [SSB: sal av petroleumsprodukt](https://www.ssb.no/energi-og-industri/olje-og-gass/statistikk/sal-av-petroleumsprodukt) og søk i tabell09654; ingen ny norsk pumpepris fremstilles som egen måling.
- [Stortingets ubesvarte spørsmål om fiskeflåten, 13. november](https://stortinget.no/no/Saker-og-publikasjoner/Sporsmal/Skriftlige-sporsmal-og-svar/Skriftlig-sporsmal/?qnid=130273).
- [Beredskapslagring, Meld. St. 4, vedtak787](https://www.regjeringen.no/no/dokumenter/meld.-st.-4-20262027/id3176102/?ch=15).

Fokuserte nettsøk ble gjort i regjeringen.no, stortinget.no, Lovdata, Toll, Drivkraft Norge, SSB og internasjonale markedsrapporter. Søk i norske medier viste budsjettomtale, men primærkildene styrer tallene. X-søk ga ikke verifisert nytt signal; ingen direkte X/Grok-tilgang er brukt. Dette er en målrettet nyhetsrunde, ikke en full kartlegging av samtlige medier og sosiale kontoer.
