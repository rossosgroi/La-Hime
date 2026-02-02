import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Lookbook from './pages/Lookbook';
import Profile from './pages/Profile';
import About from './pages/About';
import Legal from './pages/Legal';
import { StoreProvider } from './context/StoreContext';
import Sidebar from './components/Sidebar';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProfileDrawer from './components/ProfileDrawer';

function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <Sidebar />
        <CartDrawer />
        <WishlistDrawer />
        <ProfileDrawer />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/legal/:section" element={<Legal />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;