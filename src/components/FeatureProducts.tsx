import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import doorHandlesImage from "@/assets/door-handles.png";
import slidingDoorSystemsImage from "@/assets/sliding-door-systems.png";
import doorClosersImage from "@/assets/door-closers.png";
import doorStopsGuidesImage from "/lovable-uploads/03a3fcaf-9c08-43ac-8ceb-18b0d0bd8aa9.png";
import hingesImage from "/lovable-uploads/771df4e8-d346-41df-ac0e-5d69177e3dce.png";
import aluminumBaseBoardsImage from "/lovable-uploads/e1c143de-c914-41e0-9b83-8c870e0e7b3a.png";

type FeatureProductsProps = { showTitle?: boolean };
const FeatureProducts = ({ showTitle = true }: FeatureProductsProps) => {
  const products = [
    {
      title: "Door Handles",
      image: doorHandlesImage,
      path: "/door-handles"
    },
    {
      title: "Sliding Door Systems", 
      image: slidingDoorSystemsImage,
      path: "/sliding-door-systems"
    },
    {
      title: "Door Closers",
      image: doorClosersImage,
      path: "/door-closers"
    },
    {
      title: "Door Stops & Guides",
      image: doorStopsGuidesImage,
      path: "/door-stops-guides"
    },
    {
      title: "Hinges",
      image: hingesImage,
      path: "/hinges"
    },
    {
      title: "Aluminum Base Boards",
      image: aluminumBaseBoardsImage,
      path: "/aluminum-baseboards"
    }
  ];

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-6">
          {showTitle && (
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
                Our Products
              </h2>
            </div>
          )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {products.map((product, index) => (
            <Link key={index} to={product.path} className="group space-y-6 block">
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-card border border-luxury-glass-border">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Title */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-luxury-gold transition-colors">
                  {product.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Luxury CTA Section */}
        <div className="text-center mt-20 relative">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
          </div>
          
          <div className="relative z-10 p-12 rounded-3xl bg-luxury-glass-overlay/30 backdrop-blur-sm border border-luxury-glass-border/40 max-w-2xl mx-auto animate-[scale-in_1s_ease-out_0.5s_both]">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in">
              Ready to Transform Your Space?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 animate-[fade-in_1s_ease-out_0.3s_both]">
              Get a personalized quote for premium hardware solutions tailored to your project
            </p>
            
            <Button 
              variant="luxury" 
              size="xl" 
              className="group px-12 py-6 text-xl font-semibold hover-scale shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-500 animate-[scale-in_1s_ease-out_0.6s_both]"
              onClick={() => window.location.href = 'tel:+16475617045'}
            >
              <span className="relative z-10">Get Your Quote</span>
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeatureProducts;