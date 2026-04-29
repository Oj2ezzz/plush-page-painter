import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBuilding from "@/assets/hero-building.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-[scale-in_1.5s_ease-out]"
        style={{ backgroundImage: `url(${heroBuilding})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-60 pb-32">
        <div className="max-w-4xl">
          {/* 5 Star Rating */}
          <div className="flex items-center justify-center md:justify-start mb-6 animate-[fade-in_1s_ease-out_0.3s_both]">
            <div className="flex items-center gap-2">
              <div className="flex text-foreground">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2 font-medium">(4.8/5.0)</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight animate-fade-in">
            <span className="inline-block animate-[slide-in-right_1s_ease-out]">Premium Hardware for</span>
            <br />
            <span className="text-foreground inline-block animate-[slide-in-right_1s_ease-out_0.3s_both]">
              Elevated Spaces
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed animate-[fade-in_1s_ease-out_0.6s_both]">
            Trusted by contractors, builders, and architects worldwide.
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed animate-[fade-in_1s_ease-out_0.9s_both]">
            Whether you need off-the-shelf solutions or completely customized pieces, our team is here to
            deliver outstanding design, strength, and support—every step of the way.
          </p>

          {/* CTA Button */}
          <div className="animate-[scale-in_1s_ease-out_1.2s_both]">
            <Button
              variant="luxury"
              size="xl"
              className="group shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => window.location.href = 'tel:+16475617045'}
            >
              <span className="relative z-10">Request a Quote</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
