import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Company Info & Contact */}
          <div className="space-y-6">
            <div className="flex justify-center md:justify-start">
              <img src="/lovable-uploads/2f935e40-4341-45ce-ac1a-7d9932defd80.png" alt="MMR Hardware Logo" className="h-28 w-auto brightness-0 invert" />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-foreground">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <a href="mailto:Michael@MMRHardware.com" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 flex items-center gap-2">
                    <span className="w-4 h-4">✉</span>
                    Michael@MMRHardware.com
                  </a>
                </div>
                <div>
                  <a href="tel:+16475617045" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 flex items-center gap-2">
                    <span className="w-4 h-4">📞</span>
                    647-561-7045
                  </a>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90" onClick={() => window.location.href = 'tel:+16475617045'}>
                Get a Quote
              </Button>
            </div>
          </div>

          {/* Mailing List */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary-foreground">Stay Updated</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Get notified about new products and design tips.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input type="email" placeholder="Enter email" className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 focus:border-primary-foreground text-primary-foreground placeholder:text-primary-foreground/40 text-sm h-9" />
                <Button variant="secondary" size="sm" className="px-4 h-9 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-foreground">Quick Links</h3>
              <nav className="grid grid-cols-2 gap-2 text-sm">
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300">Home</Link>
                <Link to="/about-us" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300">About Us</Link>
                <Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300">Products</Link>
                <button onClick={() => window.location.href = 'tel:+16475617045'} className="text-left text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300">Request Quote</button>
              </nav>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-primary-foreground">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-all border border-primary-foreground/20 text-primary-foreground/60 hover:text-primary-foreground">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-all border border-primary-foreground/20 text-primary-foreground/60 hover:text-primary-foreground">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-all border border-primary-foreground/20 text-primary-foreground/60 hover:text-primary-foreground">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-primary-foreground/60 text-xs">
            MMR Hardware © 2025 - Premium hardware worldwide.
          </p>
          <div className="flex space-x-4 text-xs">
            <Link to="/privacy-policy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300">Privacy Policy</Link>
            <span className="text-primary-foreground/30">|</span>
            <Link to="/terms-of-service" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
