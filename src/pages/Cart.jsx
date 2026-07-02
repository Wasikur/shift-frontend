import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Lock } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  // Initialize state from localStorage or load structural mocks
  // Initialize state from localStorage or load structural mocks
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    const oldBrokenUrl = 'https://images.unsplash.com/photo-1541625602330-2277a1c4b6c3?auto=format&fit=crop&q=80&w=300';
    const newBikeUrl = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=300';
    const newJerseyUrl = 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=300';

    if (stored) {
      const items = JSON.parse(stored);
      // Migrate legacy broken URLs in user's localStorage
      return items.map(item => {
        if (item.img === oldBrokenUrl) {
          return {
            ...item,
            img: item.name.toLowerCase().includes('jersey') ? newJerseyUrl : newBikeUrl
          };
        }
        return item;
      });
    }
    const defaults = [
      { id: 1, name: 'Trek Marlin Gen 2', price: 45900, size: 'L', qty: 1, img: newBikeUrl },
      { id: 2, name: 'Shift Performance Jersey', price: 2499, size: 'M', qty: 1, img: newJerseyUrl }
    ];
    localStorage.setItem('cartItems', JSON.stringify(defaults));
    return defaults;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  const updateQty = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = subtotal > 10000 ? 500 : 0;
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal - discount + shipping;

  const handleCheckout = () => {
    // Navigate to checkout and pass the final order state
    const orderData = {
      id: `SHF-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString(),
      items: cartItems.map(item => ({ name: item.name, quantity: item.qty, price: item.price, size: item.size })),
      total: subtotal,
      discount: discount,
      shipping: shipping,
      tax: 0,
      final: total
    };
    navigate('/checkout/success', { state: { order: orderData } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="marketplace-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <div className="success-icon-container" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}>
            <ShoppingCart size={40} />
          </div>
          <div>
            <h2 className="section-heading" style={{ fontSize: '32px' }}>Your Cart is <span className="text-primary italic">Empty</span></h2>
            <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Explore high performance bikes & gear to start your journey.</p>
          </div>
          <Link to="/marketplace" className="btn-primary" style={{ padding: '12px 32px', fontSize: '11px' }}>
            Go To Marketplace <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="marketplace-section">
      <div className="container">
        {/* Header */}
        <div className="marketplace-header" style={{ marginBottom: '4rem' }}>
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> Shopping Bag
          </div>
          <h1 className="marketplace-title">Your Cart</h1>
        </div>

        {/* Layout Grid */}
        <div className="cart-layout">
          
          {/* Left: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="cart-item-card"
              >
                {/* Product details info row */}
                <div className="cart-item-info">
                  <div style={{ height: '80px', width: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src={item.img} alt={item.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>{item.name}</h3>
                    <p className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
                      Size: <span style={{ color: '#fff', fontWeight: 'bold' }}>{item.size}</span>
                    </p>
                    <p style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '16px', marginTop: '8px' }}>
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
 
                {/* Qty & Delete controls */}
                <div className="cart-item-controls">
                  <div className="qty-selector" style={{ padding: '4px' }}>
                    <button onClick={() => updateQty(item.id, -1)} className="qty-btn" style={{ height: '32px', width: '32px' }}><Minus size={12} /></button>
                    <span className="qty-value" style={{ fontSize: '15px', width: '24px' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="qty-btn" style={{ height: '32px', width: '32px' }}><Plus size={12} /></button>
                  </div>
 
                  <button 
                    onClick={() => removeItem(item.id)} 
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'color 0.3s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
 
            {/* Guarantees */}
            <div className="cart-guarantees-row">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="feature-icon-box" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--primary)', height: '40px', width: '40px' }}><Truck size={18} /></div>
                <div className="feature-text">
                  <h5 className="feature-title" style={{ fontSize: '10px' }}>Free Express Delivery</h5>
                  <p className="feature-desc-text" style={{ fontSize: '9px' }}>Standard on orders over ₹5000</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="feature-icon-box" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--primary)', height: '40px', width: '40px' }}><ShieldCheck size={18} /></div>
                <div className="feature-text">
                  <h5 className="feature-title" style={{ fontSize: '10px' }}>Secure Encrypted Gateway</h5>
                  <p className="feature-desc-text" style={{ fontSize: '9px' }}>256-bit SSL secure protocol</p>
                </div>
              </div>
            </div>
          </div>
 
          {/* Right: Checkout Order Summary Card */}
          <div className="cart-summary-card">
            <h3 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '24px' }}>
              Order Summary
            </h3>
 
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>
                <span>Subtotal</span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>₹{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#22c55e' }}>
                <span>Discount</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>
                <span>Shipping</span>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
            </div>
 
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <span style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: '#fff' }}>Total Amount</span>
              <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--primary)', fontStyle: 'italic' }}>₹{total.toLocaleString()}</span>
            </div>
 
            <button 
              onClick={handleCheckout} 
              className="btn-primary" 
              style={{ width: '100%', padding: '16px', borderRadius: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              Proceed To Checkout <Lock size={14} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
