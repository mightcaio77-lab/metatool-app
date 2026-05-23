"use client";

import {
  Award,
  BarChart3,
  DollarSign,
  Gift,
  Globe,
  Instagram,
  MessageCircle,
  Package,
  ShoppingBag,
  Star,
  Target,
  TrendingUp,
  Users,
  Watch,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const watchBrands = [
  { name: "Rolex", range: "R$ 8.000 – R$ 10.000", margin: "~40%" },
  { name: "Omega", range: "R$ 5.000 – R$ 8.000", margin: "~35%" },
  { name: "TAG Heuer", range: "R$ 3.000 – R$ 6.000", margin: "~35%" },
  { name: "Seiko Luxo", range: "R$ 1.500 – R$ 3.000", margin: "~30%" },
  { name: "Citizen Titanium", range: "R$ 1.000 – R$ 2.500", margin: "~28%" },
  { name: "Mido / Tissot", range: "R$ 1.000 – R$ 3.000", margin: "~30%" },
];

const salesChannels = [
  {
    icon: MessageCircle,
    title: "Grupos OLX",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    description: "Anúncios no OLX com fotos profissionais e descrições detalhadas. Alto volume de compradores buscando relógios usados.",
    tips: ["Fotos com fundo branco", "Descrição técnica completa", "Preço competitivo", "Resposta rápida às mensagens"],
  },
  {
    icon: Users,
    title: "Grupos WhatsApp & Telegram",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Grupos especializados em compra e venda de relógios. Compradores qualificados e decisão de compra rápida.",
    tips: ["Grupos de relógios premium", "Grupos de colecionadores", "Posts regulares com novidades", "Construir reputação no grupo"],
  },
  {
    icon: Instagram,
    title: "Instagram",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    description: "Perfil profissional com feed curado. Reels mostrando detalhes dos relógios, stories de disponibilidade.",
    tips: ["Reels curtos e atrativos", "Stories de novidades diárias", "Hashtags do nicho", "Link na bio para catálogo"],
  },
  {
    icon: Globe,
    title: "Anúncios Pagos",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Meta Ads (Facebook + Instagram) e Google Shopping para alcançar compradores qualificados além da rede orgânica.",
    tips: ["Segmentar por interesse em luxo", "Remarketing para visitantes", "Catálogo dinâmico", "Budget R$ 300–500/mês"],
  },
  {
    icon: ShoppingBag,
    title: "Venda Direta",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Rede de relacionamentos, indicações e clientes recorrentes. Menor custo de aquisição e maior confiança.",
    tips: ["Programa de indicação", "Clientes VIP com preferência", "Garantia e suporte pós-venda", "Avaliações e depoimentos"],
  },
];

const metrics = [
  { label: "Capital Inicial Sugerido", value: "R$ 5.000", icon: DollarSign, color: "text-green-500" },
  { label: "Giro Estimado/Mês", value: "3 – 6 relógios", icon: Watch, color: "text-blue-500" },
  { label: "Margem Média", value: "30 – 40%", icon: TrendingUp, color: "text-emerald-500" },
  { label: "Lucro Mensal Estimado", value: "R$ 1.500 – R$ 4.000", icon: BarChart3, color: "text-purple-500" },
];

const phases = [
  {
    phase: "Fase 1",
    title: "Lançamento (Mês 1–2)",
    color: "border-blue-500",
    badgeColor: "bg-blue-500",
    items: [
      "Criar perfil Instagram profissional",
      "Entrar em 5–10 grupos de relógios",
      "Comprar primeiros 2–3 relógios para estoque",
      "Criar anúncios no OLX e Mercado Livre",
      "Documentar cada compra/venda",
    ],
  },
  {
    phase: "Fase 2",
    title: "Escala (Mês 3–5)",
    color: "border-orange-500",
    badgeColor: "bg-orange-500",
    items: [
      "Investir em Meta Ads (R$ 300/mês)",
      "Criar catálogo digital (Notion ou site simples)",
      "Programa de indicação para clientes",
      "Parcerias com relojoeiros e assistências técnicas",
      "Ampliar variedade de marcas",
    ],
  },
  {
    phase: "Fase 3",
    title: "Sorteios (Mês 6+)",
    color: "border-purple-500",
    badgeColor: "bg-purple-500",
    items: [
      "Lançar sistema de sorteios de relógios",
      "Cotas a partir de R$ 30–50 por número",
      "Premiação: relógio de R$ 2.000–5.000",
      "Regulamentação e transparência total",
      "Transmissão ao vivo do sorteio",
    ],
  },
];

export default function WatchResalePage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-8xl">⌚</div>
          <div className="absolute bottom-4 left-8 text-6xl">⌚</div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-amber-500/20 p-3">
              <Watch className="h-8 w-8 text-amber-400" />
            </div>
            <Badge className="bg-amber-500 text-black font-bold text-sm px-3 py-1">
              PLANO DE NEGÓCIOS
            </Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Revenda de Relógios Premium
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Compra estratégica e revenda lucrativa de relógios de R$ 1.000 a R$ 10.000
            — via grupos, Instagram, anúncios e sorteios.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="outline" className="border-amber-400/50 text-amber-300 text-sm px-3 py-1">
              Baixo Capital Inicial
            </Badge>
            <Badge variant="outline" className="border-green-400/50 text-green-300 text-sm px-3 py-1">
              Alta Margem (30–40%)
            </Badge>
            <Badge variant="outline" className="border-blue-400/50 text-blue-300 text-sm px-3 py-1">
              Mercado em Crescimento
            </Badge>
            <Badge variant="outline" className="border-purple-400/50 text-purple-300 text-sm px-3 py-1">
              Potencial de Escala
            </Badge>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {metric.label}
                </p>
              </div>
              <p className={`text-2xl font-black ${metric.color}`}>
                {metric.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="h-5 w-5 text-primary" />
            Como Funciona o Modelo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/40">
              <div className="rounded-full bg-blue-500/10 p-4 mb-3">
                <Package className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Comprar Barato</h3>
              <p className="text-sm text-muted-foreground">
                Buscar relógios seminovos em OLX, Facebook Marketplace, leilões,
                pessoas precisando vender rápido — sempre abaixo do valor de mercado.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/40">
              <div className="rounded-full bg-amber-500/10 p-4 mb-3">
                <Star className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="font-bold text-lg mb-2">2. Preparar & Documentar</h3>
              <p className="text-sm text-muted-foreground">
                Limpeza e revisão básica, fotos profissionais, pesquisa de
                certificado de autenticidade e histórico do relógio.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/40">
              <div className="rounded-full bg-green-500/10 p-4 mb-3">
                <TrendingUp className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Vender pelo Preço Justo</h3>
              <p className="text-sm text-muted-foreground">
                Anunciar nos canais certos com preço de mercado, garantindo
                margem de 30–40% sobre o valor pago na aquisição.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Watch Brands & Ranges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Award className="h-5 w-5 text-amber-500" />
            Marcas Alvo e Faixas de Preço
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Marca</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Faixa de Revenda</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Margem Estimada</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {watchBrands.map((brand, i) => (
                  <tr key={brand.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-semibold">{brand.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{brand.range}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 font-bold border-0">
                        {brand.margin}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {i < 2 ? (
                        <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-0">Alta</Badge>
                      ) : i < 4 ? (
                        <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-0">Média</Badge>
                      ) : (
                        <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-0">Entrada</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Sales Channels */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Canais de Venda</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {salesChannels.map((channel) => (
            <Card key={channel.title} className="border-border/50 hover:border-border transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2.5 ${channel.bgColor}`}>
                    <channel.icon className={`h-5 w-5 ${channel.color}`} />
                  </div>
                  <CardTitle className="text-base">{channel.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{channel.description}</p>
                <Separator />
                <ul className="space-y-1.5">
                  {channel.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Raffle System */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Gift className="h-6 w-6 text-purple-500" />
            Sistema de Sorteios — Evolução do Negócio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Após consolidar a operação de revenda, o sistema de sorteios amplifica o alcance
            e cria um modelo de receita recorrente com alto engajamento.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-purple-500/20 bg-background p-4">
              <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Como Funciona</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Relógio de R$ 2.000–5.000 como prêmio</li>
                <li>• Cotas numeradas a R$ 30–50 cada</li>
                <li>• 100–200 cotas por sorteio</li>
                <li>• Sorteio ao vivo via Instagram/YouTube</li>
                <li>• Resultado via Loteria Federal</li>
              </ul>
            </div>
            <div className="rounded-xl border border-purple-500/20 bg-background p-4">
              <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Potencial de Receita</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• 150 cotas × R$ 40 = R$ 6.000 arrecadado</li>
                <li>• Prêmio (custo): R$ 3.500</li>
                <li>• Lucro bruto: ~R$ 2.500 por sorteio</li>
                <li>• 2–4 sorteios/mês = R$ 5.000–10.000</li>
                <li>• Crescente com audiência</li>
              </ul>
            </div>
            <div className="rounded-xl border border-purple-500/20 bg-background p-4">
              <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Compliance</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Verificar regulamentação SECAP</li>
                <li>• Transparência total nas regras</li>
                <li>• Transmissão ao vivo do sorteio</li>
                <li>• Comprovante público do resultado</li>
                <li>• Entrega documentada com foto</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Roadmap de Crescimento</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {phases.map((phase) => (
            <div
              key={phase.phase}
              className={`rounded-xl border-l-4 ${phase.color} border border-border/50 p-5 space-y-3`}
            >
              <div className="flex items-center gap-2">
                <Badge className={`${phase.badgeColor} text-white text-xs`}>
                  {phase.phase}
                </Badge>
                <h3 className="font-bold">{phase.title}</h3>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            Dicas de Ouro para o Sucesso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Sempre verifique a autenticidade antes de comprar — use relojoeiros de confiança",
              "Documente tudo: fotos antes/depois, recibos, conversas de negociação",
              "Construa reputação: avaliações no OLX e depoimentos no Instagram valem ouro",
              "Mantenha capital de giro: nunca invista mais de 70% do caixa em estoque",
              "Aprenda sobre as marcas: conhecimento = poder de negociação na compra",
              "Rede de contatos: relojoeiros, assistências técnicas e colecionadores são aliados",
              "Fotos fazem a diferença: invista em boa câmera e fundo neutro",
              "Preço justo > preço alto: giro rápido é melhor que esperar margem máxima",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-3 p-3 rounded-lg bg-background border border-border/50">
                <Star className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer CTA */}
      <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-center text-white">
        <Watch className="h-12 w-12 mx-auto mb-4 text-amber-400" />
        <h2 className="text-2xl font-black mb-2">Pronto para Começar?</h2>
        <p className="text-slate-300 max-w-lg mx-auto">
          Com R$ 5.000 de capital inicial, consistência e boa estratégia de compra,
          é possível construir uma renda sólida no mercado de relógios premium em menos de 6 meses.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge className="bg-amber-500 text-black font-bold text-sm px-4 py-2">
            Passo 1: Pesquisar preços de mercado
          </Badge>
          <Badge className="bg-amber-500 text-black font-bold text-sm px-4 py-2">
            Passo 2: Criar perfil Instagram
          </Badge>
          <Badge className="bg-amber-500 text-black font-bold text-sm px-4 py-2">
            Passo 3: Fazer primeira compra
          </Badge>
        </div>
      </div>
    </div>
  );
}
