import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";

export interface Product {
  id: string;
  sku: string;
  title: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  fabric: string;
  color: string;
  washCare: string;
  description?: string;
  category: string;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    sku: "TEHVD-S",
    title: "Teal Hand Embroidered Velvet Dress",
    price: 19080,
    originalPrice: 23850,
    images: [product1, product1, product1],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Velvet with Hand Embroidery",
    color: "Teal Green",
    washCare: "Dry clean only",
    description: "A stunning teal velvet dress featuring intricate hand embroidery. Perfect for festive occasions and celebrations.",
    category: "Dresses",
    isNew: true
  },
  {
    id: "2",
    sku: "WHVD-S",
    title: "Wine Hand Embroidered Velvet Dress",
    price: 17490,
    originalPrice: 21860,
    images: [product2, product2, product2],
    sizes: ["XS", "S/M", "L/XL"],
    fabric: "Velvet with Hand Embroidery",
    color: "Wine Burgundy",
    washCare: "Dry clean only",
    description: "Elegant wine-colored velvet dress with delicate hand embroidery. A timeless piece for special occasions.",
    category: "Dresses",
    isNew: true
  },
  {
    id: "3",
    sku: "NTJCS-S",
    title: "Navy Tissue Jacket With Cotton Slip",
    price: 20860,
    originalPrice: 26075,
    images: [product3, product3, product3],
    sizes: ["S/M", "L/XL"],
    fabric: "Tissue Silk with Cotton",
    color: "Navy Blue",
    washCare: "Handwash separately",
    description: "Contemporary navy tissue jacket paired with a comfortable cotton slip. Versatile styling for modern occasions.",
    category: "Jackets",
    isNew: true
  },
  {
    id: "4",
    sku: "MTJCS-S",
    title: "Mustard Tissue Jacket With Cotton Slip",
    price: 20860,
    originalPrice: 26075,
    images: [product4, product4, product4],
    sizes: ["S/M", "L/XL"],
    fabric: "Tissue Silk with Cotton",
    color: "Mustard Yellow",
    washCare: "Handwash separately",
    description: "Vibrant mustard tissue jacket with cotton slip. Perfect for adding a pop of color to your ethnic wardrobe.",
    category: "Jackets",
    isNew: true
  },
  {
    id: "5",
    sku: "BHECD-FS",
    title: "Beige Hand Embroidered Chanderi Dupatta",
    price: 8500,
    originalPrice: 10625,
    images: [product5, product5, product5],
    sizes: ["FS"],
    fabric: "Chanderi Silk",
    color: "Beige/Ivory",
    washCare: "Dry clean recommended",
    description: "Exquisite hand embroidered chanderi dupatta in elegant beige. A versatile accessory for any ethnic ensemble.",
    category: "Dupattas",
    isNew: true
  },
  {
    id: "6",
    sku: "ESEA-S",
    title: "Emerald Silk Embroidered Anarkali",
    price: 24500,
    originalPrice: 30625,
    images: [product1, product1, product1],
    sizes: ["S", "M", "L"],
    fabric: "Pure Silk with Embroidery",
    color: "Emerald Green",
    washCare: "Dry clean only",
    description: "Regal emerald silk anarkali with intricate embroidery. A statement piece for grand celebrations.",
    category: "Anarkalis",
    isNew: false
  },
  {
    id: "7",
    sku: "BVKS-S",
    title: "Burgundy Velvet Kurta Set",
    price: 18990,
    originalPrice: 23740,
    images: [product2, product2, product2],
    sizes: ["XS", "S", "M", "L"],
    fabric: "Velvet",
    color: "Burgundy",
    washCare: "Dry clean only",
    description: "Luxurious burgundy velvet kurta set. Timeless elegance for festive occasions.",
    category: "Kurta Sets",
    isNew: false
  },
  {
    id: "8",
    sku: "ICSD-S",
    title: "Indigo Chanderi Silk Dress",
    price: 15680,
    originalPrice: 19600,
    images: [product3, product3, product3],
    sizes: ["S/M", "L/XL"],
    fabric: "Chanderi Silk",
    color: "Indigo",
    washCare: "Handwash separately",
    description: "Beautiful indigo chanderi silk dress with traditional motifs. Perfect blend of comfort and style.",
    category: "Dresses",
    isNew: false
  },
  {
    id: "9",
    sku: "GTPS-S",
    title: "Golden Tissue Palazzo Set",
    price: 22340,
    originalPrice: 27925,
    images: [product4, product4, product4],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Tissue with Palazzo",
    color: "Golden",
    washCare: "Dry clean recommended",
    description: "Glamorous golden tissue palazzo set. Make a statement at every celebration.",
    category: "Palazzo Sets",
    isNew: false
  },
  {
    id: "10",
    sku: "IED-FS",
    title: "Ivory Embroidered Dupatta",
    price: 7200,
    originalPrice: 9000,
    images: [product5, product5, product5],
    sizes: ["FS"],
    fabric: "Cotton Silk",
    color: "Ivory",
    washCare: "Handwash separately",
    description: "Elegant ivory dupatta with delicate embroidery. A versatile piece for any occasion.",
    category: "Dupattas",
    isNew: false
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getAllProducts = (): Product[] => {
  return products;
};