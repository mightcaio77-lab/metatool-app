import type { SearchResult, WatchListing } from "../types.js";

const OLX_API_URL = "https://www.olx.com.br/api/relevance/v2/ads";

interface OLXAd {
  listId: string;
  subject: string;
  price?: string;
  priceValue?: number;
  url: string;
  location?: { municipality?: string; uf?: string };
  images?: Array<{ url: string }>;
  body?: string;
  listTime?: string;
}

interface OLXResponse {
  data?: { ads?: OLXAd[] };
  listing?: { ads?: OLXAd[] };
  ads?: OLXAd[];
}

function parsePrice(raw?: string, value?: number): number | null {
  if (value && value > 0) return value;
  if (!raw) return null;
  const cleaned = raw.replace(/[^\d,]/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

export async function searchOLX(
  query: string,
  maxPrice?: number,
  page = 1,
): Promise<SearchResult> {
  const params = new URLSearchParams({
    q: query,
    o: String(page),
    category: "1020",
    sf: "1",
  });
  if (maxPrice) {
    params.set("pe", String(maxPrice));
  }

  try {
    const response = await fetch(`${OLX_API_URL}?${params.toString()}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "pt-BR,pt;q=0.9",
        Referer: "https://www.olx.com.br/",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return {
        listings: [],
        totalFound: 0,
        source: "olx",
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data: OLXResponse = await response.json();
    const ads: OLXAd[] =
      data.data?.ads ?? data.listing?.ads ?? data.ads ?? [];

    const listings: WatchListing[] = ads
      .map((ad) => {
        const price = parsePrice(ad.price, ad.priceValue);
        if (price === null) return null;
        return {
          id: ad.listId,
          title: ad.subject,
          price,
          url: ad.url,
          source: "olx" as const,
          location: ad.location
            ? `${ad.location.municipality ?? ""} - ${ad.location.uf ?? ""}`.trim().replace(/^-\s*|-\s*$/, "")
            : undefined,
          imageUrl: ad.images?.[0]?.url,
          description: ad.body,
          postedAt: ad.listTime,
        } satisfies WatchListing;
      })
      .filter((l): l is WatchListing => l !== null);

    return { listings, totalFound: listings.length, source: "olx" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { listings: [], totalFound: 0, source: "olx", error: message };
  }
}
