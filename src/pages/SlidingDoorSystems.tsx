import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import slidingDoorSystemsImage from "/lovable-uploads/4322a9ca-a4ab-42a2-8e44-4052b28ac914.png";
import sweepGlideSoftClose from "/lovable-uploads/7a043154-c1ce-4cfd-9a5a-35ce8a759ac3.png";
import blackIron1 from "/lovable-uploads/c44d159e-8f02-4990-9248-ecd5337ce2f6.png";
import blackIron2 from "/lovable-uploads/eb02d6b7-84d2-4b48-a9a0-e570660966be.png";
import blackIron3 from "/lovable-uploads/12fd0915-9870-407f-bbd6-d562b1368d08.png";
import blackIron4 from "/lovable-uploads/0f310d29-4455-476b-9bf4-a3a832d4f8be.png";
import stainless1 from "/lovable-uploads/41ba30b7-b660-49fb-88a1-e86b034a2fcb.png";
import stainless2 from "/lovable-uploads/26263fdd-3239-421c-96d6-4546dec03d3f.png";
import stainless3 from "/lovable-uploads/35f5a49b-fc97-40df-aff2-5da9fc55ba23.png";

const SlidingDoorSystems = () => {
  const products = [
    {
      title: "Sweep Glide Soft Close 120KG",
      image: sweepGlideSoftClose
    },
    {
      title: "Black Iron 1", 
      image: blackIron1
    },
    {
      title: "Black Iron 2",
      image: blackIron2
    },
    {
      title: "Black Iron 3",
      image: blackIron3
    },
    {
      title: "Black Iron 4",
      image: blackIron4
    },
    {
      title: "Stainless 1",
      image: stainless1
    },
    {
      title: "Stainless 2",
      image: stainless2
    },
    {
      title: "Stainless 3",
      image: stainless3
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-52 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
              Sliding Door Systems
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional sliding door hardware for smooth and reliable operation
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

export default SlidingDoorSystems;