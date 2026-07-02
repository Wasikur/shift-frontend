// Centralised lookup for all static product data
// Used by ProductGrid and ProductDetail as fallback when the API is unavailable

import bikesData from '../data/bikes.json';
import apparelData from '../data/apparel.json';
import accessoriesData from '../data/accessories.json';
import sparesData from '../data/spares.json';

export const ALL_STATIC_PRODUCTS = [
  ...bikesData,
  ...apparelData,
  ...accessoriesData,
  ...sparesData,
];

export const STATIC_BY_CATEGORY = {
  Bikes: bikesData,
  Apparels: apparelData,
  Accessories: accessoriesData,
  Spares: sparesData,
};

/**
 * Find a single product by ID across all static data files.
 * @param {string} id
 * @returns product object or undefined
 */
export const findStaticProductById = (id) => {
  return ALL_STATIC_PRODUCTS.find((p) => p.id === id || p._id === id);
};

/**
 * Get static products for a given category, with optional search + brand filtering.
 * @param {string} category
 * @param {string} searchQuery
 * @param {string} brandFilter
 * @returns array of products
 */
export const getStaticProducts = (category, searchQuery = '', brandFilter = '') => {
  let data = category ? (STATIC_BY_CATEGORY[category] || []) : ALL_STATIC_PRODUCTS;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    data = data.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  if (brandFilter) {
    data = data.filter((p) => p.brand.toLowerCase() === brandFilter.toLowerCase());
  }

  return data;
};
