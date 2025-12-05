import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import solidLadderPull from "@/assets/solid-ladder-pull.jpeg";
import hollowLadderPull from "@/assets/hollow-ladder-pull.jpeg";
import nonLockingLadderPull from "/lovable-uploads/8896ac0f-490c-40fd-b3fe-9337ab0e7e25.png";
import lockingLadderPullLever from "/lovable-uploads/412b9021-2316-4ac6-9831-c5d4ffb91bdc.png";
import lockingLadderPullThumb from "/lovable-uploads/3d557921-a0c4-433e-a7a3-93904f7ba556.png";

const DoorHandles = () => {
  const products = [
    {
      title: "Solid Ladder Pulls",
      image: solidLadderPull
    },
    {
      title: "Hollow Ladder Pulls", 
      image: hollowLadderPull
    },
    {
      title: "Non-Locking Ladder Pulls",
      image: nonLockingLadderPull
    },
    {
      title: "Locking Ladder Pulls - Lever Turn",
      image: lockingLadderPullLever
    },
    {
      title: "Locking Ladder Pulls - Thumb Turn",
      image: lockingLadderPullThumb
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-52 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
              Door Handles
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium door handles designed for both function and aesthetics
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

export default DoorHandles;