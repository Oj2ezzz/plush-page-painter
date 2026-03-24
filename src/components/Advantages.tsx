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
    <section id="advantages" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Image with Subtle Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${hardwareProducts})` }}
      >
        <div className="absolute inset-0 bg-secondary/80"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
            What We Offer
          </h2>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="group space-y-6 text-center p-8 rounded-xl bg-background border border-border hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-accent group-hover:bg-primary/5 transition-all duration-300">
                  <advantage.icon className="w-16 h-16 text-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* About Us CTA */}
        <div className="text-center">
          <Button asChild variant="luxury" size="lg" className="px-8 py-4 text-lg">
            <Link to="/about-us">About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
