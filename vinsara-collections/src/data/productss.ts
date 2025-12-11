export interface Product {
  id: string;
  title: string;
  sku: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  fabric: string;
  color: string;
  washCare: string;
  category: 'sleeved' | 'sleeveless';
  badge?: string;
}

export const products: Product[] = [
  // Sleeved Products
  {
    id: 'sleeved-1',
    title: 'Beige Hand Embroidered Chanderi Dupatta',
    sku: 'VIN-SL-001',
    price: 8500,
    originalPrice: 10000,
    images: [
      'https://i.pinimg.com/736x/39/82/bf/3982bfebdb524d24b494e86a1b64f5b0.jpg',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Pure Chanderi Silk',
    color: 'Beige with Multi-color Embroidery',
    washCare: 'Dry Clean Only',
    category: 'sleeved',
    badge: 'FS'
  },
  {
    id: 'sleeved-2',
    title: 'Lime Yellow Hand Embroidered Organza Dupatta',
    sku: 'VIN-SL-002',
    price: 15500,
    originalPrice: 18000,
    images: [
      'https://i.pinimg.com/474x/3d/0c/6e/3d0c6e2f69b956c80a3ec8943438743a.jpg',
      'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Organza',
    color: 'Lime Yellow with Gold Zari',
    washCare: 'Dry Clean Only',
    category: 'sleeved',
    badge: 'FS'
  },
  {
    id: 'sleeved-3',
    title: 'Teal Embroidered Tissue Dupatta',
    sku: 'VIN-SL-003',
    price: 8000,
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Pure Tissue',
    color: 'Teal with Gold Embroidery',
    washCare: 'Dry Clean Only',
    category: 'sleeved',
    badge: 'FS'
  },
  {
    id: 'sleeved-4',
    title: 'Rose Pink Silk Embroidered Kurta Set',
    sku: 'VIN-SL-004',
    price: 12500,
    originalPrice: 15000,
    images: [
      'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Pure Silk',
    color: 'Rose Pink',
    washCare: 'Dry Clean Only',
    category: 'sleeved',
    badge: 'NEW'
  },
  {
    id: 'sleeved-5',
    title: 'Ivory Chikankari Anarkali Suit',
    sku: 'VIN-SL-005',
    price: 18000,
    images: [
      'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Cotton with Chikankari',
    color: 'Ivory White',
    washCare: 'Hand Wash in Cold Water',
    category: 'sleeved',
    badge: 'FS'
  },
  {
    id: 'sleeved-6',
    title: 'Maroon Velvet Embroidered Kurta',
    sku: 'VIN-SL-006',
    price: 22000,
    originalPrice: 26000,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Velvet',
    color: 'Maroon with Gold Zardozi',
    washCare: 'Dry Clean Only',
    category: 'sleeved',
    badge: 'NEW'
  },
  {
    id: 'sleeved-7',
    title: 'Navy Blue Zardozi Work Sherwani',
    sku: 'VIN-SL-007',
    price: 35000,
    images: [
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=800&fit=crop'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    fabric: 'Raw Silk with Zardozi',
    color: 'Navy Blue',
    washCare: 'Dry Clean Only',
    category: 'sleeved',
    badge: 'FS'
  },
  {
    id: 'sleeved-8',
    title: 'Sage Green Lucknowi Kurta Set',
    sku: 'VIN-SL-008',
    price: 14500,
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fabric: 'Cotton with Lucknowi Work',
    color: 'Sage Green',
    washCare: 'Hand Wash',
    category: 'sleeved',
    badge: 'FS'
  },
  {
    id: 'sleeved-9',
    title: 'Mustard Banarasi Silk Kurta',
    sku: 'VIN-SL-009',
    price: 19500,
    originalPrice: 23000,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop',
      'https://i.pinimg.com/736x/39/82/bf/3982bfebdb524d24b494e86a1b64f5b0.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Banarasi Silk',
    color: 'Mustard Yellow',
    washCare: 'Dry Clean Only',
    category: 'sleeved',
    badge: 'NEW'
  },

  // Sleeveless Products
  {
    id: 'sleeveless-1',
    title: 'Ivory Sleeveless Embroidered Anarkali',
    sku: 'VIN-SL-101',
    price: 24500,
    originalPrice: 28000,
    images: [
      'https://i.pinimg.com/736x/39/82/bf/3982bfebdb524d24b494e86a1b64f5b0.jpg',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Pure Georgette',
    color: 'Ivory with Pearl Work',
    washCare: 'Dry Clean Only',
    category: 'sleeveless',
    badge: 'FS'
  },
  {
    id: 'sleeveless-2',
    title: 'Coral Silk Halter Neck Blouse',
    sku: 'VIN-SL-102',
    price: 9500,
    images: [
      'https://i.pinimg.com/474x/3d/0c/6e/3d0c6e2f69b956c80a3ec8943438743a.jpg',
      'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L'],
    fabric: 'Pure Silk',
    color: 'Coral Pink',
    washCare: 'Dry Clean Only',
    category: 'sleeveless',
    badge: 'NEW'
  },
  {
    id: 'sleeveless-3',
    title: 'Emerald Green Zardozi Lehenga',
    sku: 'VIN-SL-103',
    price: 45000,
    originalPrice: 52000,
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Silk with Zardozi',
    color: 'Emerald Green',
    washCare: 'Dry Clean Only',
    category: 'sleeveless',
    badge: 'FS'
  },
  {
    id: 'sleeveless-4',
    title: 'Champagne Gold Tissue Saree',
    sku: 'VIN-SL-104',
    price: 32000,
    images: [
      'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop'
    ],
    sizes: ['Free Size'],
    fabric: 'Pure Tissue',
    color: 'Champagne Gold',
    washCare: 'Dry Clean Only',
    category: 'sleeveless',
    badge: 'FS'
  },
  {
    id: 'sleeveless-5',
    title: 'Powder Blue Organza Cape Set',
    sku: 'VIN-SL-105',
    price: 28500,
    originalPrice: 32000,
    images: [
      'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Pure Organza',
    color: 'Powder Blue',
    washCare: 'Dry Clean Only',
    category: 'sleeveless',
    badge: 'NEW'
  },
  {
    id: 'sleeveless-6',
    title: 'Wine Velvet Sleeveless Jacket',
    sku: 'VIN-SL-106',
    price: 18000,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Velvet',
    color: 'Wine Red',
    washCare: 'Dry Clean Only',
    category: 'sleeveless',
    badge: 'FS'
  },
  {
    id: 'sleeveless-7',
    title: 'Rust Orange Bandhani Crop Top',
    sku: 'VIN-SL-107',
    price: 7500,
    images: [
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Pure Cotton Bandhani',
    color: 'Rust Orange',
    washCare: 'Hand Wash',
    category: 'sleeveless',
    badge: 'FS'
  },
  {
    id: 'sleeveless-8',
    title: 'Mint Green Mirror Work Choli',
    sku: 'VIN-SL-108',
    price: 11500,
    originalPrice: 13500,
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=800&fit=crop',
      'https://i.pinimg.com/474x/3d/0c/6e/3d0c6e2f69b956c80a3ec8943438743a.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    fabric: 'Silk with Mirror Work',
    color: 'Mint Green',
    washCare: 'Dry Clean Only',
    category: 'sleeveless',
    badge: 'FS'
  },
  {
    id: 'sleeveless-9',
    title: 'Lavender Sequence Bustier',
    sku: 'VIN-SL-109',
    price: 13500,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop',
      'https://i.pinimg.com/736x/39/82/bf/3982bfebdb524d24b494e86a1b64f5b0.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Silk with Sequins',
    color: 'Lavender',
    washCare: 'Dry Clean Only',
    category: 'sleeveless',
    badge: 'FS'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: 'sleeved' | 'sleeveless'): Product[] => {
  return products.filter(product => product.category === category);
};
