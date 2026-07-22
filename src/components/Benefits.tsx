import { Package, Shield, Settings, Headphones, Clock } from "lucide-react";
import officeInterior from "@/assets/office-interior.jpg";

const Benefits = () => {
  const benefits = [
    {
      icon: Package,
      title: "Over 10 years of experience",
      description: "Our team has decades of industry knowledge in interior and exterior hardware for both residential and commercial builds."
    },
    {
      icon: Shield,
      title: "Expert Design Support",
      description: "From CAD modeling to 3D printing, we provide the tools and talent to turn concepts into fully engineered products."
    },
    {
      icon: Settings,
      title: "Custom Manufacturing",
      description: "We specialize in bringing unique ideas to life, offering rapid prototyping and production tailored to your project needs."
    },
    {
      icon: Headphones,
      title: "Reliable Warranties & Support",
      description: "Every product is backed by industry-leading warranties and personal customer service."
    },
    {
      icon: Package,
      title: "High-Quality Materials",
      description: "Our hardware is made with premium metals and finishes, designed for performance, durability, and visual appeal."
    },
    {
      icon: Clock,
      title: "Fast & Dependable Lead Times",
      description: "We know timing matters. That's why we focus on getting your hardware to you quickly and reliably without ever sacrificing quality."
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-background relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${officeInterior})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold heading-accent">
            Why Choose MMR Hardware?
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="group space-y-6 p-6 rounded-xl card-lift hover:bg-secondary/60">
              {/* Icon */}
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center border border-border group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="w-8 h-8 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
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

export default Benefits;
