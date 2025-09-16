import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Advantages from "@/components/Advantages";
import Benefits from "@/components/Benefits";
import ProductDevelopment from "@/components/ProductDevelopment";
import FeatureProducts from "@/components/FeatureProducts";
import CustomerBenefits from "@/components/CustomerBenefits";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <div className="animate-fade-in">
        <Hero />
      </div>
      <div className="animate-fade-in [animation-delay:0.2s]">
        <Advantages />
      </div>
      <div className="animate-fade-in [animation-delay:0.4s]">
        <Benefits />
      </div>
      <div className="animate-fade-in [animation-delay:0.6s]">
        <ProductDevelopment />
      </div>
      <div className="animate-fade-in [animation-delay:0.8s]">
        <FeatureProducts />
      </div>
      <div className="animate-fade-in [animation-delay:1s]">
        <CustomerBenefits />
      </div>
      <div className="animate-fade-in [animation-delay:1.2s]">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
