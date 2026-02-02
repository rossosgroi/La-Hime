/**
 * La Hime - Main Theme JavaScript
 * Handles cart functionality, wishlist, and interactive features
 */

// Cart Drawer Functions
function openCartDrawer(event) {
  if (event) event.preventDefault();
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  
  drawer.classList.remove('translate-x-full');
  overlay.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  
  // Refresh cart contents
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      updateCartDrawer(cart);
    });
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  
  drawer.classList.add('translate-x-full');
  overlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

function updateCartDrawer(cart) {
  // Update cart count
  const countBubble = document.getElementById('cart-count-bubble');
  if (countBubble) {
    countBubble.textContent = cart.item_count;
    if (cart.item_count > 0) {
      countBubble.classList.remove('hidden');
    } else {
      countBubble.classList.add('hidden');
    }
  }
}

function updateCartQuantity(lineIndex, delta) {
  const line = document.querySelector(`[data-line-item="${lineIndex}"]`);
  const currentQty = parseInt(line.querySelector('.text-gray-900').textContent);
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
  });
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
  });
}

// Wishlist Functions (localStorage-based)
function getWishlist() {
  const wishlist = localStorage.getItem('lahime_wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('lahime_wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
}

function toggleWishlist(event, productId) {
  event.preventDefault();
  event.stopPropagation();
  
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  
  saveWishlist(wishlist);
  
  // Update UI
  const btn = event.currentTarget;
  const svg = btn.querySelector('svg path');
  if (index > -1) {
    // Removed from wishlist
    btn.classList.remove('bg-pink-50', 'border-pink-200', 'text-pink-500');
    if (svg) svg.setAttribute('fill', 'none');
  } else {
    // Added to wishlist
    btn.classList.add('bg-pink-50', 'border-pink-200', 'text-pink-500');
    if (svg) svg.setAttribute('fill', 'currentColor');
  }
}

function updateWishlistCount() {
  const wishlist = getWishlist();
  const countElement = document.querySelector('.wishlist-count');
  if (countElement) {
    countElement.textContent = wishlist.length;
    if (wishlist.length > 0) {
      countElement.classList.remove('hidden');
    } else {
      countElement.classList.add('hidden');
    }
  }
}

function openWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  
  drawer.classList.remove('translate-x-full');
  overlay.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  
  // Load wishlist items
  loadWishlistItems();
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  
  drawer.classList.add('translate-x-full');
  overlay.classList.add('hidden');
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
        <p class="text-gray-500 mb-8">Start collecting your favorite looks.</p>
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
    fetch(`/products/${id}.js`).then(r => r.json())
  )).then(products => {
    container.innerHTML = products.map(product => `
      <div class="flex gap-4 items-center border-b border-gray-100 pb-4 mb-4">
        <a href="/products/${product.handle}" class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
          <img src="${product.featured_image}" alt="${product.title}" class="w-full h-full object-cover" />
        </a>
        <div class="flex-1">
          <a href="/products/${product.handle}" class="font-bold text-gray-900 hover:text-pink-600">
            ${product.title}
          </a>
          <p class="text-sm text-gray-500">${(product.price / 100).toFixed(2)} EUR</p>
        </div>
        <button onclick="toggleWishlist(event, ${product.id})" class="text-pink-500 hover:text-red-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    `).join('');
  });
}

// Search Modal Functions
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

// Initialize wishlist UI on page load
document.addEventListener('DOMContentLoaded', function() {
  updateWishlistCount();
  
  // Mark wishlisted products
  const wishlist = getWishlist();
  wishlist.forEach(productId => {
    document.querySelectorAll(`[data-product-id="${productId}"] .wishlist-btn`).forEach(btn => {
      btn.classList.add('bg-pink-50', 'text-pink-500');
      const svg = btn.querySelector('svg path');
      if (svg) svg.setAttribute('fill', 'currentColor');
    });
  });
});
