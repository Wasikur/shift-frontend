import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, Package, Calendar, Settings, ChevronDown } from 'lucide-react';
import logo from '../../assets/yellow-black.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    
    const updateCartCount = () => {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        const items = JSON.parse(storedItems);
        const count = items.reduce((acc, item) => acc + item.qty, 0);
        setCartCount(count);
      } else {
        setCartCount(2); // Match starting cart items count
      }
    };

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    updateCartCount();
    checkUser();

    window.addEventListener('storage', updateCartCount);
    window.addEventListener('storage', checkUser);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // Close profile dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Bikes',       path: '/bikes' },
    { name: 'Apparel',     path: '/apparel' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Spares',      path: '/spares' },
    { name: 'Blog',        path: '/blog' },
    { name: 'About Us',    path: '/about-us' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      {/* Logo */}
      <Link to="/" className="navbar-logo-link">
        <div className="logo-container">
          <img
            src={logo}
            alt="Shift Logo"
            className="logo-img"
          />
        </div>
        <div className="logo-text-container">
          <span className="logo-title">Shift</span>
        </div>
      </Link>

      {/* Desktop Nav Links */}
      <div className="navbar-links">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="navbar-link"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div className="navbar-actions">
        <div className="nav-search-wrapper">
          <Search size={16} className="nav-search-icon" />
          <input type="text" placeholder="SEARCH..." className="nav-search-input" />
        </div>
        <Link to="/cart" className="nav-action-link cart-link">
          <ShoppingCart size={22} />
          <span className="cart-badge">{cartCount}</span>
        </Link>

        {user ? (
          <div className="nav-user-actions" ref={profileRef} style={{ position: 'relative' }}>
            <button
              className="nav-profile-btn"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-label="Profile menu"
            >
              <div className="nav-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
              </div>
              <ChevronDown size={13} className={`nav-profile-chevron ${isProfileOpen ? 'open' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="profile-dropdown">
                {/* Header */}
                <div className="profile-dropdown-header">
                  <div className="profile-dropdown-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
                  </div>
                  <div className="profile-dropdown-info">
                    <span className="profile-dropdown-name">{user.name || 'User'}</span>
                    <span className="profile-dropdown-email">{user.email || ''}</span>
                  </div>
                </div>

                <div className="profile-dropdown-divider" />

                {/* Links */}
                <div className="profile-dropdown-links">
                  <Link to="/orders" className="profile-dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <Package size={15} />
                    My Orders
                  </Link>
                  <Link to="/profile" className="profile-dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    <Settings size={15} />
                    My Profile
                  </Link>
                </div>

                <div className="profile-dropdown-divider" />

                {/* Logout */}
                <button
                  className="profile-dropdown-logout"
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.dispatchEvent(new Event('storage'));
                    setIsProfileOpen(false);
                  }}
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => window.dispatchEvent(new Event('openAuthModal'))} className="btn-login">
            Login
          </button>
        )}

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-header">
            <div className="mobile-menu-logo">
              <img src={logo} alt="Shift" className="mobile-logo-img" />
              <span className="mobile-logo-text">Shift</span>
            </div>
            <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={28} />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="mobile-search-container" style={{ margin: '24px 0' }}>
            <div className="nav-search-wrapper" style={{ display: 'flex', position: 'relative', width: '100%' }}>
              <Search size={18} className="nav-search-icon" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input 
                type="text" 
                placeholder="SEARCH..." 
                className="nav-search-input" 
                style={{ width: '100%', padding: '14px 16px 14px 48px', fontSize: '12px', borderRadius: '30px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', outline: 'none' }} 
              />
            </div>
          </div>

          <div className="mobile-menu-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-menu-link"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Auth Links */}
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="mobile-menu-link">Profile</Link>
                <button onClick={() => { localStorage.removeItem('user'); window.dispatchEvent(new Event('storage')); setIsMobileMenuOpen(false); }} className="mobile-menu-link" style={{ textAlign: 'left', cursor: 'pointer' }}>Logout</button>
              </>
            ) : (
              <button onClick={() => { setIsMobileMenuOpen(false); window.dispatchEvent(new Event('openAuthModal')); }} className="mobile-menu-link text-primary" style={{ textAlign: 'left', cursor: 'pointer' }}>Login</button>
            )}
          </div>

          <div className="mobile-menu-footer">
            <div className="mobile-footer-links">
              <Link to="/contact" className="mobile-footer-link">Contact</Link>
              <Link to="/about-us" className="mobile-footer-link">History</Link>
            </div>
            <p className="mobile-footer-copy">&copy; 2026 Shift Cycles</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;