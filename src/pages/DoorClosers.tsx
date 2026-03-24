import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import doorClosersImage from "/lovable-uploads/dc01b2e3-c2f8-41fa-ba9e-9138194eaf65.png";

const DoorClosers = () => {
  const products = [{ title: "AXS Slim Closer", image: doorClosersImage }];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-52 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Door Closers</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Reliable door closing solutions for commercial and residential applications</p>
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

export default DoorClosers;
