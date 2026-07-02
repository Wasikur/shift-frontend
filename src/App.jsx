import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import OrderSuccess from './pages/OrderSuccess';
import Bikes from './pages/Bikes';
import Apparel from './pages/Apparel';
import Accessories from './pages/Accessories';
import Spares from './pages/Spares';
import Blog from './pages/Blog';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import ServiceBooking from './pages/ServiceBooking';
import AuthModal from './components/auth/AuthModal';
import Profile from './pages/Profile';
import BlogDetail from './pages/BlogDetail';
import Terms from './pages/Terms';
import Shipping from './pages/Shipping';

// Restores scroll position on page reload and route change
const ScrollRestoration = () => {
  const { pathname, search } = useLocation();
  const cacheKey = `scroll_${pathname}${search}`;

  useEffect(() => {
    let isMounted = true;
    const saved = sessionStorage.getItem(cacheKey);
    const targetY = saved ? parseInt(saved, 10) : 0;

    // A list of delays to attempt restoration, allowing images/layouts to load first
    const restoreDelays = [0, 50, 150, 300, 600, 1000];
    const timers = [];

    if (targetY > 0) {
      restoreDelays.forEach(delay => {
        const timer = setTimeout(() => {
          if (isMounted) {
            window.scrollTo(0, targetY);
          }
        }, delay);
        timers.push(timer);
      });
    }

    // Do not capture scrolling for the first 500ms of mounting a route to prevent overwriting with 0
    let canRecord = false;
    const recordingTimer = setTimeout(() => {
      canRecord = true;
    }, 500);

    let scrollTimeout;
    const handleScroll = () => {
      if (!canRecord) return;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (isMounted) {
          sessionStorage.setItem(cacheKey, window.scrollY.toString());
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(recordingTimer);
      timers.forEach(clearTimeout);
    };
  }, [pathname, search, cacheKey]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollRestoration />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AuthModal />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/bikes" element={<Bikes />} />
            <Route path="/apparel" element={<Apparel />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/spares" element={<Spares />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout/success" element={<OrderSuccess />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route path="/shipping-policy" element={<Shipping />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-service" element={<ServiceBooking />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
