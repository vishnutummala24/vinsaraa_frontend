// ALL PRODUCTS MERGED HERE

import { products as productsMain, getProductById as getByIdMain } from "./products";
import { products as productsExtra, getProductById as getByIdExtra } from "./productss";

// Merge both lists safely (avoid duplicates)
export const allProducts = [...productsMain, ...productsExtra];

// Unified function: find product from either file
export const getProductById = (id) => {
  return (
    allProducts.find((p) => p.id === id) ||
    getByIdMain?.(id) ||
    getByIdExtra?.(id) ||
    null
  );
};

// Unified function: get products by category
export const getProductsByCategory = (category) => {
  return allProducts.filter((p) => p.category === category);
};
