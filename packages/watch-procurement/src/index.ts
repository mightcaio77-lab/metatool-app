import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getDealQuality, getMarketPrice, isGoodDeal, MARKET_PRICES } from "./market-prices.js";
import { searchEnjoei } from "./scrapers/enjoei.js";
import { searchOLX } from "./scrapers/olx.js";
import type { WatchListing } from "./types.js";

const server = new McpServer({
  name: "watch-procurement",
  version: "1.0.0",
});

function formatListing(listing: WatchListing): string {
  const market = getMarketPrice(listing.title);
  const priceFmt = listing.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const lines: string[] = [
    `[${listing.source.toUpperCase()}] ${listing.title}`,
    `  Preço: ${priceFmt}`,
  ];
  if (market) {
    const discount = Math.round((1 - listing.price / market.avgPrice) * 100);
    const quality = getDealQuality(listing);
    lines.push(`  Referência: ${market.brand} (média R$${market.avgPrice.toLocaleString("pt-BR")})`);
    lines.push(`  Desconto: ${discount}% abaixo da média | Negócio: ${quality}`);
  }
  if (listing.location) lines.push(`  Local: ${listing.location}`);
  if (listing.condition) lines.push(`  Condição: ${listing.condition}`);
  lines.push(`  Link: ${listing.url}`);
  return lines.join("\n");
}

server.tool(
  "search_budget_watches",
  "Busca relógios abaixo do preço de mercado no OLX e/ou Enjoei",
  {
    query: z
      .string()
      .default("relogio")
      .describe("Marca ou modelo a buscar (ex: 'seiko', 'casio g-shock', 'omega speedmaster')"),
    maxPrice: z
      .number()
      .optional()
      .describe("Preço máximo em reais (R$)"),
    discountThreshold: z
      .number()
      .min(0.1)
      .max(0.99)
      .default(0.8)
      .describe("Percentual máximo do preço de mercado (0.8 = até 20% abaixo da média)"),
    platforms: z
      .array(z.enum(["olx", "enjoei"]))
      .default(["olx", "enjoei"])
      .describe("Plataformas para buscar"),
    page: z.number().default(1).describe("Página de resultados"),
  },
  async ({ query, maxPrice, discountThreshold, platforms, page }) => {
    const results: WatchListing[] = [];
    const errors: string[] = [];
    const stats: Record<string, number> = {};

    await Promise.all([
      platforms.includes("olx")
        ? searchOLX(query, maxPrice, page).then((r) => {
            if (r.error) errors.push(`OLX: ${r.error}`);
            results.push(...r.listings);
            stats.olx = r.totalFound;
          })
        : Promise.resolve(),
      platforms.includes("enjoei")
        ? searchEnjoei(query, maxPrice, page).then((r) => {
            if (r.error) errors.push(`Enjoei: ${r.error}`);
            results.push(...r.listings);
            stats.enjoei = r.totalFound;
          })
        : Promise.resolve(),
    ]);

    const goodDeals = results
      .filter((l) => isGoodDeal(l, discountThreshold))
      .sort((a, b) => {
        const ma = getMarketPrice(a.title);
        const mb = getMarketPrice(b.title);
        const ra = ma ? a.price / ma.avgPrice : 1;
        const rb = mb ? b.price / mb.avgPrice : 1;
        return ra - rb;
      });

    const platformStats = Object.entries(stats)
      .map(([p, n]) => `${p}: ${n} encontrados`)
      .join(", ");

    const header = [
      `=== Busca: "${query}" ===`,
      `Plataformas: ${platformStats || "nenhuma"}`,
      `Filtro: até ${Math.round(discountThreshold * 100)}% do preço médio de mercado`,
      maxPrice ? `Preço máximo: R$ ${maxPrice.toLocaleString("pt-BR")}` : null,
      `Boas oportunidades encontradas: ${goodDeals.length}`,
    ]
      .filter(Boolean)
      .join("\n");

    const body =
      goodDeals.length > 0
        ? goodDeals.map(formatListing).join("\n\n---\n\n")
        : "Nenhum relógio encontrado abaixo do preço de mercado com os filtros informados.";

    const footer =
      errors.length > 0 ? `\n\nAvisos: ${errors.join(" | ")}` : "";

    return {
      content: [{ type: "text", text: `${header}\n\n${body}${footer}` }],
    };
  },
);

server.tool(
  "get_market_reference_price",
  "Retorna o preço de referência de mercado para uma marca ou modelo de relógio",
  {
    query: z
      .string()
      .describe("Marca ou modelo (ex: 'rolex submariner', 'seiko 5', 'casio g-shock')"),
  },
  async ({ query }) => {
    const entry = getMarketPrice(query);
    if (!entry) {
      const allBrands = MARKET_PRICES.map((e) => e.brand).join(", ");
      return {
        content: [
          {
            type: "text",
            text: `Marca/modelo "${query}" não encontrado na base de referência.\n\nMarcas disponíveis: ${allBrands}`,
          },
        ],
      };
    }

    const text = [
      `=== Preço de referência: ${entry.brand.toUpperCase()} ===`,
      `Mínimo:  R$ ${entry.minPrice.toLocaleString("pt-BR")}`,
      `Médio:   R$ ${entry.avgPrice.toLocaleString("pt-BR")}`,
      `Máximo:  R$ ${entry.maxPrice.toLocaleString("pt-BR")}`,
      ``,
      `Palavras-chave usadas: ${entry.keywords.join(", ")}`,
      ``,
      `Para buscar boas oportunidades, use "search_budget_watches" com query="${entry.keywords[0]}"`,
    ].join("\n");

    return { content: [{ type: "text", text }] };
  },
);

server.tool(
  "list_watch_brands",
  "Lista todas as marcas de relógio com preços de referência disponíveis",
  {},
  async () => {
    const rows = MARKET_PRICES.map(
      (e) =>
        `${e.brand.padEnd(20)} | min: R$${String(e.minPrice).padStart(8)} | avg: R$${String(e.avgPrice).padStart(8)} | max: R$${String(e.maxPrice).padStart(8)}`,
    );
    const text = [
      "=== Marcas com preço de referência ===",
      "Marca                | Mínimo   | Médio    | Máximo",
      "-".repeat(60),
      ...rows,
    ].join("\n");
    return { content: [{ type: "text", text }] };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("watch-procurement MCP server started\n");
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err}\n`);
  process.exit(1);
});
