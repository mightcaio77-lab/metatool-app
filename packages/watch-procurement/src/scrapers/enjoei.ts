import type { SearchResult, WatchListing } from "../types.js";

const ENJOEI_API_URL = "https://api.enjoei.com.br/search";

interface EnjoeiProduct {
  id: number | string;
  title: string;
  price: number;
  slug?: string;
  seller_name?: string;
  city?: string;
  state?: string;
  photos?: Array<{ large?: string; medium?: string }>;
  description?: string;
  condition?: string;
  created_at?: string;
}

interface EnjoeiResponse {
  products?: EnjoeiProduct[];
  results?: EnjoeiProduct[];
  data?: EnjoeiProduct[];
  total?: number;
  pagination?: { total_count?: number };
}

export async function searchEnjoei(
  query: string,
  maxPrice?: number,
  page = 1,
): Promise<SearchResult> {
  const params = new URLSearchParams({
    q: query,
    per_page: "30",
    page: String(page),
    sort: "recent",
  });
  if (maxPrice) {
    params.set("max_price", String(maxPrice));
  }

  try {
    const response = await fetch(`${ENJOEI_API_URL}?${params.toString()}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "pt-BR,pt;q=0.9",
        Referer: "https://www.enjoei.com.br/",
        "X-Requested-With": "XMLHttpRequest",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return {
        listings: [],
        totalFound: 0,
        source: "enjoei",
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data: EnjoeiResponse = await response.json();
    const products: EnjoeiProduct[] =
      data.products ?? data.results ?? data.data ?? [];

    const listings: WatchListing[] = products
      .filter((p) => p.price > 0)
      .map((p) => {
        const slug = p.slug ?? String(p.id);
        return {
          id: String(p.id),
          title: p.title,
          price: p.price,
          url: `https://www.enjoei.com.br/p/${slug}`,
          source: "enjoei" as const,
          location:
            p.city && p.state
              ? `${p.city} - ${p.state}`
              : p.city ?? p.state,
          imageUrl: p.photos?.[0]?.large ?? p.photos?.[0]?.medium,
          description: p.description,
          condition: p.condition,
          postedAt: p.created_at,
        } satisfies WatchListing;
      });

    const total =
      data.pagination?.total_count ??
      data.total ??
      listings.length;

    return { listings, totalFound: total, source: "enjoei" };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { listings: [], totalFound: 0, source: "enjoei", error: message };
  }
}
