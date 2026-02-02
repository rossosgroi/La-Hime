# La Hime - Shopify Theme

A complete 1:1 conversion of the La Hime React/TypeScript website to a Shopify Liquid theme. This theme brings the "Sweet & Spicy" aesthetic of modern Tokyo-Shanghai fusion fashion to Shopify.

## 🌸 Features

### Design & Aesthetics
- **Y2K Aesthetic**: Soft pastels, floating stars, and playful animations
- **Gradient Backgrounds**: Dynamic pink, purple, and blue gradients
- **Modern Typography**: Pacifico for branding, Playfair Display for headers, Inter for body
- **Responsive Design**: Fully mobile-optimized with Tailwind CSS
- **Product Hover Effects**: Second image reveals on hover
- **Polaroid-style Product Cards**: Unique presentation style

### Functionality
- **AJAX Cart Drawer**: Slide-out cart with real-time updates
- **Wishlist System**: Client-side wishlist using localStorage
- **Product Quick View**: Quick actions on product cards
- **Advanced Search**: Predictive search with live results
- **Collection Filtering**: Filter by tags and product types
- **Sorting Options**: Multiple sort options (price, date, name, etc.)
- **Customer Accounts**: Full account management with order history
- **Newsletter Integration**: Email capture with success states

### Pages Included
1. **Homepage** (index.liquid)
   - Hero section with floating Y2K stars
   - Featured products collection
   - Aesthetic banner with image
   - Newsletter signup

2. **Collection/Shop** (collection.liquid)
   - Sticky filter bar
   - Tag-based filtering
   - Sort options
   - Grid layout (1-4 columns)

3. **Product Detail** (product.liquid)
   - Image gallery with thumbnails
   - Size selection
   - Add to cart & Buy now
   - Wishlist toggle
   - Share functionality
   - Shipping & returns info

4. **Cart** (cart.liquid)
   - Full cart page
   - Quantity adjustment
   - Item removal
   - Order summary
   - Shipping calculator

5. **Customer Pages**
   - Login (customers/login.liquid)
   - Register (customers/register.liquid)
   - Account (customers/account.liquid)
   - Order history
   - Address management

6. **Static Pages**
   - About (page.about.liquid)
   - Contact (page.contact.liquid)
   - Generic page template

### Sections
- `header.liquid` - Main navigation with search, cart, wishlist, account
- `footer.liquid` - Footer with social links and menu
- `hero-home.liquid` - Homepage hero with animations
- `featured-collection.liquid` - Product grid from collection
- `banner-aesthetic.liquid` - Image/text banner
- `newsletter.liquid` - Email capture form

### Snippets
- `product-card.liquid` - Reusable product card component
- `cart-drawer.liquid` - AJAX cart sidebar
- `wishlist-drawer.liquid` - Wishlist sidebar
- `search-modal.liquid` - Search overlay
- `pagination.liquid` - Collection pagination

## 📦 Installation

1. **Download the Theme**
   - Zip the entire `shopify_lahime` folder

2. **Upload to Shopify**
   - Go to Shopify Admin → Online Store → Themes
   - Click "Upload theme"
   - Select the zipped folder
   - Click "Upload"

3. **Customize**
   - Click "Customize" to access the theme editor
   - Configure logo, colors, and settings
   - Add your products and collections

## ⚙️ Configuration

### Theme Settings
Access via Theme Editor → Theme Settings:

- **Colors**: Primary, secondary, and accent colors
- **Typography**: Font selections for headings and body
- **Logo**: Upload logo and favicon
- **Cart**: Enable/disable cart drawer
- **Product Grid**: Items per row settings
- **Social Media**: Add social media links

### Navigation
Create a menu named "main-menu" for the header navigation:
- Admin → Navigation → Menus → Add menu
- Name it "main-menu"
- Add links (Home, Shop, About, Contact, etc.)

### Collections
Tag products for filtering:
- Use tags like "Miniskirts", "Tops", "Sets", "Accessories", "Shoes"
- Tag new products with "new" or "New"
- Products on sale will automatically show sale badge

## 🎨 Customization

### Colors
Edit in Theme Settings or directly in CSS:
- Primary: `#ec4899` (Pink 500)
- Secondary: `#000000` (Black)
- Accent: `#f472b6` (Pink 400)

### Fonts
Default fonts loaded from Google Fonts:
- Pacifico (Brand/Logo)
- Playfair Display (Headings)
- Inter (Body text)

### Layout
Modify section settings in Theme Editor:
- Hero text and buttons
- Featured collection selection
- Banner images and text
- Newsletter copy

## 🛠️ Development

### File Structure
```
shopify_lahime/
├── assets/           # CSS, JS, and static files
├── config/           # Theme settings schema
├── layout/           # Base theme.liquid layout
├── locales/          # Translation files
├── sections/         # Reusable theme sections
├── snippets/         # Reusable components
└── templates/        # Page templates
    └── customers/    # Customer account templates
```

### JavaScript Functions
Main functions in `assets/theme.js`:
- `openCartDrawer()` - Opens cart sidebar
- `toggleWishlist(event, productId)` - Add/remove from wishlist
- `updateCartQuantity(lineIndex, delta)` - Adjust cart item quantity
- `removeFromCart(lineIndex)` - Remove item from cart

### Liquid Objects Used
- `shop` - Store information
- `cart` - Current cart state
- `customer` - Logged-in customer data
- `product` - Product details
- `collection` - Collection details
- `page` - Static page content

## 🔧 Troubleshooting

### Cart not updating
- Check that JavaScript files are loading
- Ensure AJAX cart is enabled in theme settings

### Images not showing
- Verify image URLs are correct
- Check Shopify file upload limits

### Styling issues
- Clear browser cache
- Check that Tailwind CDN is loading
- Verify custom CSS files are linked

## 📱 Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance
- Lazy loading images
- Minified CSS/JS (for production)
- Optimized Liquid code
- CDN-hosted fonts and libraries

## 📄 License
© 2026 La Hime Studios. All rights reserved.

## 🤝 Support
For support, email: support@lahime.com

## 🎨 Credits
- Original Design: La Hime Studios
- Shopify Conversion: Professional Theme Developer
- Icons: Lucide React (converted to SVG)
- Fonts: Google Fonts (Pacifico, Playfair Display, Inter)
- CSS Framework: Tailwind CSS

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Shopify Compatible**: 2.0+
