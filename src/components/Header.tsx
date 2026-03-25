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
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-500 ease-out ${isScrolled ? 'py-0' : ''}`}>
        {/* Trust Badge */}
        <div className={`bg-primary transition-all duration-500 ease-out ${isScrolled ? 'py-0.5 opacity-90' : 'py-2 opacity-100'}`}>
          <div className="container mx-auto px-6">
            <p className={`text-center font-medium text-primary-foreground transition-all duration-500 ease-out ${isScrolled ? 'text-xs' : 'text-sm'}`}>
              ✨ Backed by 25+ years of experience
            </p>
          </div>
        </div>

        <div className={`container mx-auto px-6 transition-all duration-500 ease-out ${isScrolled ? 'py-1.5' : 'py-3'}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" onClick={closeMobileMenu} className="transition-transform duration-300 hover:scale-105">
                <div className={`transition-all duration-500 ease-out ${isScrolled ? 'h-12' : 'h-16'}`}>
                   <img src={mmrLogo} alt="MMR Hardware Logo" className="h-full w-auto object-contain" />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-all duration-200 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                Home
              </Link>
              <Link to="/about-us" className="text-muted-foreground hover:text-foreground transition-all duration-200 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                About Us
              </Link>
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-all duration-200 font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                Products
              </Link>
            </nav>

            {/* Desktop CTA Button */}
            <Button
              variant="luxury"
              size="sm"
              className="hidden md:flex"
              onClick={() => window.location.href = 'tel:+16475617045'}
            >
              Request a Quote
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={closeMobileMenu}
        >
          <div
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-lg animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={closeMobileMenu}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex flex-col h-full pt-20 px-6">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="h-16">
                   <img src={mmrLogo} alt="MMR Hardware Logo" className="h-full w-auto object-contain" />
                 </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-2 flex-1">
                <Link to="/" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-muted-foreground transition-all duration-200 py-4 px-4 rounded-xl hover:bg-accent border-b border-border">
                  Home
                </Link>
                <Link to="/about-us" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-muted-foreground transition-all duration-200 py-4 px-4 rounded-xl hover:bg-accent border-b border-border">
                  About Us
                </Link>
                <Link to="/products" onClick={closeMobileMenu} className="text-lg font-medium text-foreground hover:text-muted-foreground transition-all duration-200 py-4 px-4 rounded-xl hover:bg-accent border-b border-border">
                  Products
                </Link>
              </nav>

              {/* Contact Info */}
              <div className="space-y-4 py-6 border-t border-border bg-accent/50 rounded-xl mx-2 mb-4">
                <div className="text-center space-y-2 px-4">
                  <p className="text-sm text-muted-foreground">Get in touch</p>
                  <a href="tel:+16475617045" className="block text-lg font-semibold text-foreground hover:text-muted-foreground transition-colors">
                    647-561-7045
                  </a>
                  <a href="mailto:Michael@MMRHardware.com" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Michael@MMRHardware.com
                  </a>
                </div>
              </div>

              {/* Request Quote Button */}
              <div className="pb-8 px-2">
                <Button
                  variant="luxury"
                  size="lg"
                  className="w-full text-lg py-4"
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
