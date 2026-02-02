import { Product, Stockist } from './types';

export const NAV_ITEMS = [
  { label: 'Shop', path: '/shop' },
  { label: 'Lookbook', path: '/lookbook' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bruised Peach Corset',
    price: 120,
    category: 'Tops',
    image: 'https://picsum.photos/id/64/800/1000',
    hoverImage: 'https://picsum.photos/id/96/800/1000',
    description: 'Structure meets decay. A boned corset featuring hand-dyed gradients mimicking bruised fruit skin.',
    isNew: true,
  },
  {
    id: '2',
    name: 'Distressed Chic Pleated Skirt',
    price: 85,
    category: 'Bottoms',
    image: 'https://picsum.photos/id/177/800/1000',
    hoverImage: 'https://picsum.photos/id/21/800/1000',
    description: 'Classic Gyaru pleats with a grunge twist. Features safety pin hardware and raw, unfinished hems.',
    isNew: true,
  },
  {
    id: '3',
    name: 'Venom Gloss - Black Cherry',
    price: 32,
    category: 'Makeup',
    image: 'https://picsum.photos/id/338/800/1000',
    hoverImage: 'https://picsum.photos/id/223/800/1000',
    description: 'High shine, high toxicity visuals. A deep blackened red gloss that stains.',
  },
  {
    id: '4',
    name: 'Withered Heart Choker',
    price: 45,
    category: 'Accessories',
    image: 'https://picsum.photos/id/433/800/1000',
    hoverImage: 'https://picsum.photos/id/454/800/1000',
    description: 'Vegan leather choker with a resin pendant encapsulating a withered rose petal.',
  },
  {
    id: '5',
    name: 'Gothic Oversized Hoodie',
    price: 150,
    category: 'Tops',
    image: 'https://picsum.photos/id/531/800/1000',
    hoverImage: 'https://picsum.photos/id/325/800/1000',
    description: 'Comfort for the darker days. Heavyweight cotton with stylized broken heart embroidery.',
  },
  {
    id: '6',
    name: 'Cyber Decay Leg Warmers',
    price: 55,
    category: 'Accessories',
    image: 'https://picsum.photos/id/655/800/1000',
    hoverImage: 'https://picsum.photos/id/616/800/1000',
    description: 'Distressed knit leg warmers. Essential for the complete Gyaru silhouette.',
    isNew: true,
  },
];

export const STOCKISTS: Stockist[] = [];
