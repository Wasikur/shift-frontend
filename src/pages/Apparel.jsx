import React from 'react';
import ProductGrid from '../components/marketplace/ProductGrid';

const Apparel = () => {
  return (
    <div className="marketplace-section">
      <div className="container">
        {/* Category Header */}
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> Elite Wear
          </div>
          <h1 className="marketplace-title">Apparel</h1>
          <p className="featured-desc text-muted" style={{ maxWidth: '600px', marginTop: '1rem' }}>
            Ride in absolute style and comfort. Explore professional aerodynamic cycling jerseys, bib shorts, protective windbreakers, and weather-resistant gear optimized for peak endurance.
          </p>
        </div>

        <div className="marketplace-layout" style={{ marginTop: '3rem' }}>
          <div className="marketplace-main">
            <ProductGrid category="Apparels" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apparel;
