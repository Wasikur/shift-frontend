/**
 * Add a product to the cart stored in localStorage.
 * If an item with the same id + size already exists, its qty is incremented.
 * Dispatches a 'cartUpdated' event so the Navbar badge refreshes instantly.
 *
 * @param {object} product  - The product object (must have _id or id, name, price, images)
 * @param {number} quantity - Number of units to add
 * @param {string} size     - Selected size (empty string if no sizes)
 * @returns {void}
 */
export const addToCart = (product, quantity = 1, size = '') => {
  const productId = product._id || product.id;
  const img = product.images?.[0]?.url || '';

  const stored = localStorage.getItem('cartItems');
  const cartItems = stored ? JSON.parse(stored) : [];

  // Try to find an existing entry for the same product + size
  const existingIndex = cartItems.findIndex(
    (item) => item.id === productId && item.size === size
  );

  if (existingIndex !== -1) {
    cartItems[existingIndex].qty += quantity;
  } else {
    cartItems.push({
      id: productId,
      name: product.name,
      price: product.price,
      size,
      qty: quantity,
      img,
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // Notify Navbar (and any other listeners) that the cart changed
  window.dispatchEvent(new Event('cartUpdated'));
};
