import api from './api';

export interface CartItem {
  id: number;
  productId: number;
  productTitle: string;
  productPrice: number;
  productImage: string;
  quantity: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalPrice: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export const cartService = {
  // 장바구니 조회
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/cart');
    return response.data;
  },

  // 장바구니에 상품 추가
  addToCart: async (request: AddToCartRequest): Promise<Cart> => {
    const response = await api.post('/cart/items', request);
    return response.data;
  },

  // 장바구니 아이템 수량 변경
  updateCartItem: async (itemId: number, request: UpdateCartItemRequest): Promise<Cart> => {
    const response = await api.put(`/cart/items/${itemId}`, request);
    return response.data;
  },

  // 장바구니 아이템 삭제
  removeCartItem: async (itemId: number): Promise<Cart> => {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data;
  },

  // 장바구니 비우기
  clearCart: async (): Promise<void> => {
    await api.delete('/cart');
  },
};
