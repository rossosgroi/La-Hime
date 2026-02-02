import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Legal: React.FC = () => {
    const { section } = useParams();

    const renderContent = () => {
        switch (section) {
            case 'privacy':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h1 className="font-decay text-5xl mb-8 text-rot-black">Privacy Policy</h1>
                        <p className="font-serif italic text-xl text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                        
                        <h2 className="font-bold uppercase tracking-widest text-sm mt-8 mb-4">1. Data Collection</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Sweet Rot collects personal data necessary to process your orders and indulge your decay. This includes your name, shipping address, email address, and payment information. We treat this data with the utmost confidentiality, storing it securely on encrypted servers located within the EU.
                        </p>
                        
                        <h2 className="font-bold uppercase tracking-widest text-sm mt-8 mb-4">2. Cookies & Tracking</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We use cookies to enhance your shopping experience and analyze traffic. By using our site, you consent to the use of cookies. We do not sell your data to third parties. We only share necessary information with our logistics and payment partners to fulfill your orders.
                        </p>

                        <h2 className="font-bold uppercase tracking-widest text-sm mt-8 mb-4">3. Your Rights (GDPR)</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Under GDPR, you have the right to access, rectify, or erase your personal data. If you wish to exercise these rights, please contact us at <a href="mailto:privacy@sweetrot.com" className="underline hover:text-sweet-pink">privacy@sweetrot.com</a>.
                        </p>
                    </div>
                );
            case 'terms':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h1 className="font-decay text-5xl mb-8 text-rot-black">Terms of Service</h1>
                        
                        <h2 className="font-bold uppercase tracking-widest text-sm mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            By accessing Sweet Rot, you agree to be bound by these terms. If you do not agree, do not use our services. We reserve the right to refuse service to anyone for any reason at any time.
                        </p>

                        <h2 className="font-bold uppercase tracking-widest text-sm mt-8 mb-4">2. Products & Aesthetics</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our products feature intentional distress, fading, and "rot" aesthetics. These are design features, not defects. Color accuracy on screens may vary. We do not guarantee that the quality of any products will meet your subjective expectations of "sweet" or "rot."
                        </p>

                        <h2 className="font-bold uppercase tracking-widest text-sm mt-8 mb-4">3. Intellectual Property</h2>
                        <p className="text-gray-700 leading-relaxed">
                            All content on this site, including text, graphics, logos, and images, is the property of Sweet Rot. Unauthorized use, reproduction, or distribution is strictly prohibited.
                        </p>
                    </div>
                );
            case 'returns':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h1 className="font-decay text-5xl mb-8 text-rot-black">Returns & Shipping</h1>
                        
                        <h2 className="font-bold uppercase tracking-widest text-sm mt-8 mb-4">Shipping Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We ship worldwide from our warehouse in Berlin.
                            <br/><br/>
                            <strong>EU Shipping:</strong> 3-5 Business Days (€10)<br/>
                            <strong>International Shipping:</strong> 7-14 Business Days (€25)
                            <br/><br/>
                            Orders over €150 qualify for free standard shipping. Tracking information will be provided via email once your order has decayed (shipped).
                        </p>

                        <h2 className="font-bold uppercase tracking-widest text-sm mt-8 mb-4">Return Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We have a 14-day return policy, which means you have 14 days after receiving your item to request a return.
                            <br/><br/>
                            To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
                            <br/><br/>
                            To start a return, you can contact us at <a href="mailto:returns@sweetrot.com" className="underline hover:text-sweet-pink">returns@sweetrot.com</a>. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package.
                        </p>
                    </div>
                );
            case 'imprint':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h1 className="font-decay text-5xl mb-8 text-rot-black">Imprint</h1>
                        
                        <p className="text-gray-700 leading-relaxed font-serif italic text-xl">
                            Information according to § 5 TMG
                        </p>
                        
                        <div className="mt-8">
                            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Company</h3>
                            <p className="text-gray-700">
                                Sweet Rot GmbH<br/>
                                Alte Schönhauser Str. 44<br/>
                                10119 Berlin<br/>
                                Germany
                            </p>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Represented by</h3>
                            <p className="text-gray-700">
                                Jane Doe (CEO)<br/>
                                Sakura Tanaka (Creative Director)
                            </p>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Contact</h3>
                            <p className="text-gray-700">
                                Phone: +49 (0) 30 12345678<br/>
                                Email: contact@sweetrot.com
                            </p>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">Register Entry</h3>
                            <p className="text-gray-700">
                                Entry in Handelsregister.<br/>
                                Register Court: Amtsgericht Charlottenburg<br/>
                                Register Number: HRB 123456
                            </p>
                        </div>
                        
                        <div className="mt-8">
                            <h3 className="font-bold uppercase tracking-widest text-sm mb-2">VAT ID</h3>
                            <p className="text-gray-700">
                                Sales tax identification number according to §27 a Umsatzsteuergesetz:<br/>
                                DE 123 456 789
                            </p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="text-center py-20">
                        <h1 className="font-decay text-4xl mb-4">404 - Page Not Found</h1>
                        <p className="text-gray-500 mb-8">This page has fully rotted away.</p>
                        <Link to="/" className="underline font-bold text-rot-black hover:text-sweet-pink">Return Home</Link>
                    </div>
                );
        }
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-sweet-cream">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar for Legal Nav */}
                    <aside className="w-full md:w-64 shrink-0">
                        <nav className="space-y-1 sticky top-32">
                            <Link to="/legal/privacy" className={`block px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-sweet-pink transition-colors ${section === 'privacy' ? 'text-rot-red border-l-2 border-rot-red' : 'text-gray-400 border-l-2 border-transparent'}`}>Privacy Policy</Link>
                            <Link to="/legal/terms" className={`block px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-sweet-pink transition-colors ${section === 'terms' ? 'text-rot-red border-l-2 border-rot-red' : 'text-gray-400 border-l-2 border-transparent'}`}>Terms of Service</Link>
                            <Link to="/legal/returns" className={`block px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-sweet-pink transition-colors ${section === 'returns' ? 'text-rot-red border-l-2 border-rot-red' : 'text-gray-400 border-l-2 border-transparent'}`}>Returns & Shipping</Link>
                            <Link to="/legal/imprint" className={`block px-4 py-2 text-sm font-bold uppercase tracking-widest hover:text-sweet-pink transition-colors ${section === 'imprint' ? 'text-rot-red border-l-2 border-rot-red' : 'text-gray-400 border-l-2 border-transparent'}`}>Imprint</Link>
                        </nav>
                    </aside>

                    {/* Content */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Legal;