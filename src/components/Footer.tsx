import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="py-16 bg-gradient-to-b from-card to-background border-t border-luxury-glass-border/30 relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-luxury opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-luxury-gold/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Company Info & Contact - Streamlined */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <img 
                src="/lovable-uploads/2f935e40-4341-45ce-ac1a-7d9932defd80.png" 
                alt="MMR Hardware Logo" 
                className="h-28 w-auto"
              />
            </div>

            {/* Contact Info - More Compact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <a 
                    href="mailto:Michael@MMRHardware.com" 
                    className="text-muted-foreground hover:text-luxury-gold transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-4 h-4 text-luxury-gold">✉</span>
                    Michael@MMRHardware.com
                  </a>
                </div>
                <div>
                  <a 
                    href="tel:+16475617045" 
                    className="text-muted-foreground hover:text-luxury-gold transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-4 h-4 text-luxury-gold">📞</span>
                    647-561-7045
                  </a>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <span className="w-4 h-4 text-luxury-gold">📍</span>
                  <span className="text-xs">266 Rutherford Rd S, Unit 18, Brampton, ON</span>
                </div>
              </div>
              
              <Button 
                variant="glass" 
                size="sm"
                className="w-full hover-scale transition-all duration-300"
                onClick={() => window.location.href = 'tel:+16475617045'}
              >
                Get a Quote
              </Button>
            </div>
          </div>

          {/* Mailing List - Compact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get notified about new products and design tips.
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter email"
                  className="flex-1 bg-secondary/60 border-luxury-glass-border/50 focus:border-luxury-gold text-sm h-9"
                />
                <Button variant="luxury" size="sm" className="px-4 h-9">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation & Social - Combined */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
              <nav className="grid grid-cols-2 gap-2 text-sm">
                <Link to="/" className="text-muted-foreground hover:text-luxury-gold transition-colors duration-300">
                  Home
                </Link>
                <Link to="/about-us" className="text-muted-foreground hover:text-luxury-gold transition-colors duration-300">
                  About Us
                </Link>
                <Link to="/products" className="text-muted-foreground hover:text-luxury-gold transition-colors duration-300">
                  Products
                </Link>
                <button 
                  onClick={() => window.location.href = 'tel:+16475617045'}
                  className="text-left text-muted-foreground hover:text-luxury-gold transition-colors duration-300"
                >
                  Request Quote
                </button>
              </nav>
            </div>

            {/* Social Links - Smaller */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-secondary/60 rounded-full flex items-center justify-center hover:bg-luxury-glass-overlay hover:border-luxury-gold transition-all border border-transparent text-luxury-gold/60 hover:text-luxury-gold">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-secondary/60 rounded-full flex items-center justify-center hover:bg-luxury-glass-overlay hover:border-luxury-gold transition-all border border-transparent text-luxury-gold/60 hover:text-luxury-gold">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-secondary/60 rounded-full flex items-center justify-center hover:bg-luxury-glass-overlay hover:border-luxury-gold transition-all border border-transparent text-luxury-gold/60 hover:text-luxury-gold">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - More Compact */}
        <div className="mt-12 pt-6 border-t border-luxury-glass-border/20 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-muted-foreground text-xs">
            MMR Hardware © 2025 - Premium hardware worldwide.
          </p>
          <div className="flex space-x-4 text-xs">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-luxury-gold transition-colors duration-300">
              Privacy Policy
            </Link>
            <span className="text-muted-foreground/50">|</span>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-luxury-gold transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;