import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, CheckCircle2 } from 'lucide-react';

const Terms = () => {
  return (
    <div className="marketplace-section" style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Back Link */}
        <Link to="/" className="blog-back-link" style={{ marginBottom: '2rem' }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {/* Header */}
        <div className="marketplace-header" style={{ marginBottom: '3rem' }}>
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> Legal Agreement
          </div>
          <h1 className="marketplace-title" style={{ fontSize: '42px', fontWeight: 900, textTransform: 'uppercase' }}>
            Terms of <span className="text-primary italic">Service</span>
          </h1>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '13px' }}>
            LAST UPDATED: MARCH 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="terms-body" style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
          
          <div className="terms-intro-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Scale size={24} className="text-primary" style={{ flexShrink: 0, marginTop: '4px' }} />
            <div>
              <h4 style={{ color: '#fff', fontWeight: 900, fontSize: '16px', textTransform: 'uppercase', marginBottom: '8px' }}>Please Read Carefully</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                By accessing or using the Shift website, store, and services, you agree to comply with and be bound by the following terms and conditions. If you do not agree, please do not use our services.
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            1. Use of the Site
          </h3>
          <p style={{ marginBottom: '24px' }}>
            You may use our platform only for lawful purposes. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the service, use of the service, or access to the service without express written permission by us.
          </p>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            2. Account Registration and Security
          </h3>
          <p style={{ marginBottom: '24px' }}>
            To access certain features of our platform, you may be required to register for an account. You must provide accurate, current, and complete information. You are responsible for safeguarding your account credentials, including your password, and agree not to disclose them to any third party.
          </p>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            3. Products and Pricing
          </h3>
          <p style={{ marginBottom: '24px' }}>
            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue any product or service without notice. We have made every effort to display as accurately as possible the colors and images of our products.
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'square' }}>
            <li style={{ marginBottom: '8px' }}>All cycle weights and specifications are approximate specifications.</li>
            <li style={{ marginBottom: '8px' }}>Prices listed are inclusive of local taxes where applicable.</li>
            <li style={{ marginBottom: '8px' }}>We reserve the right to refuse any order placed with us.</li>
          </ul>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            4. Warranty & Liability Limits
          </h3>
          <p style={{ marginBottom: '24px' }}>
            We guarantee all brand new performance frames against manufacturing defects as specified under each brand's standard warranty policy. SHIFT is not liable for indirect, incidental, or punitive damages arising from the usage of bikes, components, or service tunings.
          </p>

          <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} className="text-primary" />
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>Document ID: SH-TOS-2026</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#22c55e', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <CheckCircle2 size={14} /> Active Policy
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Terms;
