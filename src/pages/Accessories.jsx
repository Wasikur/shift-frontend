import React from 'react';
import ProductGrid from '../components/marketplace/ProductGrid';

const Accessories = () => {
  return (
    <div className="marketplace-section">
      <div className="container">
        {/* Category Header */}
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> Essential Add-ons
          </div>
          <h1 className="marketplace-title">Accessories</h1>
          <p className="featured-desc text-muted" style={{ maxWidth: '600px', marginTop: '1rem'}}>
            Elevate your journey. From ultra-bright safety lights and lightweight helmets to professional GPS trackers and hydration packs, find everything you need to optimize your ride.
          </p>
        </div>

        <div className="marketplace-layout" style={{ marginTop: '3rem' }}>
          <div className="marketplace-main">
            <ProductGrid category="Accessories" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
