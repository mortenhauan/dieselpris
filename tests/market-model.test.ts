import assert from "node:assert/strict";
import { test } from "node:test";

import { buildUnavailableDieselPricesPayload } from "../lib/diesel-prices-payload";
import { expandHistoricalTradingToCalendarDays } from "../lib/expand-historical-to-calendar-days";
import { observedMarketBars } from "../lib/market-observations";
import {
  fetchNorgesBankUsdNokSeries,
  usdNokOnOrBefore,
} from "../lib/norges-bank-usd-nok";
import type { NorgesBankUsdNokSeries } from "../lib/norges-bank-usd-nok";
import {
  forecastPumpPriceComponents,
  getAnleggsdieselRates,
  getFiskeKunNaereFarvannRates,
  getPumpPriceRates,
  pumpPriceComponents,
} from "../lib/pump-price-model";
import { articleJsonLd } from "../lib/site-structured-data";

const fx: NorgesBankUsdNokSeries = {
  byDate: new Map([
    ["2026-11-12", 10],
    ["2026-11-13", 10.1],
    ["2026-11-16", 10.2],
  ]),
  latestDate: "2026-11-16",
  latestRate: 10.2,
  sortedDatesAsc: ["2026-11-12", "2026-11-13", "2026-11-16"],
};

test("upcoming exchange-session placeholders are never presented as observed quotes", () => {
  const observedAt = Date.parse("2026-11-15T12:30:00Z");
  const bars = observedMarketBars(
    [
      { time: Date.parse("2026-11-13T01:00:00Z") / 1000, close: 1287.5 },
      { time: Date.parse("2026-11-15T23:00:00Z") / 1000, close: 1276.25 },
      { time: Date.parse("2026-11-12T01:00:00Z") / 1000, close: Number.NaN },
    ],
    observedAt
  );
  assert.equal(bars.length, 1);
  assert.equal(bars[0].close, 1287.5);
});

test("weekends use the last published FX observation, never a future rate", () => {
  assert.equal(usdNokOnOrBefore(fx, "2026-11-15"), 10.1);
  assert.equal(usdNokOnOrBefore(fx, "2026-11-12"), 10);
  assert.equal(usdNokOnOrBefore(fx, "2026-11-11"), null);
});

test("missing or invalid FX stays unavailable instead of inventing a rate", () => {
  assert.equal(usdNokOnOrBefore(null, "2026-11-15"), null);
  assert.equal(
    usdNokOnOrBefore(
      { ...fx, byDate: new Map([["2026-11-13", 0]]) },
      "2026-11-15"
    ),
    null
  );
  const unavailable = buildUnavailableDieselPricesPayload(
    null,
    "Valutakurs utilgjengelig"
  );
  assert.equal(unavailable.current, null);
  assert.equal(unavailable.market_date, null);
  assert.equal(unavailable.exchange_rate.usd_nok, null);
  assert.deepEqual(unavailable.historical, []);
  assert.ok(Number.isFinite(Date.parse(unavailable.fetched_at)));
});

test("FX transport errors do not hide available commodity quotes", async (t) => {
  t.mock.method(globalThis, "fetch", () =>
    Promise.reject(new TypeError("Offline"))
  );
  assert.equal(await fetchNorgesBankUsdNokSeries(), null);
});

test("malformed and non-positive currency observations are rejected", async (t) => {
  t.mock.method(globalThis, "fetch", () =>
    Promise.resolve(
      Response.json({
        data: {
          dataSets: [
            {
              series: {
                "0:0:0": { observations: { "0": ["0"], "1": ["10.1"] } },
              },
            },
          ],
          structure: {
            dimensions: {
              observation: [
                { values: [{ id: "2026-11-12" }, { id: "2026-11-13" }] },
              ],
            },
          },
        },
      })
    )
  );
  const result = await fetchNorgesBankUsdNokSeries();
  assert.equal(result?.latestRate, 10.1);
  assert.deepEqual(result?.sortedDatesAsc, ["2026-11-13"]);
});

test("temporary road and CO2 duty changes land on the effective calendar day", () => {
  assert.equal(getPumpPriceRates("2024-01-01").veibruks, 2.71);
  assert.equal(getPumpPriceRates("2024-01-01").co2, 3.17);
  assert.equal(getPumpPriceRates("2026-03-31").veibruks, 2.28);
  assert.equal(getPumpPriceRates("2026-04-01").veibruks, 0);
  assert.equal(getPumpPriceRates("2026-04-30").co2, 4.42);
  assert.equal(getPumpPriceRates("2026-05-01").co2, 3.09);
  assert.equal(getPumpPriceRates("2026-08-31").co2, 3.09);
  assert.equal(getPumpPriceRates("2026-09-01").co2, 4.42);
  assert.equal(getPumpPriceRates("2026-09-01").veibruks, 2.28);
  assert.equal(getAnleggsdieselRates("2026-05-01").co2, 1.92);
  assert.equal(getAnleggsdieselRates("2026-09-01").co2, 4.42);
  assert.equal(getFiskeKunNaereFarvannRates("2026-04-30").co2, 4.42);
  assert.equal(getFiskeKunNaereFarvannRates("2026-05-01").co2, 0);
  assert.equal(getFiskeKunNaereFarvannRates("2026-09-01").co2, 4.42);
});

test("calendar filling applies duties daily but ends at the last real quote", () => {
  const rows = expandHistoricalTradingToCalendarDays([
    { date: "2026-04-30", price: 1176, price_nok_liter: 10 },
    { date: "2026-05-04", price: 1293.6, price_nok_liter: 11 },
  ]);
  assert.equal(rows.length, 5);
  assert.equal(rows.at(-1)?.date, "2026-05-04");
  const holiday = rows.find((row) => row.date === "2026-05-01");
  assert.ok(holiday);
  assert.equal(holiday.price_nok_liter, 10);
  assert.equal(
    pumpPriceComponents(holiday.price_nok_liter, "national", holiday.date).co2,
    3.09
  );
});

test("2027 proposals affect forecasts only, with VAT on the full amount", () => {
  const historical = pumpPriceComponents(10, "national", "2027-01-01");
  const forecast = forecastPumpPriceComponents(10, "national", "2027-01-01");
  assert.equal(historical.co2, 4.42);
  assert.equal(forecast.co2, 5.13);
  assert.equal(forecast.veibruks, 1.84);
  assert.equal(forecast.mva, (10 + 3.5 + 5.13 + 1.84) * 0.25);
  assert.equal(forecast.total, (10 + 3.5 + 5.13 + 1.84) * 1.25);
  assert.equal(
    forecastPumpPriceComponents(10, "national", "2026-12-01").co2,
    4.42
  );
});

test("article revisions preserve the publication date and expose a distinct modified date", () => {
  const data = articleJsonLd({
    canonicalUrl: "https://www.dieselpris.no/nyheter/test",
    datePublished: "2026-04-01",
    dateModified: "2026-11-15",
    headline: "Test",
  });
  assert.equal(data.datePublished, "2026-04-01");
  assert.equal(data.dateModified, "2026-11-15");
});
