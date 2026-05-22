export interface WatchListing {
  id: string;
  title: string;
  price: number;
  url: string;
  source: "olx" | "enjoei";
  location?: string;
  imageUrl?: string;
  description?: string;
  condition?: string;
  postedAt?: string;
}

export interface MarketPriceEntry {
  brand: string;
  keywords: string[];
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
}

export interface SearchResult {
  listings: WatchListing[];
  totalFound: number;
  source: string;
  error?: string;
}
