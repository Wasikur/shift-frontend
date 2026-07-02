import React from 'react';
import ProductGrid from '../components/marketplace/ProductGrid';

const Spares = () => {
  return (
    <div className="marketplace-section">
      <div className="container">
        {/* Category Header */}
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> Precision Engineering
          </div>
          <h1 className="marketplace-title">Spares</h1>
          <p className="featured-desc text-muted" style={{ maxWidth: '600px', marginTop: '1rem' }}>
            Maintain absolute performance. Find genuine replacement parts including high-durability chains, replacement cassettes, performance tires, and hydraulic brake kits.
          </p>
        </div>

        <div className="marketplace-layout" style={{ marginTop: '3rem' }}>
          <div className="marketplace-main">
            <ProductGrid category="Spares" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spares;
