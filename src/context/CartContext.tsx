import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import type { Cart, CartItem } from '../services/cartService';
import { authService } from '../services/authService';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  // 로그인 상태 확인 및 장바구니 로드
  useEffect(() => {
    const loadCart = async () => {
      const user = authService.getCurrentUser();
      if (user) {
        try {
          const cartData = await cartService.getCart();
          setCart(cartData);
        } catch (error) {
          console.error('Failed to load cart:', error);
          setCart({ id: 0, items: [], totalPrice: 0 });
        }
      } else {
        setCart({ id: 0, items: [], totalPrice: 0 });
      }
    };

    loadCart();
  }, []);

  const addToCart = async (item: Omit<CartItem, 'id'>) => {
    try {
      const updatedCart = await cartService.addToCart({
        productId: item.productId,
        quantity: item.quantity,
      });
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('장바구니에 추가하려면 로그인이 필요합니다.');
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const updatedCart = await cartService.removeCartItem(itemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      const updatedCart = await cartService.updateCartItem(itemId, { quantity });
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart({ id: cart?.id || 0, items: [], totalPrice: 0 });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cart?.totalPrice || 0;
  };

  const getTotalItems = () => {
    return cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  return (
    <CartContext.Provider
      value={{
        items: cart?.items || [],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
