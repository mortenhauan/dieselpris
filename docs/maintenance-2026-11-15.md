# Gjennomgang av dieselpris.no – 15. november 2026

Rapporten dokumenterer kontrollene som ble gjort før commit og push til main. Nye artikler ligger som utkast til utgivers godkjenning og er ikke registrert som offentlige sider.

## Prioriterte funn og rettelser

| Prioritet | Funn                                                                                                    | Resultat                                                                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Høy       | Hentetidspunkt kunne fremstå som børsens kurstidspunkt.                                                 | Egen børsdato og hentetid. Prisene og historikken viser siste faktiske observasjon.                                                                                 |
| Høy       | Kilden leverte også et fremtidig øktpunkt: 15. november kl. 23 UTC, før økten hadde startet.            | Fremtidige tidsstempler og ugyldige sluttkurser filtreres bort. Egen regresjonstest.                                                                                |
| Høy       | Fast USD/NOK-reservekurs kunne gi udokumenterte kronebeløp.                                             | Reservekursen er fjernet. USD kan vises selv om valuta mangler; NOK-beregninger blir utilgjengelige. Historiske datoer bruker aldri en senere publisert valutakurs. |
| Høy       | Utdaterte forklaringer om vårens midlertidige avgifter og feil historikk for fiske bare i nære farvann. | Samordnet modell og synlige forklaringer med primærkilder. Modellen har også ordinære 2024-satser. Fossilforutsetningen og 2027-forslagenes status er tydelige.     |
| Høy       | Tre eldre artikler hadde konkrete feil i satser, regneeksempler, beløpsomfang eller tidslinje.          | Rettet med to uavhengige kontroller. Opprinnelige publiseringsdager og URL-er er beholdt; oppdateringer merkes og brukes i strukturerte data og sitemap.            |
| Middels   | Avgiftsandelen i forklaringen kunne avvike fra valgt region i prisfordelingen.                          | Begge bruker nå samme region og beregningsgrunnlag.                                                                                                                 |
| Middels   | Månedsaksen brukte kategorier fremfor kalenderavstander.                                                | Leveringsmånedene har tidsbaserte posisjoner; hver kontrakt viser faktisk børsdato.                                                                                 |
| Middels   | Annonselasteren var hardkodet.                                                                          | Annonseskript, kontomerkingen og annonsefilen er fjernet. Siden er annonsefri.                                                                                      |

Primærgrunnlag for avgiftsrettelsene: [Skatteetaten](https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/saravgifter/om/mineralske-produkter/), [Finansdepartementets melding om mai-kuttene](https://www.regjeringen.no/no/aktuelt/forskrift-om-redusert-co2-avgift-trer-i-kraft-1.-mai/id3158130/) og [forslagene for 2027](https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2027/id3173439/). De konkrete artikkelkontrollene dokumenterer flere originalkilder.

## Teknikk og design

| Del               | Versjon                                   |
| ----------------- | ----------------------------------------- |
| Node.js           | 26.13.1                                   |
| pnpm              | 12.21.0                                   |
| TypeScript        | 7.0.2, bekreftet som Go-basert kompilator |
| Next.js           | 16.4.6                                    |
| React / React DOM | 19.3.1                                    |
| Tailwind CSS      | 4.3.5                                     |
| TradingView       | 4.1.2                                     |
| DayPicker         | 10.0.2, migrert til `@daypicker/react`    |
| Ultracite         | 8.2.1                                     |

Øvrige aktuelle pakker er oppdatert. Hovedmigrasjonene, primærreferanser og gjenværende verktøyfunn er beskrevet i [utviklingsnotatet](development/npm-supply-chain.md).

Cache Components og React Compiler er beholdt. Delvis forhåndslasting er slått på. Nyhetssidene har `ensureStatic = "navigation"`, som lar bygget stoppe dersom de utilsiktet krever dynamisk serverarbeid. Prisdata beholder 30 minutters revalidering og fire døgns utløp; eksisterende cron for oppfriskning er bevart. Cron-svaret skiller nå manglende priser fra vellykket oppfriskning.

Det er ikke funnet grunnlag for en større redesign i denne runden. Alle seks prisvisninger er kontrollert på mobil og datamaskin uten vedvarende sideveis overflyt. Regionvalg, nyhetsoversikt og en revidert artikkel er kontrollert i nettleseren. Forbedringene gjelder språk, datoer, tilgjengelig navn på regionvelgeren, samsvar i beregninger og en lasteskisse som matcher de tre priskortene. Den nye `/om`-siden forklarer modell, kilder og redaksjonelt ansvar.

## Nyheter og fast rutine

To utkast er klare for utgivers vurdering:

- [Avgiftsforslaget for 2027 og forskjellen mellom autodiesel og anleggsdiesel](../editorial/drafts/2026-11-15-dieselavgifter-2027.md).
- [Hvorfor råoljen har falt mer enn diesel i høst](../editorial/drafts/2026-11-15-dieselmarked-november.md).

Begge har separate kontroller av [fakta og beregninger](../editorial/reviews/2026-11-15-facts.md) og [redaksjon og kilder](../editorial/reviews/2026-11-15-editorial.md), utført i uavhengige kontekster. Ingen blokkerende funn gjenstår i det kontrollerte materialet. Budsjettutkastet ble bare tabellformatert etter første kontroll; den andre kontrollens filhash samsvarer med sluttfilen. Sluttversjonene er registrert i [hashmanifestet](../editorial/reviews/2026-11-15-final-files.json).

Septemberutkastet er bevart som upublisert bakgrunn under `editorial/reference/`. Ingen av utkastene er registrert i offentlig nyhetsoversikt eller sitemap. [Arkivgjennomgangen](../editorial/reviews/2026-11-15-archive-audit.md) skiller dokumenterte rettelser fra gamle opplysninger som må leses i lys av publiseringsdatoen. Resten av arkivet er ikke gitt en generell faktagodkjenning.

Automatiseringen **Ukentlig nyhetsgjennomgang – dieselpris.no** er aktiv fredag kl. 14 norsk tid, knyttet til denne chatten. Den skal finne relevante saker, skrive og kontrollere utkast og levere dem til godkjenning. Ingen automatisk publisering eller sosiale innlegg. Ingen artikkelkvote; omtrent 2–4 gode saker per måned er et mål når nyhetsbildet gir grunnlag for det.

## Verifisering

- Kodekontroll, typekontroll og alle 10 regresjonstester består.
- Endelig produksjonsbygg består: 38 genererte sider/ruter, inkludert statiske nyhetssider.
- Produksjonspakkene har ingen rapporterte sårbarheter.
- HTTP-kontroll av alle 32 innholdssider: 200, én hovedoverskrift, canonical og ingen annonseintegrasjon i HTML.
- Sitemap inneholder revisjonsdatoene og `/om`, men ingen utkast. Fjernet annonsefil og septemberutkastets tidligere rute svarer 404. Oppfriskningsendepunktet avviser forespørsler uten autorisasjon med 401.
- Alle seks prisvisninger er kontrollert ved mobil- og datamaskinbredde. Midlertidig overflyt før klientgrafene har tilpasset seg forsvant etter lasting; ferdige sider hadde samme innholds- og skjermbredde.
- Ferske markedskilder er lest, og de to kontrollørene har gjort egne prisuttak. Kildetilgang og avgrensninger står i kontrollrapportene.

## Gjenstående oppfølging

1. **Publisering:** Utgiver må godkjenne de to nye utkastene. Denne leveransen endrer ikke den publiserte siden før endringene senere sendes ut.
2. **Vercel-kostnader:** Prosjektlesing via tilkoblingen lyktes. Det eksisterende produksjonsprosjektet oppga Node 24; neste utsending bruker repoets Node 26-krav. Faktisk forbruk og cachekostnader ble ikke verifisert: måleforespørselen ga 400, og terminalens konto manglet tilgang til det angitte teamet. Ingen kostnadsbesparelse er derfor påstått eller ny betalt cachetjeneste innført.
3. **Utviklingsverktøy:** To upstream-avvik gjenstår: Zod 3 under `@vercel/config` og deepmerge under Ultracite. De gjelder utviklingsavhengigheter, er dokumentert og er ikke skjult med unntak. Ingen kompatibel rettelse var tilgjengelig i denne gjennomgangen.
4. **Eldre 2023-tabeller:** To gamle artikler oppgir ulike 2023-satser. Forskjellen må kontrolleres mot korrekt periode før en ny revisjon; denne runden har ikke slått fast hvilken datoperiode tabellene mente. Se arkivgjennomgangen.
