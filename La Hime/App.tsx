import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { InfoPage } from './pages/InfoPage';
import { Account } from './pages/Account';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Login } from './pages/Login';
import { Checkout } from './pages/Checkout';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Account Routes */}
            <Route path="/account/:section" element={<Account />} />
            
            {/* Info Pages */}
            <Route path="/shipping" element={<InfoPage title="Shipping Policy" type="shipping" />} />
            <Route path="/returns" element={<InfoPage title="Returns & Exchanges" type="returns" />} />
            <Route path="/faq" element={<InfoPage title="Frequently Asked Questions" type="faq" />} />
            <Route path="/size-guide" element={<InfoPage title="Size Guide" type="size-guide" />} />
            <Route path="/privacy" element={<InfoPage title="Privacy Policy" type="privacy" />} />
            <Route path="/terms" element={<InfoPage title="Terms of Service" type="terms" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;