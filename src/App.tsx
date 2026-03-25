import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DoorHandles from "./pages/DoorHandles";

import DoorClosers from "./pages/DoorClosers";
import DoorStopsGuides from "./pages/DoorStopsGuides";
import Hinges from "./pages/Hinges";

import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/door-handles" element={<DoorHandles />} />
          <Route path="/sliding-door-systems" element={<SlidingDoorSystems />} />
          <Route path="/door-closers" element={<DoorClosers />} />
          <Route path="/door-stops-guides" element={<DoorStopsGuides />} />
          <Route path="/hinges" element={<Hinges />} />
          <Route path="/aluminum-baseboards" element={<AluminumBaseboards />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
