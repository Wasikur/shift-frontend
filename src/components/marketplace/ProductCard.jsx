import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../utils/cartUtils';

const ProductCard = ({ product }) => {
  const [cartAdded, setCartAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0] || '');
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="product-card"
    >
      <div className="product-card-media">
        {/* Badge */}
        {product.stock < 5 && (
          <span className="card-badge stock-badge">
            Only {product.stock} Left
          </span>
        )}
        
        {/* Actions Overlay */}
        <div className="card-actions">
          <button className="action-btn">
            <Heart size={18} />
          </button>
          <button className="action-btn" onClick={handleAddToCart} title="Add to Cart">
            {cartAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>

        {/* Product Image */}
        <Link to={`/product/${product._id || product.id}`} className="product-card-image-link">
          <img 
            src={product.images?.[0]?.url || 'https://via.placeholder.com/400?text=Shift+Bike'} 
            alt={product.name} 
            className="product-card-img"
          />
        </Link>

        {/* Quick View Button */}
        <Link 
          to={`/product/${product._id || product.id}`}
          className="quick-view-btn"
        >
          View Details <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="product-card-body">
        <div className="card-meta">
          <div className="card-meta-row">
            <span className="card-category">
              {product.category}
            </span>
            <div className="card-rating">
              <Star size={12} fill="#FBBC05" color="#FBBC05" />
              <span>{product.ratings?.average || 0} ({product.ratings?.count || 0})</span>
            </div>
          </div>
          <h3 className="card-product-title">
            <Link to={`/product/${product._id || product.id}`}>{product.name}</Link>
          </h3>
          <p className="card-brand">{product.brand}</p>
        </div>

        <div className="card-footer">
          <span className="card-price">₹{product.price.toLocaleString()}</span>
          <button className="card-buy-btn">
             Buy Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
