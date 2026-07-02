import React from 'react';
import ProductGrid from '../components/marketplace/ProductGrid';
import { ArrowRight } from 'lucide-react';

const Bikes = () => {
  return (
    <div className="marketplace-section">
      <div className="container">
        {/* Category Header */}
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> High Performance
          </div>
          <h1 className="marketplace-title">Bikes</h1>
          <p className="featured-desc text-muted" style={{ maxWidth: '600px', marginTop: '1rem'}}>
            Unleash absolute power and control. Our collection features premium aerodynamic road bikes, rugged mountain trail machines, and custom carbon builds designed for real performance.
          </p>
        </div>

        <div className="marketplace-layout" style={{ marginTop: '3rem' }}>
          <div className="marketplace-main">
            <ProductGrid category="Bikes" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bikes;
