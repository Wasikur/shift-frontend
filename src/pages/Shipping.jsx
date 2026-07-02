import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Package, Clock, ShieldAlert } from 'lucide-react';

const Shipping = () => {
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
            <span className="eyebrow-line"></span> Fulfilment & Delivery
          </div>
          <h1 className="marketplace-title" style={{ fontSize: '42px', fontWeight: 900, textTransform: 'uppercase' }}>
            Shipping <span className="text-primary italic">Policy</span>
          </h1>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '13px' }}>
            LAST UPDATED: MARCH 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="shipping-body" style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px' }}>
              <Truck size={24} className="text-primary" style={{ marginBottom: '12px' }} />
              <h4 style={{ color: '#fff', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', marginBottom: '8px' }}>Free Delivery</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Enjoy complimentary express shipping across India on all orders exceeding ₹5,000.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px' }}>
              <Clock size={24} className="text-primary" style={{ marginBottom: '12px' }} />
              <h4 style={{ color: '#fff', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', marginBottom: '8px' }}>Delivery Times</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Assam orders arrive in 2-4 working days. Rest of India shipments take 5-7 working days.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '12px' }}>
              <Package size={24} className="text-primary" style={{ marginBottom: '12px' }} />
              <h4 style={{ color: '#fff', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', marginBottom: '8px' }}>Safe Boxing</h4>
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>All cycles are shipped 85% assembled in heavy duty layered boxes to ensure zero transit damage.</p>
            </div>
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            1. Order Processing
          </h3>
          <p style={{ marginBottom: '24px' }}>
            All orders are processed within 24 to 48 hours (excluding Sundays and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped containing a dedicated tracking link.
          </p>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            2. Domestic Shipping Rates and Estimates
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Shipping charges for your order will be calculated and displayed at checkout:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'square' }}>
            <li style={{ marginBottom: '8px' }}>**Orders under ₹5,000:** Flat shipping fee of ₹150 applies.</li>
            <li style={{ marginBottom: '8px' }}>**Orders over ₹5,000:** Free Delivery.</li>
            <li style={{ marginBottom: '8px' }}>**Express/Local Assam courier:** Available on request via email or whatsapp.</li>
          </ul>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            3. Local Store Pickup
          </h3>
          <p style={{ marginBottom: '24px' }}>
            You can skip shipping fees with free local pickup at our Dibrugarh showroom. After placing your order and selecting local pickup, your order will be prepared and ready for pick up within 24 hours. We will send you an email when your order is ready.
          </p>

          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            4. Damage Claims & Insurance
          </h3>
          <div style={{ background: 'rgba(239,68,68,0.02)', border: '1px solid rgba(239,68,68,0.1)', padding: '20px', borderRadius: '8px', display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '24px' }}>
            <ShieldAlert size={20} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
              In the rare event that your order arrives damaged, please email us within 48 hours at **hello@shiftbikes.com** with your order number and clear photos of the item's condition and the outer packaging. We insure all transit shipments.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Shipping;
