import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import doorHandlesImage from "@/assets/door-handles.png";

import doorClosersImage from "@/assets/door-closers.png";
import doorStopsGuidesImage from "@/assets/door-stops-guides.png";
import hingesImage from "@/assets/hinges.png";


type FeatureProductsProps = { showTitle?: boolean };
const FeatureProducts = ({ showTitle = true }: FeatureProductsProps) => {
  const products = [
    { title: "Door Handles", image: doorHandlesImage, path: "/door-handles" },
    
    { title: "Door Closers", image: doorClosersImage, path: "/door-closers" },
    { title: "Door Stops & Guides", image: doorStopsGuidesImage, path: "/door-stops-guides" },
    { title: "Hinges", image: hingesImage, path: "/hinges" },
    
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {products.map((product, index) => (
            <Link key={index} to={product.path} className="group space-y-6 block">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-secondary border border-border shadow-sm group-hover:shadow-lg transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-muted-foreground transition-colors">
                  {product.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 relative">
          <div className="relative z-10 p-12 rounded-2xl bg-secondary border border-border max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Space?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Get a personalized quote for premium hardware solutions tailored to your project
            </p>
            <Button
              variant="luxury"
              size="xl"
              className="group px-12 py-6 text-xl font-semibold"
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
