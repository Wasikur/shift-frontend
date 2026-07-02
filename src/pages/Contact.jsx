import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

import { API_BASE_URL } from '../config';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, error: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus({
        loading: false,
        success: false,
        error: 'Unable to reach the server. Please check your connection and try again.',
      });
    }
  };

  return (
    <div className="marketplace-section contact-section">
      <div className="container">
        {/* Header */}
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> Get in Touch
          </div>
          <h1 className="marketplace-title">Contact Us</h1>
          <p className="featured-desc text-muted" style={{ maxWidth: '600px', margin: '1rem 0 0 0' }}>
            Have a question about our high-performance bikes, custom configurations, or need technical support? Drop us a line.
          </p>
        </div>

        {/* Content Layout */}
        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-info-card">
            <h2 className="contact-subheading">Find Us</h2>
            <p className="contact-desc">
              Visit our premium workshop or contact us through any of our channels below.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="detail-title">Showroom & Workshop</h4>
                  <p className="detail-text">
                    Convoy Rd, Ttiloi Bari, Chowkidingee,<br />
                    Dibrugarh, Assam 786001, India
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="detail-title">Call Us</h4>
                  <p className="detail-text">+91 98765 43210</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="detail-title">Email Us</h4>
                  <p className="detail-text">hello@shiftbikes.com</p>
                </div>
              </div>
            </div>

            <div className="contact-map-container" style={{ marginTop: '2.5rem', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', height: '220px' }}>
              <iframe
                title="Shift Flagship Hub Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.467475147573!2d94.90807897534433!3d27.485827776010076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37409819ee1b4ab5%3A0xe53fa00cb62804d9!2sConvoy%20Rd%2C%20Dibrugarh%2C%20Assam%20786001!5e0!3m2!1sen!2sin!4v1714562000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a 
                href="https://maps.app.goo.gl/7f5VUh46n4poWqh37" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link-btn"
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(10, 10, 10, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--primary)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'var(--transition)'
                }}
              >
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Form Card */}
          <div className="contact-form-card">
            <h2 className="contact-subheading">Send a Message</h2>
            
            {status.success && (
              <div className="alert-message alert-success">
                <CheckCircle size={20} className="alert-icon" />
                <div>
                  <h4 className="alert-title">Message Sent!</h4>
                  <p className="alert-desc">We will get back to you as soon as possible.</p>
                </div>
              </div>
            )}

            {status.error && (
              <div className="alert-message alert-error">
                <AlertCircle size={20} className="alert-icon" />
                <div>
                  <h4 className="alert-title">Failed to Send</h4>
                  <p className="alert-desc">{status.error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about the bike, apparel, or build you are interested in..."
                  className="form-input form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="btn-submit btn-primary-custom"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
