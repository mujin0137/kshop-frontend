import api from './api';
import type { Product } from './productService';
export interface ProductRequest {
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  category: string;
}
export const adminService = {
  // 상품 추가
  createProduct: async (request: ProductRequest): Promise<Product> => {
    const response = await api.post('/admin/products', request);
    return response.data;
  },
  // 상품 수정
  updateProduct: async (id: number, request: ProductRequest): Promise<Product> => {
    const response = await api.put(`/admin/products/${id}`, request);
    return response.data;
  },
  // 상품 삭제
  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/admin/products/${id}`);
  },
};
