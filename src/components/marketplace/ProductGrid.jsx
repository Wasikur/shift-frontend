import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';
import { getStaticProducts } from '../../utils/staticProducts';
import { API_BASE_URL } from '../../config';

const ProductGrid = ({ category, limit, brand, search }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Step 1: Immediately load static JSON — instant render, no blank screen
      const staticData = getStaticProducts(category, search, brand);
      setProducts(limit ? staticData.slice(0, limit) : staticData);
      setUsingFallback(true);
      setLoading(false);

      // Step 2: Silently try to upgrade with live API data
      try {
        let url = `${API_BASE_URL}/api/products`;
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (brand) params.set('brand', brand);
        if (search) params.set('search', search);
        if ([...params].length > 0) url += `?${params.toString()}`;

        const res = await axios.get(url, { timeout: 5000 });
        const liveData = Array.isArray(res.data) ? res.data : [];

        if (liveData.length > 0) {
          setProducts(limit ? liveData.slice(0, limit) : liveData);
          setUsingFallback(false);
        }
      } catch (_err) {
        // Keep showing static data already rendered
      }
    };

    fetchProducts();
  }, [category, limit, brand, search]);

  if (loading) return (
    <div className="grid-loader-container">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (products.length === 0) return (
    <div className="grid-empty-container">
      <h3 className="empty-title">No Products Found</h3>
      <p className="empty-desc text-muted">Try selecting a different category or clearing your filters</p>
    </div>
  );

  return (
    <div>
      {/* {usingFallback && (
        <p className="text-muted" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.5, color:"white" }}>
          Sample catalogue — live inventory syncing soon
        </p>
      )} */}
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
