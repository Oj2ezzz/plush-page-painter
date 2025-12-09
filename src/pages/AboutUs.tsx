import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, Users, Award, Clock } from "lucide-react";
const AboutUs = () => {
  const stats = [{
    icon: Clock,
    number: "25+",
    label: "Years of Experience"
  }, {
    icon: Building,
    number: "1000+",
    label: "Projects Completed"
  }, {
    icon: Users,
    number: "500+",
    label: "Satisfied Clients"
  }, {
    icon: Award,
    number: "100%",
    label: "Quality Guarantee"
  }];
  return <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      
      {/* Hero Section with Luxury Background */}
      <section className="relative pt-52 pb-24 bg-gradient-subtle overflow-hidden">
        {/* Luxury Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-luxury-gold/8 rounded-full blur-2xl animate-[pulse_6s_ease-in-out_infinite]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight animate-fade-in">
              <span className="inline-block animate-[slide-in-right_1s_ease-out]">About</span>
              <br />
              <span className="bg-gradient-luxury bg-clip-text text-transparent inline-block animate-[slide-in-right_1s_ease-out_0.3s_both] hover-scale">
                MMR Hardware
              </span>
            </h1>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12">
            {stats.map((stat, index) => <div key={index} className="text-center group bg-glass backdrop-blur-md rounded-2xl p-8 border border-luxury-glass-border hover-scale animate-[fade-in_1s_ease-out_0.9s_both] hover:shadow-luxury-shadow transition-all duration-500">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <stat.icon className="w-8 h-8 text-background" />
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-luxury bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>)}
          </div>

          {/* Luxury CTA Button */}
          <div className="text-center animate-[scale-in_1s_ease-out_1.2s_both]">
            <Button variant="glass" size="xl" className="group hover-scale shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-500" onClick={() => window.location.href = 'tel:+16475617045'}>
              <span className="relative z-10">Request a Quote</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Luxury Main Content */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Subtle background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-luxury-gold/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Our Story - Premium Design */}
            <div className="mb-20 animate-[fade-in_1s_ease-out] relative">
              <div className="absolute inset-0 bg-gradient-luxury opacity-5 rounded-3xl blur-xl"></div>
              <div className="relative bg-glass backdrop-blur-md rounded-3xl p-12 border border-luxury-glass-border">
                <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
                  <span className="bg-gradient-luxury bg-clip-text text-transparent">Our Story</span>
                </h2>
                <div className="space-y-8">
                  <p className="text-xl leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto">At MMR Hardware, we believe great hardware should do more than function — it should define the space around it. With over 25 years immersed in the architectural and glazing industry, we understand the standards, the expectations, and the culture that drives it. Our products are crafted to deliver lasting durability, reliable performance, and refined design, ensuring every piece not only works flawlessly but elevates the environments it’s built for.</p>
                  
                  <div className="w-24 h-1 bg-gradient-luxury mx-auto rounded-full"></div>
                  
                  <p className="text-xl leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto">
                    We work with contractors, architects, designers, and builders across the globe to supply 
                    high-quality architectural hardware for both commercial and residential projects. Our 
                    products are trusted in offices, retail spaces, luxury homes, and multi-unit developments, 
                    and we're proud to be part of the spaces people use every single day.
                  </p>
                </div>
              </div>
            </div>

            {/* What Makes Us Different - Enhanced */}
            <div className="mb-20 animate-[fade-in_1s_ease-out_0.3s_both] relative">
              <div className="absolute inset-0 bg-gradient-luxury opacity-5 rounded-3xl blur-xl transform rotate-1"></div>
              <div className="relative bg-glass backdrop-blur-md rounded-3xl p-12 border border-luxury-glass-border hover-scale transition-all duration-500 hover:shadow-luxury-shadow">
                <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
                  <span className="bg-gradient-luxury bg-clip-text text-transparent">What Makes Us Different</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      What makes us different is how involved we are from start to finish. We're not just 
                      selling parts. We're helping shape the look and feel of a space. Whether you need a 
                      quick off-the-shelf solution or a fully customized hardware system, we approach every 
                      project with the same level of care.
                    </p>
                    
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      Our in-house team supports everything from early design consultation and 3D modeling 
                      to full-scale manufacturing and quality control. We work with premium materials like 
                      stainless steel, solid brass, and aluminum to ensure our products perform in the real 
                      world, not just on paper.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-64 h-64 bg-gradient-luxury rounded-full flex items-center justify-center">
                      <Award className="w-32 h-32 text-background" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Commitment - Luxury Card */}
            <div className="mb-20 animate-[fade-in_1s_ease-out_0.6s_both] relative">
              <div className="absolute inset-0 bg-gradient-luxury opacity-5 rounded-3xl blur-xl transform -rotate-1"></div>
              <div className="relative bg-glass backdrop-blur-md rounded-3xl p-12 border border-luxury-glass-border">
                <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
                  <span className="bg-gradient-luxury bg-clip-text text-transparent">Our Commitment</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="flex justify-center order-2 md:order-1">
                    <div className="w-64 h-64 bg-gradient-luxury rounded-full flex items-center justify-center">
                      <Building className="w-32 h-32 text-background" />
                    </div>
                  </div>
                  <div className="space-y-6 order-1 md:order-2">
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      Each piece is made to meet strict performance standards while maintaining a clean and 
                      modern aesthetic. We understand how important timing is in construction, so we've built 
                      strong relationships with local production partners to keep our lead times fast and 
                      dependable.
                    </p>
                    
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      At the end of the day, we're here to make your job easier. We're a small team that 
                      believes in clear communication, honest timelines, and standing behind what we build. 
                      If you're looking for hardware that's thoughtfully designed, expertly made, and 
                      supported by people who care about your project, you're in the right place.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-luxury rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-background mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-xl text-background/90 mb-8">
                Let's work together to create something exceptional
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="px-8 py-4 text-lg bg-background text-foreground hover:bg-background/90" onClick={() => window.location.href = 'tel:+16475617045'}>
                  Request a Quote
                </Button>
                <Button asChild variant="secondary" size="lg" className="px-8 py-4 text-lg bg-background text-foreground hover:bg-background/90">
                  <Link to="/products">Explore Our Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AboutUs;