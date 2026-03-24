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
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
            Customer Benefits
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group text-center space-y-6 p-8 rounded-xl bg-background border border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-accent group-hover:bg-primary/5 transition-all duration-300 border border-border group-hover:border-primary/20">
                  <benefit.icon className="w-16 h-16 text-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
