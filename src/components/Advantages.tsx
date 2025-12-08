import { Building2, Home, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import hardwareProducts from "@/assets/hardware-products.jpg";

const Advantages = () => {
  const advantages = [
    {
      title: "Commercial Hardware Solutions",
      description: "Engineered for heavy use and finished with timeless elegance. From corporate interiors to industrial sites, our products exceed performance and safety standards and elevate the aesthetic of any workspace.",
      icon: Building2
    },
    {
      title: "Residential Hardware Solutions",
      description: "Built for constant use and styled with lasting sophistication. From office interiors to industrial applications, our hardware outperforms rigorous standards and elevates every environment it's installed in.",
      icon: Home
    },
    {
      title: "Custom Hardware Design & Manufacturing",
      description: "Need something tailored? We offer full end-to-end custom hardware design, prototyping, and manufacturing services. Whether you have a rough sketch or a detailed CAD file, our team will help you bring it to life with precision and speed.",
      icon: Settings
    }
  ];

  return (
    <section id="advantages" className="py-24 bg-card relative overflow-hidden">
      {/* Background Image with Enhanced Effects */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 animate-[scale-in_2s_ease-out]"
        style={{ backgroundImage: `url(${hardwareProducts})` }}
      >
        <div className="absolute inset-0 bg-gradient-dark"></div>
      </div>

      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-luxury opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-luxury opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 animate-fade-in hover-scale">
            What We Offer
          </h2>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {advantages.map((advantage, index) => (
            <div 
              key={index} 
              className="group space-y-6 text-center p-8 rounded-2xl bg-luxury-glass-overlay/20 backdrop-blur-sm border border-luxury-glass-border/30 hover:bg-luxury-glass-overlay/40 hover:border-luxury-gold/50 transition-all duration-500 hover-scale animate-[fade-in_1s_ease-out] hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-luxury-gold/10 group-hover:bg-luxury-gold/20 transition-all duration-500 group-hover:scale-110">
                  <advantage.icon className="w-16 h-16 text-luxury-gold group-hover:text-luxury-gold-dark transition-colors duration-500" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-luxury-gold transition-colors duration-500">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* About Us CTA */}
        <div className="text-center animate-[scale-in_1s_ease-out_0.8s_both]">
          <Button asChild variant="luxury" size="lg" className="px-8 py-4 text-lg hover-scale shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-all duration-500">
            <Link to="/about-us">About Us</Link>
          </Button>
        </div>

      </div>
    </section>
  );
};

export default Advantages;