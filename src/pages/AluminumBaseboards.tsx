import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import aluminumBaseBoardsImage from "/lovable-uploads/e1c143de-c914-41e0-9b83-8c870e0e7b3a.png";
import axsIlluminateTrim from "/lovable-uploads/875f04d8-8a5b-4713-86de-0ef266683fc1.png";
import axsWideTrim from "/lovable-uploads/90e61867-d074-4829-a088-b32f5c20637a.png";
import axsSlimTrim from "/lovable-uploads/f94fda8c-403e-4315-8ae4-1abb70082bc2.png";

const AluminumBaseboards = () => {
  const products = [
    { title: "AXS Illuminate-Trim", image: axsIlluminateTrim },
    { title: "AXS Wide-Trim", image: axsWideTrim },
    { title: "AXS XL-Trim", image: aluminumBaseBoardsImage },
    { title: "AXS Slim-Trim", image: axsSlimTrim }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-52 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Aluminum Base Boards</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Modern aluminum trim solutions for a clean, professional finish</p>
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

export default AluminumBaseboards;
