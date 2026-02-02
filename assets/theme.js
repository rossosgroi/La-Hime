/**
 * Sgroi Fashion - Main Theme JavaScript
 * Handles cart functionality, wishlist, product interactions, and UI features
 */

// ============================================================================
// CART DRAWER FUNCTIONS
// ============================================================================

function openCartDrawer(event) {
  if (event) event.preventDefault();
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  
  if (!drawer) return;
  drawer.classList.remove('translate-x-full');
  if (overlay) overlay.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  
  // Refresh cart contents
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      updateCartDrawer(cart);
    })
    .catch(err => console.error('Cart fetch error:', err));
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  
  if (drawer) drawer.classList.add('translate-x-full');
  if (overlay) overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

function updateCartDrawer(cart) {
  // Update cart count bubble
  const countBubble = document.getElementById('cart-count-bubble');
  if (countBubble) {
    countBubble.textContent = cart.item_count;
    countBubble.classList.toggle('hidden', cart.item_count === 0);
  }
}

function updateCartQuantity(lineIndex, delta) {
  const line = document.querySelector(`[data-line-item="${lineIndex}"]`);
  if (!line) return;
  
  const currentQty = parseInt(line.querySelector('[data-quantity]')?.textContent || 1);
  const newQty = Math.max(1, currentQty + delta);
  
  fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ line: lineIndex, quantity: newQty })
  })
  .then(response => response.json())
  .then(cart => {
    updateCartDrawer(cart);
    openCartDrawer();
  })
  .catch(err => console.error('Cart update error:', err));
}

function removeFromCart(lineIndex) {
  fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ line: lineIndex, quantity: 0 })
  })
  .then(response => response.json())
  .then(cart => {
    updateCartDrawer(cart);
    openCartDrawer();
  })
  .catch(err => console.error('Cart remove error:', err));
}

// ============================================================================
// WISHLIST FUNCTIONS (localStorage-based)
// ============================================================================

function getWishlist() {
  try {
    const wishlist = localStorage.getItem('sgroi_wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (e) {
    console.error('Wishlist parse error:', e);
    return [];
  }
}

function saveWishlist(wishlist) {
  try {
    localStorage.setItem('sgroi_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
  } catch (e) {
    console.error('Wishlist save error:', e);
  }
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function toggleWishlist(event, productId) {
  event?.preventDefault();
  event?.stopPropagation();
  
  let wishlist = getWishlist();
  const index = wishlist.findIndex(id => id == productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  
  saveWishlist(wishlist);
  updateWishlistUIForProduct(productId);
  
  // Show feedback
  const btn = event?.currentTarget;
  if (btn) {
    btn.classList.add('animate-pulse');
    setTimeout(() => btn.classList.remove('animate-pulse'), 600);
  }
}

function updateWishlistUIForProduct(productId) {
  // Update all wishlist buttons for this product
  const buttons = document.querySelectorAll(`[data-product-id="${productId}"].wishlist-toggle`);
  const isWishlisted = isInWishlist(productId);
  
  buttons.forEach(btn => {
    if (isWishlisted) {
      btn.classList.add('bg-pink-50', 'border-pink-500', 'text-pink-500');
      btn.classList.remove('border-gray-200', 'text-gray-900');
      btn.innerHTML = '♥ Saved';
    } else {
      btn.classList.remove('bg-pink-50', 'border-pink-500', 'text-pink-500');
      btn.classList.add('border-gray-200', 'text-gray-900');
      btn.innerHTML = '♡ Add to Wishlist';
    }
  });
}

function updateWishlistCount() {
  const wishlist = getWishlist();
  const countElement = document.querySelector('.wishlist-count');
  if (countElement) {
    countElement.textContent = wishlist.length;
    countElement.classList.toggle('hidden', wishlist.length === 0);
  }
}

function openWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  
  if (!drawer) return;
  drawer.classList.remove('translate-x-full');
  if (overlay) overlay.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  
  loadWishlistItems();
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  
  if (drawer) drawer.classList.add('translate-x-full');
  if (overlay) overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

function loadWishlistItems() {
  const wishlist = getWishlist();
  const container = document.getElementById('wishlist-items');
  
  if (!container) return;
  
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="text-center py-20">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Your wishlist is empty</h3>
        <p class="text-gray-500 mb-8">Start saving your favorite pieces.</p>
        <a href="/collections/all" onclick="closeWishlistDrawer()" class="inline-block bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-pink-500 transition-colors">
          Explore Collection
        </a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = '<div class="text-center py-4 text-gray-500">Loading...</div>';
  
  // Fetch product details for wishlist items
  Promise.all(wishlist.map(id => 
    fetch(`/products.json?limit=1&vendor=${id}`)
      .then(r => r.json())
      .catch(() => null)
  ))
  .then(results => {
    if (!results.some(r => r)) {
      container.innerHTML = '<p class="text-center text-gray-500">Unable to load wishlist items</p>';
      return;
    }
    
    const items = results
      .filter(r => r && r.products && r.products[0])
      .map(r => r.products[0]);
    
    if (items.length === 0) {
      container.innerHTML = '<p class="text-center text-gray-500">Wishlist items not found</p>';
      return;
    }
    
    container.innerHTML = items.map(product => `
      <div class="flex gap-4 items-center border-b border-gray-100 pb-4 mb-4">
        <a href="/products/${product.handle}" class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img src="${product.featured_image.src}" alt="${product.title}" class="w-full h-full object-cover" loading="lazy" />
        </a>
        <div class="flex-1 min-w-0">
          <a href="/products/${product.handle}" class="font-bold text-gray-900 hover:text-pink-600 line-clamp-2">
            ${product.title}
          </a>
          <p class="text-sm text-gray-500 mt-1">${formatMoney(product.price)}</p>
        </div>
        <button onclick="toggleWishlist(event, ${product.id})" class="text-pink-500 hover:text-red-500 flex-shrink-0" title="Remove from wishlist">
          ♥
        </button>
      </div>
    `).join('');
  })
  .catch(err => {
    console.error('Wishlist load error:', err);
    container.innerHTML = '<p class="text-center text-gray-500 py-4">Error loading wishlist</p>';
  });
}

// ============================================================================
// SEARCH MODAL FUNCTIONS
// ============================================================================

function openSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      document.getElementById('search-modal-input')?.focus();
    }, 100);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }
}

// ============================================================================
// PRODUCT PAGE INTERACTIONS
// ============================================================================

function updateMainImage(button) {
  const imageUrl = button.dataset.image;
  const mainImage = document.getElementById('main-product-image');
  if (mainImage) {
    mainImage.src = imageUrl;
  }
  
  // Update active state
  document.querySelectorAll('button[data-image]').forEach(btn => {
    btn.classList.remove('border-black', 'opacity-100');
    btn.classList.add('border-transparent', 'opacity-70');
  });
  button.classList.add('border-black', 'opacity-100');
  button.classList.remove('border-transparent', 'opacity-70');
}

function increaseQuantity() {
  const input = document.getElementById('quantity');
  if (input) {
    input.value = Math.max(1, parseInt(input.value || 1) + 1);
  }
}

function decreaseQuantity() {
  const input = document.getElementById('quantity');
  if (input) {
    input.value = Math.max(1, parseInt(input.value || 1) - 1);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatMoney(cents) {
  if (!cents) return '$0.00';
  return '$' + (cents / 100).toFixed(2);
}

function closeAllDrawers() {
  closeCartDrawer();
  closeWishlistDrawer();
  closeSearchModal();
}

// ============================================================================
// KEYBOARD SHORTCUTS & EVENT LISTENERS
// ============================================================================

document.addEventListener('keydown', function(event) {
  // Close modals with ESC
  if (event.key === 'Escape') {
    closeAllDrawers();
  }
  
  // Open search with CMD/CTRL + K
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault();
    openSearchModal();
  }
});

// Close modals when clicking overlay
document.addEventListener('click', function(event) {
  if (event.target.id === 'cart-drawer-overlay') {
    closeCartDrawer();
  }
  if (event.target.id === 'wishlist-drawer-overlay') {
    closeWishlistDrawer();
  }
  if (event.target.id === 'search-modal') {
    closeSearchModal();
  }
});

// ============================================================================
// PAGE INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize wishlist UI
  updateWishlistCount();
  
  // Mark wishlisted products on page load
  const wishlist = getWishlist();
  wishlist.forEach(productId => {
    updateWishlistUIForProduct(productId);
  });
  
  // Setup wishlist toggle buttons
  document.querySelectorAll('.wishlist-toggle').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const productId = this.dataset.productId;
      if (productId) {
        toggleWishlist(e, productId);
      }
    });
  });
  
  // Setup add to cart forms to show notification
  document.querySelectorAll('#product-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const notification = document.getElementById('add-notification');
      if (notification) {
        notification.classList.remove('hidden');
        setTimeout(() => {
          notification.classList.add('hidden');
        }, 3000);
      }
    });
  });
  
  // Setup variant radio buttons
  document.querySelectorAll('input[name="id"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const selectedVariant = document.getElementById('selected-variant');
      if (selectedVariant) {
        selectedVariant.value = this.value;
      }
    });
  });
});
