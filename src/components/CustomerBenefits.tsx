import { Crown, Sparkles, PaintBucket, Shield } from "lucide-react";

const CustomerBenefits = () => {
  const benefits = [
    {
      title: "Exclusive Client Discount Program",
      description: "Enjoy special pricing and perks when you join our loyalty program.",
      icon: Crown
    },
    {
      title: "Fast Lead Times",
      description: "Thanks to in-house prototyping and local production partners, we deliver quickly and reliably.",
      icon: Sparkles
    },
    {
      title: "Custom Collection Options",
      description: "Create your own product line tailored to your project's unique style and function.",
      icon: PaintBucket
    },
    {
      title: "Dedicated Support Team",
      description: "Have a question or warranty request? Our support team is just a phone call or email away.",
      icon: Shield
    }
  ];

  return (
    <section className="py-24 bg-muted/10 relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-luxury-gold/3 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-luxury-gold/5 rounded-full blur-2xl animate-[pulse_6s_ease-in-out_infinite]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 animate-fade-in hover-scale">
            Customer Benefits
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group text-center space-y-6 p-8 rounded-2xl bg-luxury-glass-overlay/20 backdrop-blur-sm border border-luxury-glass-border/30 hover:bg-luxury-glass-overlay/40 hover:border-luxury-gold/50 transition-all duration-500 hover-scale animate-[fade-in_1s_ease-out] hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-luxury-gold/10 group-hover:bg-luxury-gold/20 transition-all duration-500 group-hover:scale-110 border border-luxury-gold/20 group-hover:border-luxury-gold/40">
                  <benefit.icon className="w-16 h-16 text-luxury-gold group-hover:text-luxury-gold-dark transition-colors duration-500" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-luxury-gold transition-colors duration-500">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerBenefits;