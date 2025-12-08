import { Button } from "@/components/ui/button";
import discoveryConsultation from "@/assets/discovery-consultation.png";
import designDevelopment from "@/assets/design-development.png";
import productionSourcing from "@/assets/production-sourcing.png";
import qualityControl from "@/assets/quality-control.png";

const ProductDevelopment = () => {
  const categories = [
    {
      title: "1. Discovery & Consultation",
      description: "We begin by understanding your goals, specs, and any challenges you're facing. Whether it's a custom build or a standard order, we treat each project with care.",
      image: discoveryConsultation
    },
    {
      title: "2. Design & Development", 
      description: "Using CAD software and 3D printing tools, we model and prototype your custom components with precision.",
      image: designDevelopment
    },
    {
      title: "3. Production & Sourcing",
      description: "Once approved, we move into full-scale production, sourcing high-grade materials to ensure quality at every level.",
      image: productionSourcing
    },
    {
      title: "4. Quality Control",
      description: "Every piece goes through a rigorous quality check before shipping. We guarantee reliability, consistency, and finish.",
      image: qualityControl
    }
  ];

  return (
    <section id="development" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
            Our Process
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="group space-y-6">
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-luxury-gold transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="luxury" 
            size="xl"
            onClick={() => window.location.href = 'tel:+16475617045'}
          >
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductDevelopment;