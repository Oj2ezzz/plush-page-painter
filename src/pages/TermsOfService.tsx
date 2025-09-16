import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-52 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: January 2025
            </p>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using MMR Hardware's website and services, you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to abide by the above, please do 
                  not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">2. Description of Service</h2>
                <p>
                  MMR Hardware provides architectural hardware solutions including custom manufacturing, design 
                  consultation, and premium hardware products for commercial and residential applications. Our 
                  services include but are not limited to product design, manufacturing, sales, and customer support.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">3. User Accounts and Registration</h2>
                <p className="mb-4">
                  When you create an account with us or provide information for quotes and services:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>You must provide accurate, current, and complete information</li>
                  <li>You are responsible for maintaining the confidentiality of your account information</li>
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">4. Product Orders and Quotes</h2>
                <p className="mb-4">
                  When placing orders or requesting quotes:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>All quotes are valid for 30 days unless otherwise specified</li>
                  <li>Orders are subject to credit approval and product availability</li>
                  <li>We reserve the right to refuse or cancel orders at our discretion</li>
                  <li>Custom orders may require deposits and have different cancellation policies</li>
                  <li>Shipping and delivery terms will be specified in your quote or order confirmation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">5. Payment Terms</h2>
                <p className="mb-4">
                  Payment terms and conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Payment terms will be specified in your quote or order confirmation</li>
                  <li>Late payments may be subject to interest charges</li>
                  <li>We accept various payment methods as specified in your order</li>
                  <li>All prices are subject to change without notice</li>
                  <li>Taxes and shipping charges are additional unless otherwise stated</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">6. Warranties and Returns</h2>
                <p className="mb-4">
                  Product warranties and return policies:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>We warrant our products against defects in materials and workmanship</li>
                  <li>Warranty periods vary by product and will be specified at time of sale</li>
                  <li>Custom products may have different warranty terms</li>
                  <li>Returns must be authorized in advance and may be subject to restocking fees</li>
                  <li>Products must be returned in original condition and packaging</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">7. Intellectual Property</h2>
                <p className="mb-4">
                  All content on this website and our products are protected by intellectual property laws:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>MMR Hardware owns or licenses all website content, designs, and trademarks</li>
                  <li>You may not reproduce, distribute, or create derivative works without permission</li>
                  <li>Custom designs created for clients remain MMR Hardware's intellectual property unless transferred</li>
                  <li>Client confidential information and proprietary designs will be protected</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by applicable law, MMR Hardware shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, or any loss of profits or 
                  revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or 
                  other intangible losses resulting from your use of our services or products.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">9. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless MMR Hardware and its affiliates, officers, 
                  directors, employees, and agents from and against any claims, damages, obligations, losses, 
                  liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) 
                  arising from your use of our services or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">10. Force Majeure</h2>
                <p>
                  MMR Hardware shall not be liable for any failure or delay in performance due to circumstances 
                  beyond our reasonable control, including but not limited to acts of God, natural disasters, 
                  war, terrorism, labor disputes, or government actions.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">11. Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of Ontario, Canada, without regard 
                  to its conflict of law provisions. Any disputes arising from these terms shall be resolved 
                  in the courts of Ontario, Canada.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">12. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. We will notify users of 
                  significant changes by posting the updated terms on our website and updating the "Last updated" 
                  date. Your continued use of our services after such modifications constitutes acceptance of 
                  the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">13. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall 
                  be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise 
                  remain in full force and effect and enforceable.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">14. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-card p-6 rounded-xl border border-luxury-glass-border">
                  <p><strong>MMR Hardware</strong></p>
                  <p>266 Rutherford Rd S, Unit 18</p>
                  <p>Brampton, ON, Canada</p>
                  <p>Phone: <a href="tel:+16475617045" className="text-luxury-gold hover:underline">647-561-7045</a></p>
                  <p>Email: <a href="mailto:Michael@MMRHardware.com" className="text-luxury-gold hover:underline">Michael@MMRHardware.com</a></p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;