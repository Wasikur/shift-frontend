import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, X } from 'lucide-react';

import { API_BASE_URL } from '../../config';

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAuthModal', handleOpen);
    
    // Inject Google GSI script dynamically
    const scriptId = 'google-gsi-client';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => window.removeEventListener('openAuthModal', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen && window.google) {
      window.google.accounts.id.initialize({
        client_id: "230421922338-9qh31vgrbi0pva1qrhjs83b2mmut8c60.apps.googleusercontent.com",
        callback: async (response) => {
          setLoading(true);
          setError('');
          try {
            const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ token: response.credential })
            });
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.message || 'Google SSO failed');
            }
            localStorage.setItem('user', JSON.stringify(data));
            window.dispatchEvent(new Event('storage'));
            setIsOpen(false);
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          } catch (err) {
            setError(err.message || 'Google Authentication failed. Please try again.');
          } finally {
            setLoading(false);
          }
        }
      });
      
      // Render the official Google Button in the target div
      setTimeout(() => {
        const btnContainer = document.getElementById('google-sso-btn');
        if (btnContainer && window.google) {
          window.google.accounts.id.renderButton(
            btnContainer,
            { theme: 'dark', size: 'large', width: 368, text: 'signin_with', shape: 'pill' }
          );
        }
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        setError('Please provide your name.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    try {
      const url = isLogin 
        ? `${API_BASE_URL}/api/auth/login` 
        : `${API_BASE_URL}/api/auth/register`;
      
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('user', JSON.stringify(data));
      window.dispatchEvent(new Event('storage'));
      setIsOpen(false); // Close modal on success
      setError('');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>

          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
          />

          {/* Modal Card Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="auth-modal-card"
            style={{
              width: '100%',
              maxWidth: '448px',
              padding: '40px',
              background: 'var(--dark-gray)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '32px',
              position: 'relative',
              boxShadow: 'var(--shadow-premium)',
              zIndex: 10
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center" style={{ marginBottom: '28px' }}>
              {/* <span className="uppercase-wide" style={{ fontSize: '11px' }}>Performance Hub</span> */}
              <h2 className="section-heading" style={{ fontSize: '28px', marginTop: '10px', marginBottom: '6px', letterSpacing: '-0.01em', wordSpacing: '0.18em' }}>
                {isLogin ? 'Welcome Back' : 'Join Shift'}
              </h2>
              <p className="text-muted" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {isLogin ? 'Enter credentials to login' : 'Create an account to get started'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="card-inputs-container">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="status-badge"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    padding: '10px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    letterSpacing: 'normal',
                    fontSize: '12px',
                    textAlign: 'center'
                  }}
                >
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="card-input-group"
                    key="name"
                  >
                    <label className="card-input-label">Full Name</label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="text"
                        name="name"
                        placeholder="JOHN DOE"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="auth-text-input"
                        style={{ paddingLeft: '44px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="card-input-group">
                <label className="card-input-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    name="email"
                    placeholder="HELLO@SHIFTBIKES.COM"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="auth-text-input"
                    style={{ paddingLeft: '44px', fontSize: '14px', letterSpacing: '0.05em' }}
                    required
                  />
                </div>
              </div>

              <div className="card-input-group">
                <label className="card-input-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="auth-text-input"
                    style={{ paddingLeft: '44px', paddingRight: '48px', fontSize: '14px' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="card-input-group"
                    key="confirm"
                  >
                    <label className="card-input-label">Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="auth-text-input"
                        style={{ paddingLeft: '44px', fontSize: '14px' }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isLogin && (
                <div className="text-right">
                  <a href="#forgot" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', borderRadius: '8px', fontSize: '13px', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner" style={{ height: '14px', width: '14px', borderWidth: '2px' }} />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={12} />
                  </>
                )}
              </button>
            </form>

            {/* Social Linker */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0 16px', gap: '12px' }}>
              <div style={{ flexGrow: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
              <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--text-muted)' }}>Or Continue With</span>
              <div style={{ flexGrow: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', width: '100%', minHeight: '44px' }}>
              <div id="google-sso-btn" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}></div>
            </div>

            {/* Footer toggle */}
            <div className="text-center" style={{ marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span className="text-primary italic" style={{ borderBottom: '1px solid var(--primary)' }}>
                  {isLogin ? 'Sign Up' : 'Log In'}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
