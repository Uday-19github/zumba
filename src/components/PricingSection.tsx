import { Info } from "lucide-react";
import { useContent } from "@/hooks/useContent";

interface PricingSectionProps {
  type?: "dance" | "fitness" | "all";
}

const PRICING_DATA = [
  {
    id: "fitness",
    category: "Adults Zumba Fitness",
    subtitle: "High-energy cardio dance",
    icon: "💃",
    regular: [
      { duration: "Monthly", price: "₹2,500" },
      { duration: "3 Months", price: "₹6,500", original: "₹7,500", discount: "Save ₹1,000", featured: true },
      { duration: "6 Months", price: "₹12,000", original: "₹15,000", discount: "Save ₹3,000" },
      { duration: "12 Months", price: "₹23,000", original: "₹30,000", discount: "Save ₹7,000" },
    ],
    weekend: [
      { duration: "Weekend Monthly", price: "₹2,000" },
      { duration: "Weekend 3 Months", price: "₹5,000" },
    ]
  },
  {
    id: "dance",
    category: "Adults Dance Classes",
    subtitle: "Master the art of movement",
    icon: "🕺",
    regular: [
      { duration: "Monthly", price: "₹2,500" },
      { duration: "3 Months", price: "₹6,500", original: "₹7,500", discount: "Save ₹1,000", featured: true },
      { duration: "6 Months", price: "₹12,000", original: "₹15,000", discount: "Save ₹3,000" },
      { duration: "12 Months", price: "₹23,000", original: "₹30,000", discount: "Save ₹7,000" },
    ],
    weekend: [
      { duration: "Weekend Monthly (8 Sessions)", price: "₹2,000" },
      { duration: "Weekend 3 Months", price: "₹5,000" },
    ]
  },
  {
    id: "dance",
    category: "Children Dance",
    subtitle: "Junior rhythmic stars",
    icon: "⭐",
    regular: [
      { duration: "Monthly", price: "₹2,000" },
      { duration: "3 Months", price: "₹5,000", original: "₹6,000", discount: "Save ₹1,000", featured: true },
      { duration: "6 Months", price: "₹9,000", original: "₹12,000", discount: "Save ₹3,000" },
      { duration: "12 Months", price: "₹17,000", original: "₹24,000", discount: "Save ₹7,000" },
    ],
    weekend: [
      { duration: "Weekend Monthly (8 Sessions)", price: "₹1,500" },
      { duration: "Weekend 3 Months", price: "₹4,000" },
    ]
  },
];

export const PricingSection = ({ type = "all" }: PricingSectionProps) => {
  const { content, loading } = useContent();

  if (loading) return null;

  const sec = (key: string) => content.find(c => c.section_key === key);
  
  const tiers = [
    { key: "pricing_spark", accent: "primary" },
    { key: "pricing_blaze", accent: "primary", featured: true },
    { key: "pricing_inferno", accent: "secondary" }
  ].map(t => {
    const row = sec(t.key);
    if (!row || !row.is_visible) return null;
    const meta = row.meta as any;
    return {
      title: row.title || (t.key === "pricing_spark" ? "Spark" : t.key === "pricing_blaze" ? "Blaze" : "Inferno"),
      price: meta?.pricingPrice || "₹2,499",
      per: meta?.pricingPer || "/month",
      perks: Array.isArray(meta?.pricingPerks) ? meta.pricingPerks : ["Standard Access", "Certified Trainers"],
      featured: t.featured,
      accent: t.accent
    };
  }).filter(Boolean);

  if (tiers.length === 0) return null;

  return (
    <section className="bg-background py-24 relative overflow-hidden border-t border-border/50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary uppercase text-sm tracking-[0.4em] font-bold mb-4">Investment in Yourself</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl mb-6">
            MEMBERSHIP <span className="text-gradient-fire">PLANS.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose a plan that fits your goals. From casual learners to future professionals — we've got the floor for you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {tiers.map((tier: any, idx) => (
            <div key={idx} className={`relative flex flex-col bg-card border ${tier.featured ? "border-primary/50 shadow-glow" : "border-border/50"} transition-all duration-500 hover:-translate-y-2`}>
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 z-20 shadow-lg">
                  Most Popular
                </div>
              )}
              
              {/* Header */}
              <div className="p-10 text-center border-b border-border/30">
                <h3 className="font-display text-4xl mb-4 uppercase tracking-wider">{tier.title}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl md:text-5xl font-display ${tier.accent === "primary" ? "text-primary" : "text-secondary"}`}>{tier.price}</span>
                  <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">{tier.per}</span>
                </div>
              </div>

              {/* Perks */}
              <div className="p-10 flex-grow space-y-4">
                {tier.perks.map((perk: string, pIdx: number) => (
                  <div key={pIdx} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${tier.accent === "primary" ? "bg-primary" : "bg-secondary"}`} />
                    <span className="text-sm font-medium text-foreground/80">{perk}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-10 pt-0">
                <a 
                  href="/contact" 
                  className={`block w-full text-center py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 ${
                    tier.featured 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  Get Started
                </a>
                <p className="mt-4 text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1 opacity-50">
                  <Info className="w-3 h-3" /> No registration fee. Taxes inclusive.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

