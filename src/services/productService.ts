import api from './api';

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number | null;
  image: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const productService = {
  // 모든 상품 조회
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  // 상품 상세 조회
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // 카테고리별 상품 조회
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${encodeURIComponent(category)}`);
    return response.data;
  },

  // 신상품 조회
  getNewProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products/new');
    return response.data;
  },
};
