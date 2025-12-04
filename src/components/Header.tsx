import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import mmrLogo from "@/assets/mmr-logo-new.jpeg";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all duration-700 ease-out transform ${isScrolled ? 'scale-95 py-1' : 'scale-100'}`}>
        {/* Trust Badge */}
        <div className={`bg-gradient-luxury shadow-sm transition-all duration-700 ease-out ${isScrolled ? 'py-0.5 opacity-80' : 'py-2 opacity-100'}`}>
          <div className="container mx-auto px-6">
            <p className={`text-center font-medium text-background animate-fade-in transition-all duration-700 ease-out ${isScrolled ? 'text-xs scale-90' : 'text-sm scale-100'}`}>
              ✨ Backed by 25+ years of experience
            </p>
          </div>
        </div>
        
        <div className={`container mx-auto px-6 transition-all duration-700 ease-out ${isScrolled ? 'py-1.5' : 'py-3'}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" onClick={closeMobileMenu} className="hover-scale transition-transform duration-300">
                <div className={`rounded-full overflow-hidden bg-[hsl(220,18%,20%)] p-1 transition-all duration-700 ease-out ${isScrolled ? 'h-20 w-20' : 'h-28 w-28'}`}>
                  <img src={mmrLogo} alt="MMR Hardware Logo" className="w-full h-full object-cover rounded-full" />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-muted-foreground hover:text-luxury-gold transition-all duration-300 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-luxury-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                Home
              </Link>
              <Link to="/about-us" className="text-muted-foreground hover:text-luxury-gold transition-all duration-300 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-luxury-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                About Us
              </Link>
              <Link to="/products" className="text-muted-foreground hover:text-luxury-gold transition-all duration-300 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-luxury-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                Products
              </Link>
            </nav>

            {/* Desktop CTA Button */}
            <Button 
              variant="luxury" 
              size="sm"
              className="hidden md:flex hover-scale shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-500"
              onClick={() => window.location.href = 'tel:+16475617045'}
            >
              Request a Quote
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-muted-foreground hover:text-luxury-gold transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md md:hidden animate-fade-in"
          onClick={closeMobileMenu}
        >
          <div 
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-card/98 backdrop-blur-xl border-l border-luxury-glass-border shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={closeMobileMenu}
                className="p-2 text-muted-foreground hover:text-luxury-gold transition-colors rounded-full hover:bg-luxury-glass-overlay"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Mobile Menu Content */}
            <div className="flex flex-col h-full pt-20 px-6">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="rounded-full overflow-hidden bg-[hsl(220,18%,20%)] p-1 h-24 w-24">
                  <img src={mmrLogo} alt="MMR Hardware Logo" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-6 flex-1">
                <Link 
                  to="/" 
                  onClick={closeMobileMenu}
                  className="text-xl font-semibold text-foreground hover:text-luxury-gold transition-all duration-300 py-4 px-4 rounded-xl hover:bg-luxury-glass-overlay border-b border-luxury-glass-border/30"
                >
                  Home
                </Link>
                <Link 
                  to="/about-us" 
                  onClick={closeMobileMenu}
                  className="text-xl font-semibold text-foreground hover:text-luxury-gold transition-all duration-300 py-4 px-4 rounded-xl hover:bg-luxury-glass-overlay border-b border-luxury-glass-border/30"
                >
                  About Us
                </Link>
                <Link 
                  to="/products" 
                  onClick={closeMobileMenu}
                  className="text-xl font-semibold text-foreground hover:text-luxury-gold transition-all duration-300 py-4 px-4 rounded-xl hover:bg-luxury-glass-overlay border-b border-luxury-glass-border/30"
                >
                  Products
                </Link>
              </nav>

              {/* Contact Info */}
              <div className="space-y-4 py-6 border-t border-luxury-glass-border/30 bg-luxury-glass-overlay/30 rounded-xl mx-2">
                <div className="text-center space-y-2 px-4">
                  <p className="text-sm text-muted-foreground">Get in touch</p>
                  <a 
                    href="tel:+16475617045" 
                    className="block text-lg font-semibold text-luxury-gold hover:text-luxury-gold/80 transition-colors"
                  >
                    647-561-7045
                  </a>
                  <a 
                    href="mailto:Michael@MMRHardware.com" 
                    className="block text-sm text-muted-foreground hover:text-luxury-gold transition-colors"
                  >
                    Michael@MMRHardware.com
                  </a>
                </div>
              </div>

              {/* Request Quote Button */}
              <div className="pb-8 px-2">
                <Button 
                  variant="luxury" 
                  size="lg"
                  className="w-full text-lg py-4 hover-scale"
                  onClick={() => {
                    window.location.href = 'tel:+16475617045';
                    closeMobileMenu();
                  }}
                >
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;