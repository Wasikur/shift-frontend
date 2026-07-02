import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Camera, Send, PlayCircle as Youtube } from 'lucide-react';
import logo from '../../assets/yellow-black.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container grid-4">
        {/* Brand */}
        <div className="footer-column footer-brand">
          <a href="/" className="footer-logo-link">
            <img src={logo} alt="Shift Logo" className="footer-logo" />
            <span className="footer-title">Shift</span>
          </a>
          <p className="footer-description">
            Your ultimate destination for premium bicycles, apparel, and professional service. Let's shift your riding experience.
          </p>
          <div className="footer-social-icons">
            <a href="#" className="social-icon"><MessageCircle size={16} /></a>
            <a href="#" className="social-icon"><Camera size={16} /></a>
            <a href="#" className="social-icon"><Send size={16} /></a>
            <a href="#" className="social-icon"><Youtube size={16} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column footer-links">
          <h4 className="footer-section-title">Explore</h4>
          <ul className="footer-links-list">
            <li><a href="/marketplace" className="footer-link-item">Marketplace</a></li>
            <li><a href="/bikes" className="footer-link-item">Bikes</a></li>
            <li><a href="/apparel" className="footer-link-item">Apparel</a></li>
            <li><a href="/blog" className="footer-link-item">Events &amp; Blog</a></li>
            <li><a href="/about-us" className="footer-link-item">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column footer-links">
          <h4 className="footer-section-title">Support</h4>
          <ul className="footer-links-list">
            <li><a href="/book-service" className="footer-link-item">Service Booking</a></li>
            <li><a href="/shipping-policy" className="footer-link-item">Shipping Policy</a></li>
            <li><a href="/contact" className="footer-link-item">Contact Us</a></li>
            <li><a href="/terms-of-service" className="footer-link-item">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column footer-contact">
          <h4 className="footer-section-title">Find Us</h4>
          <div className="footer-contact-details">
            <div className="contact-detail-row">
              <MapPin size={16} className="contact-icon text-primary" />
              <span className="contact-text">Convoy Rd, Ttiloi Bari, Chowkidingee, Dibrugarh, Assam 786001, India</span>
            </div>
            <div className="contact-detail-row">
              <Phone size={16} className="contact-icon text-primary" />
              <span className="contact-text">+91 98765 43210</span>
            </div>
            <div className="contact-detail-row">
              <Mail size={16} className="contact-icon text-primary" />
              <span className="contact-text">hello@shiftbikes.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-copy">
          &copy; 2026 Shift Bicycle Store. All Rights Reserved. Designed for Performance.
        </p>
        <div className="footer-payment-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="payment-icon" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="payment-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;