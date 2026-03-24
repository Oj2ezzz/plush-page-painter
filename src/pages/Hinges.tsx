import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import hingesImage from "/lovable-uploads/771df4e8-d346-41df-ac0e-5d69177e3dce.png";
import latus80 from "/lovable-uploads/8acf7cae-10f8-4f64-a290-6ca95569be93.png";
import latus60 from "/lovable-uploads/50b26857-d222-4994-8571-387b60d6276b.png";
import frenum from "/lovable-uploads/a53ddc49-185b-4b2e-a2a7-0bda27abf476.png";
import frenum4FWXN from "/lovable-uploads/49613500-8000-446d-88c8-9530c93b2f7d.png";

const Hinges = () => {
  const products = [
    { title: "Free Swing Hinge", image: hingesImage },
    { title: "Latus 80", image: latus80 },
    { title: "Latus 60", image: latus60 },
    { title: "Frenum", image: frenum },
    { title: "Frenum 4FWXN", image: frenum4FWXN }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-52 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Hinges</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">High-quality hinges for smooth door operation and lasting durability</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {products.map((product, index) => (
              <div key={index} className="group space-y-6">
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-secondary border border-border shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-muted-foreground transition-colors">{product.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button variant="luxury" size="lg" onClick={() => window.location.href = 'tel:+16475617045'}>Request a Quote</Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Hinges;
