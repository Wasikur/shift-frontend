import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
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

    setLoading(true);

    // Simulate Auth API Call
    setTimeout(() => {
      setLoading(false);
      // Save simulated user token/session in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: isLogin ? (formData.email.split('@')[0]) : formData.name,
        email: formData.email
      }));
      // Dispatch storage update so Navbar updates instantly
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }, 1500);
  };

  return (
    <div className="marketplace-section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow filters */}
      <div className="hero-glow-1" style={{ top: '10%', right: '10%', width: '400px', height: '400px' }} />
      <div className="hero-glow-2" style={{ bottom: '10%', left: '10%', width: '450px', height: '450px' }} />

      <div className="container" style={{ maxWidth: '480px', position: 'relative', zIndex: 10 }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="payment-card" 
          style={{ width: '100%', padding: '40px', background: 'var(--dark-gray)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px' }}
        >
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '32px' }}>
            <span className="uppercase-wide" style={{ fontSize: '10px' }}>Performance Hub</span>
            <h2 className="section-heading" style={{ fontSize: '28px', marginTop: '12px', marginBottom: '8px' }}>
              {isLogin ? 'Welcome Back' : 'Join Shift'}
            </h2>
            <p className="text-muted" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {isLogin ? 'Enter your credentials to shift gears' : 'Create an account to track performance'}
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
                  padding: '12px',
                  borderRadius: '12px',
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
                      className="card-text-input" 
                      style={{ paddingLeft: '48px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
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
                  className="card-text-input" 
                  style={{ paddingLeft: '48px', fontSize: '12px', letterSpacing: '0.05em' }}
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
                  className="card-text-input" 
                  style={{ paddingLeft: '48px', paddingRight: '48px', fontSize: '12px' }}
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
                      className="card-text-input" 
                      style={{ paddingLeft: '48px', fontSize: '12px' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {isLogin && (
              <div className="text-right">
                <a href="#forgot" style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                  Forgot Password?
                </a>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', padding: '16px', borderRadius: '8px', fontSize: '12px', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" style={{ height: '16px', width: '16px', borderWidth: '2px' }} />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Social login line */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0 24px', gap: '16px' }}>
            <div style={{ flexGrow: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
            <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)' }}>Or Continue With</span>
            <div style={{ flexGrow: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button type="button" className="social-icon" style={{ flexGrow: 1, height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', fontWeight: 'bold' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button type="button" className="social-icon" style={{ flexGrow: 1, height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', fontWeight: 'bold' }}>
              <Github size={16} /> GitHub
            </button>
          </div>

          {/* Footer toggle link */}
          <div className="text-center" style={{ marginTop: '32px' }}>
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-primary italic" style={{ borderBottom: '1px solid var(--primary)' }}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
