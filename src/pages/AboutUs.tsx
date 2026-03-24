import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, Users, Award, Clock } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { icon: Clock, number: "25+", label: "Years of Experience" },
    { icon: Building, number: "1000+", label: "Projects Completed" },
    { icon: Users, number: "500+", label: "Satisfied Clients" },
    { icon: Award, number: "100%", label: "Quality Guarantee" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-52 pb-24 bg-secondary overflow-hidden">
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
              <span className="inline-block">About</span>
              <br />
              <span className="text-foreground inline-block">MMR Hardware</span>
            </h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group bg-background rounded-xl p-8 border border-border hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-foreground mb-3">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button variant="luxury" size="xl" className="group" onClick={() => window.location.href = 'tel:+16475617045'}>
              <span className="relative z-10">Request a Quote</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-5xl mx-auto">

            {/* Our Story */}
            <div className="mb-20">
              <div className="relative bg-background rounded-2xl p-12 border border-border shadow-sm">
                <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 text-foreground">Our Story</h2>
                <div className="space-y-8">
                  <p className="text-xl leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto">
                    At MMR Hardware, we believe great hardware should do more than function — it should define the space around it. With over 25 years immersed in the architectural and glazing industry, we understand the standards, the expectations, and the culture that drives it. Our products are crafted to deliver lasting durability, reliable performance, and refined design, ensuring every piece not only works flawlessly but elevates the environments it's built for.
                  </p>
                  <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                  <p className="text-xl leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto">
                    We work with contractors, architects, designers, and builders across the globe to supply high-quality architectural hardware for both commercial and residential projects. Our products are trusted in offices, retail spaces, luxury homes, and multi-unit developments, and we're proud to be part of the spaces people use every single day.
                  </p>
                </div>
              </div>
            </div>

            {/* What Makes Us Different */}
            <div className="mb-20">
              <div className="relative bg-background rounded-2xl p-12 border border-border shadow-sm hover:shadow-lg transition-all duration-300">
                <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 text-foreground">What Makes Us Different</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      What makes us different is how involved we are from start to finish. We're not just selling parts. We're helping shape the look and feel of a space. Whether you need a quick off-the-shelf solution or a fully customized hardware system, we approach every project with the same level of care.
                    </p>
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      Our in-house team supports everything from early design consultation and 3D modeling to full-scale manufacturing and quality control. We work with premium materials like stainless steel, solid brass, and aluminum to ensure our products perform in the real world, not just on paper.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-64 h-64 bg-primary rounded-full flex items-center justify-center">
                      <Award className="w-32 h-32 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Commitment */}
            <div className="mb-20">
              <div className="relative bg-background rounded-2xl p-12 border border-border shadow-sm">
                <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 text-foreground">Our Commitment</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="flex justify-center order-2 md:order-1">
                    <div className="w-64 h-64 bg-primary rounded-full flex items-center justify-center">
                      <Building className="w-32 h-32 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="space-y-6 order-1 md:order-2">
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      Each piece is made to meet strict performance standards while maintaining a clean and modern aesthetic. We understand how important timing is in construction, so we've built strong relationships with local production partners to keep our lead times fast and dependable.
                    </p>
                    <p className="text-xl leading-relaxed text-muted-foreground">
                      At the end of the day, we're here to make your job easier. We're a small team that believes in clear communication, honest timelines, and standing behind what we build. If you're looking for hardware that's thoughtfully designed, expertly made, and supported by people who care about your project, you're in the right place.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-primary rounded-2xl p-12">
              <h3 className="text-3xl font-bold text-primary-foreground mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Let's work together to create something exceptional
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="px-8 py-4 text-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90" onClick={() => window.location.href = 'tel:+16475617045'}>
                  Request a Quote
                </Button>
                <Button asChild variant="secondary" size="lg" className="px-8 py-4 text-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Link to="/products">Explore Our Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
