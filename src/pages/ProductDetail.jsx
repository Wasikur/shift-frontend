import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Star, ShieldCheck, Truck, ChevronRight, Plus, Minus, Heart, X, ZoomIn, ChevronLeft, Tag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { findStaticProductById } from '../utils/staticProducts';
import { addToCart } from '../utils/cartUtils';
import { API_BASE_URL } from '../config';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lbScale, setLbScale] = useState(1);
  const [lbOffset, setLbOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffsetStart = useRef({ x: 0, y: 0 });

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  // True if this ID could be a MongoDB ObjectId (24 hex chars)
  const isMongoId = (str) => /^[a-f\d]{24}$/i.test(str);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isMongoId(id)) {
        const staticProduct = findStaticProductById(id);
        setProduct(staticProduct || null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products/${id}`, { timeout: 5000 });
        if (res.data && res.data._id) {
          setProduct(res.data);
          if (res.data.sizes?.length > 0) setSelectedSize(res.data.sizes[0]);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product from API:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowRight') setLightboxIndex(i => Math.min(i + 1, (product?.images?.length || 1) - 1));
    if (e.key === 'ArrowLeft') setLightboxIndex(i => Math.max(i - 1, 0));
  }, [lightboxOpen, product]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Callback ref to reliably attach/detach the active wheel event listener on the lightbox image
  const lightboxImgRef = useCallback((node) => {
    if (node) {
      const onWheel = (e) => {
        e.preventDefault();
        setLbScale(prev => {
          const delta = e.deltaY < 0 ? 0.15 : -0.15; // scroll up = zoom in
          const nextScale = Math.min(3, Math.max(1, prev + delta));
          if (nextScale <= 1) {
            setLbOffset({ x: 0, y: 0 });
          }
          return nextScale;
        });
      };
      node.addEventListener('wheel', onWheel, { passive: false });
      // Keep reference for removal if needed
      node._zoomWheelHandler = onWheel;
    }
  }, []);

  // Reset zoom/pan when lightbox opens/closes or active image changes
  useEffect(() => {
    setLbScale(1);
    setLbOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [lightboxIndex, lightboxOpen]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleLbMouseDown = (e) => {
    if (lbScale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragOffsetStart.current = { ...lbOffset };
  };

  const handleLbMouseMove = (e) => {
    if (!isDragging || lbScale <= 1) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setLbOffset({
      x: dragOffsetStart.current.x + dx,
      y: dragOffsetStart.current.y + dy
    });
  };

  const handleLbMouseUp = () => {
    setIsDragging(false);
  };

  const handleLbDoubleClick = (e) => {
    e.stopPropagation();
    if (lbScale > 1) {
      setLbScale(1);
      setLbOffset({ x: 0, y: 0 });
    } else {
      setLbScale(2);
      setLbOffset({ x: 0, y: 0 });
    }
  };

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner"></div>
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase' }}>Product Not Found</h2>
      <Link to="/marketplace" className="btn-primary" style={{ padding: '12px 24px', borderRadius: '8px' }}>Back to Store</Link>
    </div>
  );

  const images = product.images?.length > 0 ? product.images : [{ url: 'https://via.placeholder.com/800?text=Shift+Product' }];

  return (
    <>
      {/* ── Fullscreen Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', borderRadius: '50%', padding: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                backdropFilter: 'blur(8px)', zIndex: 1,
              }}
            >
              <X size={22} />
            </button>

            {/* Prev */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => i - 1); }}
                style={{
                  position: 'absolute', left: '20px',
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', borderRadius: '50%', padding: '12px',
                  display: 'flex', alignItems: 'center', cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                maxWidth: '90vw',
                maxHeight: '88vh',
                borderRadius: '12px',
              }}
            >
              <img
                ref={lightboxImgRef}
                key={lightboxIndex}
                src={images[lightboxIndex]?.url}
                alt={product.name}
                onMouseDown={handleLbMouseDown}
                onMouseMove={handleLbMouseMove}
                onMouseUp={handleLbMouseUp}
                onMouseLeave={handleLbMouseUp}
                onDoubleClick={handleLbDoubleClick}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '88vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  cursor: lbScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                  transform: `translate(${lbOffset.x}px, ${lbOffset.y}px) scale(${lbScale})`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  userSelect: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.75)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  pointerEvents: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <ZoomIn size={14} />
                <span>
                  {lbScale > 1
                    ? `${Math.round(lbScale * 100)}% - Drag to pan / Scroll or double-click to reset`
                    : 'Scroll to zoom · Double-click to zoom 2x'}
                </span>
              </div>
            </div>

            {/* Next */}
            {lightboxIndex < images.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => i + 1); }}
                style={{
                  position: 'absolute', right: '20px',
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', borderRadius: '50%', padding: '12px',
                  display: 'flex', alignItems: 'center', cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Counter */}
            <span style={{
              position: 'absolute', bottom: '20px', left: '20px',
              color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.1em',
            }}>
              {lightboxIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pd-section">
        <div className="container">
          {/* Breadcrumbs */}
          <div className="breadcrumbs" style={{ paddingTop: '120px', marginBottom: '2rem' }}>
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={10} />
            <Link to="/marketplace" className="breadcrumb-link">Store</Link>
            <ChevronRight size={10} />
            <Link to={`/marketplace?category=${product.category}`} className="breadcrumb-link">{product.category}</Link>
            <ChevronRight size={10} />
            <span className="breadcrumb-current">{product.name}</span>
          </div>

          {/* Main Grid */}
          <div className="pd-layout">

            {/* ── Left: Gallery ── */}
            <div className="pd-gallery">
              {/* Thumbnails column */}
              {images.length > 1 && (
                <div className="pd-thumbs">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`pd-thumb-btn ${activeImageIndex === i ? 'active' : ''}`}
                    >
                      <img src={img.url} alt={`View ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <motion.div
                className="pd-main-img-wrap"
                onClick={() => openLightbox(activeImageIndex)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ cursor: 'zoom-in' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={images[activeImageIndex]?.url}
                    alt={product.name}
                    className="pd-main-img"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ transformOrigin: 'center center' }}
                  />
                </AnimatePresence>
                <div className="pd-zoom-hint">
                  <ZoomIn size={16} />
                  <span>Click to view full screen</span>
                </div>
                {product.stock < 5 && product.stock > 0 && (
                  <span className="pd-stock-badge">Only {product.stock} left</span>
                )}
              </motion.div>
            </div>

            {/* ── Right: Info ── */}
            <div className="pd-info">
              {/* Brand + Rating */}
              <div className="pd-brand-row">
                <span className="pd-brand-badge">{product.brand}</span>
                <div className="pd-rating">
                  <Star size={14} fill="#FFD700" color="#FFD700" />
                  <span>{product.ratings?.average || 0}</span>
                  <span className="pd-rating-count">({product.ratings?.count || 0} reviews)</span>
                </div>
              </div>

              <h1 className="pd-title">{product.name}</h1>

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div className="pd-tags">
                  {product.tags.map(tag => (
                    <span key={tag} className="pd-tag"><Tag size={10} />{tag}</span>
                  ))}
                </div>
              )}

              <p className="pd-price">₹{product.price?.toLocaleString()}</p>

              <p className="pd-desc">{product.description}</p>

              {/* Size Selector */}
              {product.sizes?.length > 0 && (
                <div className="pd-sizes">
                  <span className="pd-sizes-label">Select Size</span>
                  <div className="pd-size-opts">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`pd-size-btn ${selectedSize === size ? 'active' : ''}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Actions */}
              <div className="pd-purchase">
                <div className="pd-qty">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="pd-qty-btn"><Minus size={15} /></button>
                  <span className="pd-qty-val">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="pd-qty-btn"><Plus size={15} /></button>
                </div>
                <button className="pd-wishlist-btn"><Heart size={18} /></button>
              </div>

              <div className="pd-ctas">
                <button
                  className="btn-primary pd-cart-btn"
                  onClick={handleAddToCart}
                  style={{
                    background: cartAdded ? 'var(--primary)' : undefined,
                    transition: 'background 0.3s',
                  }}
                >
                  {cartAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
                  {cartAdded ? 'Added to Cart!' : 'Add to Cart'}
                </button>
                <Link to="/checkout" className="pd-buy-btn">
                  Buy Now
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pd-trust">
                <div className="pd-trust-item">
                  <Truck size={18} />
                  <div>
                    <h5>Free Shipping</h5>
                    <p>Orders above ₹5,000</p>
                  </div>
                </div>
                <div className="pd-trust-item">
                  <ShieldCheck size={18} />
                  <div>
                    <h5>100% Genuine</h5>
                    <p>Certified Products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="pd-tabs-section">
            <div className="pd-tabs-header">
              {['description', 'specifications', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pd-tab-btn ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="pd-tab-line" className="pd-tab-line" />}
                </button>
              ))}
            </div>

            <div className="pd-tab-body">
              {activeTab === 'description' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key="desc">
                  <p className="pd-tab-text">{product.description}</p>
                  <ul className="pd-bullet-list">
                    <li><span className="pd-bullet" />Lightweight aerodynamic design</li>
                    <li><span className="pd-bullet" />Precision-engineered components</li>
                    <li><span className="pd-bullet" />Ergonomic fit and finish</li>
                    <li><span className="pd-bullet" />Weather-resistant materials</li>
                  </ul>
                </motion.div>
              )}

              {activeTab === 'specifications' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key="specs" className="pd-specs-table">
                  {product.specifications && Object.keys(product.specifications).length > 0
                    ? Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="pd-spec-row">
                        <span className="pd-spec-key">{key}</span>
                        <span className="pd-spec-val">{value}</span>
                      </div>
                    ))
                    : <p className="pd-tab-text" style={{ opacity: 0.5 }}>No technical specifications listed for this product.</p>
                  }
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key="reviews" className="pd-reviews">
                  <div className="pd-reviews-score">
                    <span className="pd-score-num">{product.ratings?.average || 0}</span>
                    <div>
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill={i < Math.round(product.ratings?.average || 0) ? '#FFD700' : 'transparent'} color="#FFD700" />
                        ))}
                      </div>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{product.ratings?.count || 0} customer reviews</p>
                    </div>
                  </div>
                  <div className="pd-empty-reviews">
                    <Star size={48} style={{ opacity: 0.15 }} />
                    <p>Be the first to review this product</p>
                    <button className="btn-outline" style={{ marginTop: '1rem', padding: '10px 24px', borderRadius: '8px', fontSize: '12px' }}>Write a Review</button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductDetail;
