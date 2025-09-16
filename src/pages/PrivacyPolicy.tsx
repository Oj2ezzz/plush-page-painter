import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-52 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: January 2025
            </p>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Request quotes or contact us through our website</li>
                  <li>Subscribe to our mailing list</li>
                  <li>Communicate with us via phone, email, or other channels</li>
                  <li>Provide feedback or participate in surveys</li>
                </ul>
                <p>
                  This information may include your name, email address, phone number, company information, 
                  project details, and any other information you choose to provide.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and fulfill your requests and orders</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Communicate with you about products, services, and events</li>
                  <li>Monitor and analyze trends and usage patterns</li>
                  <li>Detect, investigate, and prevent fraudulent transactions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">3. Information Sharing and Disclosure</h2>
                <p className="mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except as described below:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our business</li>
                  <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety</li>
                  <li><strong>Consent:</strong> We may share information with your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                  of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee 
                  absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">5. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to provide you with our services 
                  and as required by applicable laws and regulations. When we no longer need your personal information, 
                  we will securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">6. Your Rights and Choices</h2>
                <p className="mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your personal information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Data portability rights</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">7. Cookies and Tracking Technologies</h2>
                <p>
                  We may use cookies and similar tracking technologies to collect information about your browsing 
                  activities. You can control cookie settings through your browser preferences, though this may 
                  affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">8. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy 
                  practices or content of these external sites. We encourage you to review the privacy policies 
                  of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">9. Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If we become aware that we have collected personal 
                  information from a child under 13, we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the "Last updated" date at the top 
                  of this policy.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-foreground mb-4">11. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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

export default PrivacyPolicy;