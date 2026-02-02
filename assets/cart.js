/**
 * La Hime - Cart JavaScript
 * AJAX cart functionality
 */

(function() {
  // Add to cart from product page
  const productForm = document.getElementById('product-form');
  
  if (productForm) {
    productForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitBtn = this.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Adding...';
      
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline mr-2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Added
        `;
        submitBtn.classList.remove('border-black', 'text-black', 'hover:bg-black', 'hover:text-white');
        submitBtn.classList.add('bg-green-500', 'border-green-500', 'text-white');
        
        // Open cart drawer
        setTimeout(() => {
          openCartDrawer();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.add('border-black', 'text-black', 'hover:bg-black', 'hover:text-white');
          submitBtn.classList.remove('bg-green-500', 'border-green-500', 'text-white');
        }, 1000);
      })
      .catch(error => {
        console.error('Error:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        alert('Error adding to cart. Please try again.');
      });
    });
  }
})();
