export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export type CategoryFilter = 'All' | 'Miniskirts' | 'Tops' | 'Sets' | 'Accessories' | 'Shoes';