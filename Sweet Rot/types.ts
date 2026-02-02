export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Tops' | 'Bottoms' | 'Accessories' | 'Makeup' | 'Full Looks';
  image: string;
  hoverImage: string;
  description: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  cartId: string; // unique id for the cart entry (product id + size)
  selectedSize: string;
  quantity: number;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Stockist {
  city: string;
  name: string;
  address: string;
  coordinates: { x: number; y: number }; // Percentage for map placement
}