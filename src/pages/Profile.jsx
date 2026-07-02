import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Save, Shield, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const API = `${API_BASE_URL}/api/auth`;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Personal info state
  const [infoForm, setInfoForm] = useState({ name: '', phone: '' });
  const [infoStatus, setInfoStatus] = useState(null); // { type: 'success'|'error', message }
  const [infoSaving, setInfoSaving] = useState(false);

  // Password state
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passStatus, setPassStatus] = useState(null);
  const [passSaving, setPassSaving] = useState(false);
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  // Fetch fresh profile from API on mount
  useEffect(() => {
    const checkAndFetchUser = () => {
      const stored = localStorage.getItem('user');
      const localUser = stored ? JSON.parse(stored) : null;
      
      if (!localUser?.token) {
        setUserData(null);
        setLoading(false);
        // Redirect to home if they logged out while on this page
        window.location.href = '/';
        return;
      }

      fetch(`${API}/profile`, {
        headers: { Authorization: `Bearer ${localUser.token}` }
      })
        .then(r => r.json())
        .then(data => {
          const merged = { ...localUser, ...data };
          setUserData(merged);
          setInfoForm({ name: data.name || '', phone: data.phone || '' });
          setLoading(false);
        })
        .catch(() => {
          setUserData(localUser);
          setInfoForm({ name: localUser.name || '', phone: localUser.phone || '' });
          setLoading(false);
        });
    };

    checkAndFetchUser();

    // Listen to logout actions from Navbar
    window.addEventListener('storage', checkAndFetchUser);
    return () => {
      window.removeEventListener('storage', checkAndFetchUser);
    };
  }, []);

  const getToken = () => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored)?.token : null;
  };

  const handleInfoChange = e => {
    setInfoForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setInfoStatus(null);
  };

  const handlePassChange = e => {
    setPassForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setPassStatus(null);
  };

  const saveInfo = async e => {
    e.preventDefault();
    if (!infoForm.name.trim()) {
      setInfoStatus({ type: 'error', message: 'Name cannot be empty.' });
      return;
    }
    setInfoSaving(true);
    try {
      const res = await fetch(`${API}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ name: infoForm.name, phone: infoForm.phone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Update localStorage
      const stored = JSON.parse(localStorage.getItem('user'));
      const updated = { ...stored, name: data.name, phone: data.phone };
      localStorage.setItem('user', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      setUserData(u => ({ ...u, name: data.name, phone: data.phone }));
      setInfoStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (err) {
      setInfoStatus({ type: 'error', message: err.message || 'Failed to update profile.' });
    } finally {
      setInfoSaving(false);
    }
  };

  const savePassword = async e => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passForm;

    if (!newPassword || newPassword.length < 6) {
      setPassStatus({ type: 'error', message: 'New password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    if (!userData?.ssoOnly && !currentPassword) {
      setPassStatus({ type: 'error', message: 'Please enter your current password.' });
      return;
    }

    setPassSaving(true);
    try {
      const body = userData?.ssoOnly
        ? { newPassword }
        : { currentPassword, newPassword };

      const res = await fetch(`${API}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // If SSO user just set a password, update ssoOnly in localStorage
      if (userData?.ssoOnly) {
        const stored = JSON.parse(localStorage.getItem('user'));
        const updated = { ...stored, ssoOnly: false };
        localStorage.setItem('user', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
        setUserData(u => ({ ...u, ssoOnly: false }));
      }

      setPassStatus({ type: 'success', message: userData?.ssoOnly ? 'Password set! You can now log in with email too.' : 'Password changed successfully!' });
      setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPassStatus({ type: 'error', message: err.message || 'Failed to update password.' });
    } finally {
      setPassSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page-loading">
        <div className="spinner" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-page-loading">
        <p style={{ color: 'var(--text-muted)' }}>Please log in to view your profile.</p>
      </div>
    );
  }

  const initials = userData.name ? userData.name.charAt(0).toUpperCase() : '?';
  const isSsoOnly = userData.ssoOnly;

  return (
    <div className="profile-page">
      {/* Page header */}
      <div className="profile-page-hero">
        <div className="profile-hero-glow" />
        <div className="container">
          <div className="profile-hero-inner">
            <div className="profile-hero-avatar">{initials}</div>
            <div>
              <span className="uppercase-wide" style={{ fontSize: '9px' }}>Account</span>
              <h1 className="profile-hero-name">{userData.name}</h1>
              <p className="profile-hero-email">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container profile-content">
        <div className="profile-grid">

          {/* ── Personal Info ──────────────────────────── */}
          <section className="profile-card">
            <div className="profile-card-header">
              <User size={18} className="profile-card-icon" />
              <div>
                <h2 className="profile-card-title">Personal Info</h2>
                <p className="profile-card-subtitle">Update your name and phone number</p>
              </div>
            </div>

            <form onSubmit={saveInfo} className="profile-form">
              {/* Name */}
              <div className="profile-field">
                <label className="profile-label">Full Name</label>
                <div className="profile-input-wrapper">
                  <User size={15} className="profile-input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={infoForm.name}
                    onChange={handleInfoChange}
                    placeholder="Your full name"
                    className="profile-input"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="profile-field">
                <label className="profile-label">
                  Email Address
                  <span className="profile-label-badge">Cannot be changed</span>
                </label>
                <div className="profile-input-wrapper">
                  <Mail size={15} className="profile-input-icon" />
                  <input
                    type="email"
                    value={userData.email}
                    readOnly
                    className="profile-input profile-input-readonly"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="profile-field">
                <label className="profile-label">Phone Number</label>
                <div className="profile-input-wrapper">
                  <Phone size={15} className="profile-input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={infoForm.phone}
                    onChange={handleInfoChange}
                    placeholder="+91 98765 43210"
                    className="profile-input"
                  />
                </div>
              </div>

              {/* Status */}
              {infoStatus && (
                <div className={`profile-status ${infoStatus.type}`}>
                  {infoStatus.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  {infoStatus.message}
                </div>
              )}

              <button type="submit" className="profile-save-btn" disabled={infoSaving}>
                {infoSaving ? <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> : <Save size={14} />}
                {infoSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </section>

          {/* ── Password ───────────────────────────────── */}
          <section className="profile-card">
            <div className="profile-card-header">
              <Shield size={18} className="profile-card-icon" />
              <div>
                <h2 className="profile-card-title">
                  {isSsoOnly ? 'Set a Password' : 'Change Password'}
                </h2>
                <p className="profile-card-subtitle">
                  {isSsoOnly
                    ? 'You signed in with Google. Set a password to also log in with email.'
                    : 'Enter your current password, then choose a new one.'}
                </p>
              </div>
            </div>

            {/* SSO info chip */}
            {isSsoOnly && (
              <div className="profile-sso-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                Currently signed in with Google only
                <ArrowRight size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />
              </div>
            )}

            <form onSubmit={savePassword} className="profile-form">
              {/* Current password — only if user already has a password */}
              {!isSsoOnly && (
                <div className="profile-field">
                  <label className="profile-label">Current Password</label>
                  <div className="profile-input-wrapper">
                    <Lock size={15} className="profile-input-icon" />
                    <input
                      type={showPass.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passForm.currentPassword}
                      onChange={handlePassChange}
                      placeholder="••••••••"
                      className="profile-input"
                      style={{ paddingRight: '48px' }}
                    />
                    <button type="button" className="profile-eye-btn" onClick={() => setShowPass(s => ({ ...s, current: !s.current }))}>
                      {showPass.current ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              )}

              {/* New password */}
              <div className="profile-field">
                <label className="profile-label">New Password</label>
                <div className="profile-input-wrapper">
                  <Lock size={15} className="profile-input-icon" />
                  <input
                    type={showPass.new ? 'text' : 'password'}
                    name="newPassword"
                    value={passForm.newPassword}
                    onChange={handlePassChange}
                    placeholder="Min. 6 characters"
                    className="profile-input"
                    style={{ paddingRight: '48px' }}
                  />
                  <button type="button" className="profile-eye-btn" onClick={() => setShowPass(s => ({ ...s, new: !s.new }))}>
                    {showPass.new ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Confirm new password */}
              <div className="profile-field">
                <label className="profile-label">Confirm New Password</label>
                <div className="profile-input-wrapper">
                  <Lock size={15} className="profile-input-icon" />
                  <input
                    type={showPass.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passForm.confirmPassword}
                    onChange={handlePassChange}
                    placeholder="••••••••"
                    className="profile-input"
                    style={{ paddingRight: '48px' }}
                  />
                  <button type="button" className="profile-eye-btn" onClick={() => setShowPass(s => ({ ...s, confirm: !s.confirm }))}>
                    {showPass.confirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Status */}
              {passStatus && (
                <div className={`profile-status ${passStatus.type}`}>
                  {passStatus.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  {passStatus.message}
                </div>
              )}

              <button type="submit" className="profile-save-btn" disabled={passSaving}>
                {passSaving ? <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> : <Shield size={14} />}
                {passSaving ? 'Updating...' : isSsoOnly ? 'Set Password' : 'Update Password'}
              </button>
            </form>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Profile;
