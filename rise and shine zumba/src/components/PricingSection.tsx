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
  const pricingRow = sec("pricing");
  if (pricingRow && pricingRow.is_visible === false) return null;

  const filteredData = type === "all" 
    ? PRICING_DATA 
    : PRICING_DATA.filter(item => item.id === type);

  if (filteredData.length === 0) return null;

  return (
    <section className="bg-background py-24 relative overflow-hidden border-t border-border/50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary uppercase text-sm tracking-[0.4em] font-bold mb-4">Investment in Yourself</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-8xl mb-6">
            {type === "dance" ? "DANCE " : type === "fitness" ? "FITNESS " : ""}PRICING <span className="text-gradient-fire">PLANS.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose a plan that fits your schedule. Save more with our multi-month commitment packages.
          </p>
        </div>

        <div className={`grid gap-8 ${filteredData.length === 1 ? "max-w-xl mx-auto" : filteredData.length === 2 ? "max-w-5xl mx-auto md:grid-cols-2" : "lg:grid-cols-3 max-w-7xl mx-auto"}`}>
          {filteredData.map((cat, idx) => (
            <div key={`${cat.category}-${idx}`} className="flex flex-col bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 group/card">
              {/* Header */}
              <div className="p-8 border-b border-border/50 bg-muted/30">
                <div className="text-4xl mb-4 group-hover/card:scale-110 transition-transform duration-500">{cat.icon}</div>
                <h3 className="font-display text-3xl mb-1">{cat.category}</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-widest">{cat.subtitle}</p>
              </div>

              {/* Plans */}
              <div className="p-8 flex-grow space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Regular Batches
                  </h4>
                  <div className="space-y-3">
                    {cat.regular.map((plan) => (
                      <div 
                        key={plan.duration} 
                        className={`p-4 border ${plan.featured ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_rgba(255,100,0,0.05)]" : "border-border/50"} flex justify-between items-center group hover:border-primary/30 transition-all duration-300`}
                      >
                        <div>
                          <p className="font-bold text-sm">{plan.duration}</p>
                          {plan.discount && (
                            <p className="text-[10px] text-primary uppercase font-bold tracking-tighter">{plan.discount}</p>
                          )}
                        </div>
                        <div className="text-right">
                          {plan.original && (
                            <p className="text-xs text-muted-foreground line-through opacity-50">{plan.original}</p>
                          )}
                          <p className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">{plan.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Weekend Batches
                  </h4>
                  <div className="space-y-3">
                    {cat.weekend.map((plan) => (
                      <div key={plan.duration} className="p-4 border border-border/50 flex justify-between items-center hover:border-secondary/30 transition-all duration-300">
                        <p className="font-bold text-sm">{plan.duration}</p>
                        <p className="font-display text-2xl text-secondary">{plan.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 bg-muted/10 border-t border-border/30">
                <a 
                  href="/contact" 
                  className="block w-full text-center py-4 bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-lg hover:shadow-primary/20"
                >
                  Book Free Trial
                </a>
                <p className="mt-4 text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1 opacity-60">
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

