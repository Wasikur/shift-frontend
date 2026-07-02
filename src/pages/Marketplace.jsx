import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/marketplace/ProductGrid';
import { Filter, ChevronDown, Search, X } from 'lucide-react';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentBrand = searchParams.get('brand') || '';
  const currentSearch = searchParams.get('search') || '';
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['Bikes', 'Apparels', 'Accessories', 'Spares'];
  const brands = ['Shift', 'Giant', 'Trek', 'Specialized', 'Shimano', 'RockShox'];

  const setFilter = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="marketplace-section">
      <div className="container">
        {/* Header */}
        <div className="marketplace-header">
          <div className="marketplace-eyebrow">
            <span className="eyebrow-line"></span> Store
          </div>
          <h1 className="marketplace-title">
            {currentCategory || 'Marketplace'}
          </h1>
        </div>

        <div className="marketplace-layout">
          {/* Side Filters (Desktop) */}
          <aside className="sidebar-filters">
             <div className="filter-group">
                <h4 className="filter-title">Categories</h4>
                <div className="filter-options">
                  <button 
                    onClick={() => setFilter('category', '')}
                    className={`filter-btn ${!currentCategory ? 'active' : ''}`}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setFilter('category', cat)}
                      className={`filter-btn ${currentCategory === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
             </div>

             <div className="filter-group">
                <h4 className="filter-title">Brands</h4>
                <div className="filter-options">
                  <button 
                    onClick={() => setFilter('brand', '')}
                    className={`filter-btn ${!currentBrand ? 'active' : ''}`}
                  >
                    All Brands
                  </button>
                  {brands.map(brand => (
                    <button 
                      key={brand}
                      onClick={() => setFilter('brand', brand)}
                      className={`filter-btn ${currentBrand === brand ? 'active' : ''}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
             </div>
          </aside>

          {/* Main Content */}
          <div className="marketplace-main">
            {/* Toolbar */}
            <div className="toolbar">
               <div className="toolbar-left">
                 <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="mobile-filter-trigger">
                    <Filter size={14} /> Filters
                 </button>
                 <span className="toolbar-showing-text">Showing products in {currentCategory || 'All'}</span>
               </div>
               
               <div className="toolbar-search-wrapper">
                 <Search className="search-icon" size={16} />
                 <input 
                   type="text" 
                   placeholder="SEARCH PRODUCTS..." 
                   className="toolbar-search-input"
                   onChange={(e) => setFilter('search', e.target.value)}
                 />
               </div>
            </div>

            {/* Mobile Filters (Overlay) */}
            {isFilterOpen && (
              <div className="mobile-filters-overlay">
                <div className="mobile-filters-header">
                  <h3 className="mobile-filters-title">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="mobile-filters-close"><X size={32} /></button>
                </div>
                
                <div className="mobile-filters-body">
                  <div className="filter-group">
                    <h4 className="filter-title">Categories</h4>
                    <div className="filter-options">
                      <button 
                        onClick={() => { setFilter('category', ''); setIsFilterOpen(false); }}
                        className={`filter-btn ${!currentCategory ? 'active' : ''}`}
                      >
                        All Products
                      </button>
                      {categories.map(cat => (
                        <button 
                          key={cat}
                          onClick={() => { setFilter('category', cat); setIsFilterOpen(false); }}
                          className={`filter-btn ${currentCategory === cat ? 'active' : ''}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group" style={{ marginTop: '2rem' }}>
                    <h4 className="filter-title">Brands</h4>
                    <div className="filter-options">
                      <button 
                        onClick={() => { setFilter('brand', ''); setIsFilterOpen(false); }}
                        className={`filter-btn ${!currentBrand ? 'active' : ''}`}
                      >
                        All Brands
                      </button>
                      {brands.map(brand => (
                        <button 
                          key={brand}
                          onClick={() => { setFilter('brand', brand); setIsFilterOpen(false); }}
                          className={`filter-btn ${currentBrand === brand ? 'active' : ''}`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <ProductGrid category={currentCategory} brand={currentBrand} search={currentSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
