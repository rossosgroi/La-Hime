import React from 'react';
import { Link } from 'react-router-dom';

interface InfoPageProps {
  title: string;
  type: 'shipping' | 'returns' | 'faq' | 'size-guide' | 'privacy' | 'terms';
}

export const InfoPage: React.FC<InfoPageProps> = ({ title, type }) => {
  const renderContent = () => {
    switch (type) {
      case 'shipping':
        return (
          <div className="space-y-8 text-gray-700">
            <section>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Global Delivery</h3>
              <p className="leading-relaxed">
                La Hime is proud to ship to our princesses worldwide. All orders are processed within 1-2 business days from our Rome studio.
                Once dispatched, you will receive a tracking link to follow your package's journey via DHL or FedEx.
              </p>
            </section>
            
            <section>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Shipping Rates & Times</h3>
              <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Region</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Europe</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Standard</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">3-5 Days</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">€10 (Free over €150)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">USA & Canada</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Express</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2-4 Days</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$25</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rest of World</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Express</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">3-7 Days</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$35</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        );
      case 'returns':
        return (
          <div className="space-y-10 text-gray-700">
            <section>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Return Policy</h3>
              <p className="leading-relaxed mb-4">
                We want you to be completely obsessed with your purchase. If you're not 100% satisfied, you can return your items within <strong>30 days</strong> of the delivery date.
              </p>
              <div className="bg-pink-50 p-6 rounded-lg border border-pink-100">
                <h4 className="font-bold text-pink-900 mb-2 text-sm uppercase tracking-wide">Conditions</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-pink-800">
                    <li>Items must be unworn, unwashed, and stain-free (makeup, self-tanner, etc.).</li>
                    <li>All original tags and hygiene seals must be attached.</li>
                    <li>Sale items marked "Final Sale" cannot be returned.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-xl text-gray-900 mb-6">How to Return</h3>
              <div className="grid md:grid-cols-3 gap-6">
                 <div className="p-6 border border-gray-200 rounded-xl hover:border-black transition-colors">
                    <span className="block text-4xl font-serif-display text-gray-300 mb-4">01</span>
                    <h4 className="font-bold text-gray-900 mb-2">Request</h4>
                    <p className="text-sm text-gray-500">Visit our Returns Portal and enter your order number to generate a prepaid label.</p>
                 </div>
                 <div className="p-6 border border-gray-200 rounded-xl hover:border-black transition-colors">
                    <span className="block text-4xl font-serif-display text-gray-300 mb-4">02</span>
                    <h4 className="font-bold text-gray-900 mb-2">Pack</h4>
                    <p className="text-sm text-gray-500">Pack items securely in the original box. Attach the shipping label to the outside.</p>
                 </div>
                 <div className="p-6 border border-gray-200 rounded-xl hover:border-black transition-colors">
                    <span className="block text-4xl font-serif-display text-gray-300 mb-4">03</span>
                    <h4 className="font-bold text-gray-900 mb-2">Refund</h4>
                    <p className="text-sm text-gray-500">Once inspected, your refund will be processed within 5-7 business days.</p>
                 </div>
              </div>
            </section>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-12 text-gray-700">
            <section>
              <h3 className="font-serif-display text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">Orders & Shipping</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Can I change or cancel my order?</h4>
                  <p className="text-gray-600">We work fast! Once an order is placed, we have a very short window (about 1 hour) to make changes. Please email <span className="font-medium text-black">contact@lahime.com</span> immediately with your request.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Where is my order confirmation?</h4>
                  <p className="text-gray-600">Check your spam folder! If you still can't find it, ensure you entered the correct email address at checkout or contact support.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Do you ship internationally?</h4>
                  <p className="text-gray-600">Yes, we ship globally! Please note that for orders outside the EU, custom duties and taxes may apply upon arrival and are the responsibility of the recipient.</p>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="font-serif-display text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">Product & Care</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">How do I wash my La Hime items?</h4>
                  <p className="text-gray-600">Most of our items feature delicate details like lace, satin, and rhinestones. We highly recommend <span className="font-bold">hand washing in cold water</span> or dry cleaning. Do not tumble dry.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Are the size charts accurate?</h4>
                  <p className="text-gray-600">Yes, our sizing is based on standard European measurements. We have updated our size guide to CM to help you find the perfect fit. If you're between sizes, we generally suggest sizing up.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Do you offer gift wrapping?</h4>
                  <p className="text-gray-600">All La Hime orders arrive in our signature pink packaging, making them perfect for gifting. You can add a personalized note at checkout.</p>
                </div>
              </div>
            </section>

             <section>
              <h3 className="font-serif-display text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">Payments</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">What payment methods do you accept?</h4>
                  <p className="text-gray-600">We accept major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay.</p>
                </div>
              </div>
            </section>
          </div>
        );
      case 'size-guide':
        return (
          <div className="space-y-12">
            <div className="bg-gray-50 p-6 rounded-lg text-gray-700 mb-8 border border-gray-200">
                <p>
                Use the charts below to determine your size. If you are between sizes, we recommend <strong>sizing up</strong> for a more comfortable fit, especially for non-stretch items. 
                Measurements are in <strong>centimeters (cm)</strong>.
                </p>
            </div>

            {/* TOPS TABLE */}
            <section>
              <h3 className="font-bold text-xl text-gray-900 mb-4 uppercase tracking-wider">Tops & Dresses</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 border-b border-gray-200 font-bold text-gray-900">Size (EU)</th>
                      <th className="p-4 border-b border-gray-200 font-bold text-gray-900">Bust (cm)</th>
                      <th className="p-4 border-b border-gray-200 font-bold text-gray-900">Waist (cm)</th>
                      <th className="p-4 border-b border-gray-200 font-bold text-gray-900">Hips (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr className="hover:bg-pink-50 transition-colors"><td className="p-4 text-gray-900 font-bold">XS (34)</td><td className="p-4 text-gray-700">76 - 81</td><td className="p-4 text-gray-700">60 - 63</td><td className="p-4 text-gray-700">84 - 87</td></tr>
                    <tr className="hover:bg-pink-50 transition-colors"><td className="p-4 text-gray-900 font-bold">S (36)</td><td className="p-4 text-gray-700">82 - 86</td><td className="p-4 text-gray-700">64 - 68</td><td className="p-4 text-gray-700">88 - 92</td></tr>
                    <tr className="hover:bg-pink-50 transition-colors"><td className="p-4 text-gray-900 font-bold">M (38)</td><td className="p-4 text-gray-700">87 - 91</td><td className="p-4 text-gray-700">69 - 73</td><td className="p-4 text-gray-700">93 - 97</td></tr>
                    <tr className="hover:bg-pink-50 transition-colors"><td className="p-4 text-gray-900 font-bold">L (40)</td><td className="p-4 text-gray-700">92 - 96</td><td className="p-4 text-gray-700">74 - 78</td><td className="p-4 text-gray-700">98 - 102</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* BOTTOMS TABLE */}
            <section>
              <h3 className="font-bold text-xl text-gray-900 mb-4 uppercase tracking-wider">Bottoms & Skirts</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 border-b border-gray-200 font-bold text-gray-900">Size (EU)</th>
                      <th className="p-4 border-b border-gray-200 font-bold text-gray-900">Waist (cm)</th>
                      <th className="p-4 border-b border-gray-200 font-bold text-gray-900">Hips (cm)</th>
                      <th className="p-4 border-b border-gray-200 font-bold text-gray-900">Inseam (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr className="hover:bg-pink-50 transition-colors"><td className="p-4 text-gray-900 font-bold">XS (34)</td><td className="p-4 text-gray-700">60 - 63</td><td className="p-4 text-gray-700">84 - 87</td><td className="p-4 text-gray-700">76</td></tr>
                    <tr className="hover:bg-pink-50 transition-colors"><td className="p-4 text-gray-900 font-bold">S (36)</td><td className="p-4 text-gray-700">64 - 68</td><td className="p-4 text-gray-700">88 - 92</td><td className="p-4 text-gray-700">77</td></tr>
                    <tr className="hover:bg-pink-50 transition-colors"><td className="p-4 text-gray-900 font-bold">M (38)</td><td className="p-4 text-gray-700">69 - 73</td><td className="p-4 text-gray-700">93 - 97</td><td className="p-4 text-gray-700">79</td></tr>
                    <tr className="hover:bg-pink-50 transition-colors"><td className="p-4 text-gray-900 font-bold">L (40)</td><td className="p-4 text-gray-700">74 - 78</td><td className="p-4 text-gray-700">98 - 102</td><td className="p-4 text-gray-700">80</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto">
            <p className="italic text-gray-500 border-b pb-4">Last Updated: January 1, 2026</p>
            
            <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">1. Introduction</h3>
              <p className="mb-4">La Hime ("we", "our", or "us") respects the privacy of our users ("user" or "you"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").</p>
              <p>Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">2. Collection of Data</h3>
              <p className="mb-4">We collect personal data you voluntarily provide to us when you register on the Site, express an interest in obtaining information about us or our products and services, when you participate in activities on the Site (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us.</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                 <li><strong className="text-gray-900">Personal Data:</strong> Name, shipping address, email address, phone number, and demographic information.</li>
                 <li><strong className="text-gray-900">Derivative Data:</strong> IP address, browser type, operating system, access times, and page history.</li>
                 <li><strong className="text-gray-900">Financial Data:</strong> Data related to your payment method (e.g., valid credit card number, card brand, expiration date) is stored by our payment processor (Stripe), not by us.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">3. Use of Your Information</h3>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-2">
                 <li>Create and manage your account.</li>
                 <li>Process transactions and send related information, including transaction confirmations and invoices.</li>
                 <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
                 <li>Respond to your comments, questions, and requests.</li>
                 <li>Request feedback and contact you about your use of the Site.</li>
                 <li>Resolve disputes and troubleshoot problems.</li>
              </ul>
            </section>

             <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">4. Disclosure of Your Information</h3>
              <p className="mb-4">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
               <ul className="list-disc pl-5 space-y-2">
                 <li><strong className="text-gray-900">By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                 <li><strong className="text-gray-900">Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
               </ul>
            </section>
            
            <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">5. Cookie Policy</h3>
              <p>We use cookies to help customize the Site and improve your experience. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.</p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">6. Security of Your Information</h3>
              <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
            </section>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-8 text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto">
             <p className="italic text-gray-500 border-b pb-4">Last Updated: January 1, 2026</p>
            
            <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">1. Agreement to Terms</h3>
              <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and La Hime ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").</p>
            </section>

             <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">2. Intellectual Property Rights</h3>
              <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
            </section>

             <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">3. User Representations</h3>
              <p>By using the Site, you represent and warrant that:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
                <li>You are not a minor in the jurisdiction in which you reside.</li>
                <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">4. Products & Availability</h3>
              <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.</p>
              <p className="mt-2">All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason.</p>
            </section>

             <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">5. Purchases and Payment</h3>
              <p>We accept the following forms of payment: Visa, Mastercard, American Express, PayPal, Apple Pay. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.</p>
              <p className="mt-2">Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time.</p>
            </section>

            <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">6. Governing Law</h3>
              <p>These Terms shall be governed by and defined following the laws of Italy. La Hime and yourself irrevocably consent that the courts of Italy shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
            </section>
             <section>
              <h3 className="font-bold text-gray-900 text-xl mb-4">7. Contact Us</h3>
              <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
              <p className="mt-2 font-bold">La Hime Studios</p>
              <p>Via Condotti 15</p>
              <p>00187 Rome, Italy</p>
              <p>contact@lahime.com</p>
            </section>
          </div>
        );
      default:
        return <p>Content coming soon.</p>;
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif-display text-4xl lg:text-5xl mb-12 text-center text-gray-900 border-b border-gray-100 pb-8">{title}</h1>
        <div className="prose prose-pink max-w-none">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};