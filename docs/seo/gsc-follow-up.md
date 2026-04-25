# Search Console follow-up (dieselpris.no)

Captured from Google Search Console (domain property `sc-domain:dieselpris.no`) plus production checks in the repo. Re-check GSC after deploys; numbers move over time.

## 1. Meldinger (inbox)

**Ingen manuelle treff eller sikkerhetsvarsel** — meldingene var:

- Flere varsler om **nye årsaker som hindrer indeksering** av sider på domenet, og tilsvarende for **sider i nettstedskart** (samme type hendelse, dupliserte tråder i innboksen).
- Én **produkt-/tipsmelding** («Få mere ud af … på Google») — informativ, ikke feil.

**Anbefaling:** åpne hver melding og velg «sett som lest» når du har lest **Sideindeksering → Ikke indeksert** og bekreftet at årsakene er forventede (se nedenfor).

## 2. Sideindeksering (tall)

| Måling                  | Verdi (ca.)                             |
| ----------------------- | --------------------------------------- |
| Indeksert               | 21                                      |
| Ikke indeksert          | 19, **3 grunner**                       |
| Nettstedskart           | `https://www.dieselpris.no/sitemap.xml` |
| URL-er i sitemap (prod) | 24                                      |

Den detaljerte tabellen per årsak i GSC er vanskelig å lese maskinelt; **eksporter** lister fra rapporten («EKSPORTÉR») når du trenger eksakt URL-sett.

## 3. URL-er og tiltak (klassifisering)

### Bevisst ikke indeksert (forventet)

| Mønster                            | Forklaring                                                                                                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `https://dieselpris.no/...` (apex) | Vercel svarer **307** til `https://www.dieselpris.no/...`. Samme innhold; **kanonisk host er www** (`lib/site-url.ts`). GSC viser ofte dette som _side med viderekobling_ / _alternativ side med riktig kanonisk_. |
| Gamle engelske/alias-stier         | `next.config.mjs` **301** fra f.eks. `/national`, `/oslo-east`, `/south`, `/west`, `/north`, `/trondelag`, `/øst`, `/sør` til norske ruter. Forventet ikke-indeksert på kilden.                                    |

**Ingen kodeendring nødvendig** for disse med mindre du vil endre host-strategi (anbefales ikke).

### Verifiser i GSC-eksport (kan kreve tiltak)

Om eksporten inneholder **ekte www-URL-er** som fortsatt ikke er indeksert, sjekk per URL:

- **Mykt 404 / tynt innhold** — styrk innhold eller 301 til relevant artikkel.
- **Kravlet – ikke indeksert nå** — ofte kvalitet/konkurranser; vurder tydeligere tittel/ingress og interne lenker.
- **Duplikat uten valgt kanonisk** — sjekk `alternates.canonical` og at det bare finnes én «sann» URL per artikkel.

## 4. Ytelse (søk, ~3 måneder, Nett)

- **Klikk** ~56, **visninger** ~1,81k, **CTR** ~3,1 %, **gj.snitt posisjon** ~7,2.

**Praktisk arbeidsliste (uten eksport av enkeltord):**

1. **Forspørsler:** sorter på **visninger**, noter 10–20 hodeord (dieselpris, diesel avgift, co2-avgift, drivstoffavgift, oljepris, osv.).
2. **Sider:** finn sider med mange visninger og lav CTR; test **tittel** og **meta description** bare der snippeten er svak ift. intensjon.
3. Unngå generiske titler på **region-sider**; behold tydelig norsk forklaringsvinkel (allerede i `region-page-metadata`).

## 5. Kjernestatistikk for nett (CWV)

Rapportoversikten i GSC har **«Mobil Åpne rapport»** og **«Datamaskin Åpne rapport»**. Vi trigget mobilknappen i verktøyet; **feltdata (grønn/gul/rød og URL-grupper)** kom likevel ikke frem i tilgjengelighets-snapshot (samme begrensning som for indekseringstabellen).

**Anbefaling:** åpne begge rapportene manuelt i GSC og noter om det finnes **«Dårlige URL-er»** eller lignende grupper. Ved feil: kjør **PageSpeed Insights** på de verste URL-ene og adresser **LCP / INP / CLS** punktvis.

**Kode-observasjon (valgfritt senere):** `next.config.mjs` har `images: { unoptimized: true }`, som kan svekke **LCP** om store bilder brukes — bare endre om CWV faktisk flagger det.

## 6. Leveranse i kodebasen (denne runden)

- **Nyhets-URL-er i sitemap** har nå **`lastModified`** satt fra `publishedAtIso` i [`app/sitemap.ts`](../../app/sitemap.ts) (pålitelig kilde i `NEWS_INDEX`). Region-/forside-URL-er uten enkel publiseringsdato har fortsatt ikke `lastModified`.
