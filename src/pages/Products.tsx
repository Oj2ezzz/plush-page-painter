import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureProducts from "@/components/FeatureProducts";
import { useEffect } from "react";

const Products = () => {
  useEffect(() => {
    document.title = "Our Products | MMR Hardware";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Browse our premium door hardware products including handles and accessories.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-52 pb-24">
        <section className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 text-center">Our Products</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center mb-12">
            Explore our complete catalog of professional-grade architectural hardware.
          </p>
        </section>

        {/* Reuse the same grid from the homepage */}
        <FeatureProducts showTitle={false} />
      </main>

      <Footer />
    </div>
  );
};

export default Products;
