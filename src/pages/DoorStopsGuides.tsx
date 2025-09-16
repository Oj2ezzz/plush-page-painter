import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import doorStopsGuidesImage from "/lovable-uploads/03a3fcaf-9c08-43ac-8ceb-18b0d0bd8aa9.png";
import ds1Silver from "/lovable-uploads/b7e70470-8bcf-47ef-b9f2-349a1d3119b9.png";
import ds1Black from "/lovable-uploads/a2cd48a8-e2ae-46d7-9644-7e974fee7d56.png";
import dsaAluminum from "/lovable-uploads/5a76b01d-2b09-44af-b7a5-65d95483433f.png";
import dsgGlass from "/lovable-uploads/b2fa7947-f29f-47dd-aad5-9cb8af1c83d7.png";
import dg1Silver from "/lovable-uploads/4a02545e-b42f-444b-910f-4476fd4fa848.png";
import dg1Black from "/lovable-uploads/bc07205d-0d81-4899-a931-77f78369809a.png";

const DoorStopsGuides = () => {
  const products = [
    {
      title: "DS1 Silver",
      image: ds1Silver
    },
    {
      title: "DS1 Black", 
      image: ds1Black
    },
    {
      title: "DSA Aluminum",
      image: dsaAluminum
    },
    {
      title: "DSG Glass",
      image: dsgGlass
    },
    {
      title: "DG1 Silver",
      image: dg1Silver
    },
    {
      title: "DG1 Black",
      image: dg1Black
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-52 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
              Door Stops & Guides
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protective and functional door stops and guides for every application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {products.map((product, index) => (
              <div key={index} className="group space-y-6">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-luxury-glass-border">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-luxury-gold transition-colors">
                    {product.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Request Quote CTA */}
          <div className="text-center mt-16">
            <Button 
              variant="luxury" 
              size="lg"
              onClick={() => window.location.href = 'tel:+16475617045'}
            >
              Request a Quote
            </Button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoorStopsGuides;