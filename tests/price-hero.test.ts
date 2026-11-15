import assert from "node:assert/strict";
import { test } from "node:test";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { PriceHero } from "../components/price-hero";

test("missing FX keeps the USD quote and real exchange date visible without NOK prices", () => {
  const html = renderToStaticMarkup(
    createElement(PriceHero, {
      priceUsdMt: 1288,
      priceNokLiter: null,
      priceNokLiterPlusDuties: null,
      changePercent: 3.02,
      marketDate: "2026-11-13",
      seoIntro: "Markedsreferanse for dieselråvare.",
      exchangeSource: "Valutakurs utilgjengelig",
    })
  );
  assert.match(html, /1288/u);
  assert.match(html, /Børsdag/u);
  assert.match(html, /13\. nov/u);
  assert.match(html, /Valutakurs utilgjengelig/u);
  assert.doesNotMatch(html, /NaN|Infinity|reservekurs|Oppdatert/u);
});
