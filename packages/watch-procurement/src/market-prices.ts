import type { MarketPriceEntry, WatchListing } from "./types.js";

export const MARKET_PRICES: MarketPriceEntry[] = [
  {
    brand: "casio",
    keywords: ["casio f91", "casio a168", "casio ae"],
    minPrice: 100,
    maxPrice: 350,
    avgPrice: 180,
  },
  {
    brand: "casio g-shock",
    keywords: ["g-shock", "gshock", "dw5600", "dw6900", "ga100", "ga200"],
    minPrice: 450,
    maxPrice: 2500,
    avgPrice: 900,
  },
  {
    brand: "seiko",
    keywords: ["seiko", "seiko 5", "skx", "srp", "snk"],
    minPrice: 400,
    maxPrice: 5000,
    avgPrice: 1400,
  },
  {
    brand: "citizen",
    keywords: ["citizen", "citizen eco-drive"],
    minPrice: 500,
    maxPrice: 4500,
    avgPrice: 1600,
  },
  {
    brand: "orient",
    keywords: ["orient", "orient mako", "orient bambino"],
    minPrice: 450,
    maxPrice: 2500,
    avgPrice: 1000,
  },
  {
    brand: "tissot",
    keywords: ["tissot", "tissot prx", "tissot prs", "t-touch"],
    minPrice: 1800,
    maxPrice: 9000,
    avgPrice: 3500,
  },
  {
    brand: "longines",
    keywords: ["longines", "longines master"],
    minPrice: 5000,
    maxPrice: 25000,
    avgPrice: 9000,
  },
  {
    brand: "tag heuer",
    keywords: ["tag heuer", "tag", "carrera", "aquaracer", "formula 1"],
    minPrice: 8000,
    maxPrice: 45000,
    avgPrice: 16000,
  },
  {
    brand: "omega",
    keywords: ["omega", "speedmaster", "seamaster", "constellation"],
    minPrice: 18000,
    maxPrice: 100000,
    avgPrice: 35000,
  },
  {
    brand: "rolex",
    keywords: ["rolex", "submariner", "datejust", "daytona", "GMT-master"],
    minPrice: 55000,
    maxPrice: 600000,
    avgPrice: 130000,
  },
  {
    brand: "tudor",
    keywords: ["tudor", "tudor black bay", "tudor pelagos"],
    minPrice: 10000,
    maxPrice: 45000,
    avgPrice: 19000,
  },
  {
    brand: "breitling",
    keywords: ["breitling", "navitimer", "superocean", "chronomat"],
    minPrice: 18000,
    maxPrice: 70000,
    avgPrice: 28000,
  },
  {
    brand: "cartier",
    keywords: ["cartier", "tank", "santos", "ballon bleu"],
    minPrice: 12000,
    maxPrice: 120000,
    avgPrice: 40000,
  },
  {
    brand: "iwc",
    keywords: ["iwc", "portofino", "pilot", "aquatimer"],
    minPrice: 22000,
    maxPrice: 120000,
    avgPrice: 45000,
  },
  {
    brand: "panerai",
    keywords: ["panerai", "luminor", "radiomir"],
    minPrice: 18000,
    maxPrice: 90000,
    avgPrice: 32000,
  },
  {
    brand: "hamilton",
    keywords: ["hamilton", "khaki", "jazzmaster", "ventura"],
    minPrice: 2200,
    maxPrice: 12000,
    avgPrice: 4500,
  },
  {
    brand: "fossil",
    keywords: ["fossil"],
    minPrice: 250,
    maxPrice: 1000,
    avgPrice: 450,
  },
  {
    brand: "invicta",
    keywords: ["invicta", "invicta pro diver"],
    minPrice: 120,
    maxPrice: 600,
    avgPrice: 280,
  },
];

export function getMarketPrice(
  titleOrQuery: string,
): MarketPriceEntry | undefined {
  const normalized = titleOrQuery.toLowerCase();
  return MARKET_PRICES.find((entry) =>
    entry.keywords.some((kw) => normalized.includes(kw.toLowerCase())),
  );
}

export function isGoodDeal(
  listing: WatchListing,
  discountThreshold: number,
): boolean {
  const market = getMarketPrice(listing.title);
  if (!market) return false;
  return listing.price <= market.avgPrice * discountThreshold;
}

export function getDealQuality(listing: WatchListing): string {
  const market = getMarketPrice(listing.title);
  if (!market) return "desconhecido";
  const ratio = listing.price / market.avgPrice;
  if (ratio <= 0.5) return "excelente";
  if (ratio <= 0.65) return "muito bom";
  if (ratio <= 0.8) return "bom";
  return "razoável";
}
