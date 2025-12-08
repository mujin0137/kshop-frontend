import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../css/Cart.css';
export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const handleQuantityChange = (itemId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };
  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <h2>장바구니가 비어있습니다</h2>
          <p>쇼핑을 시작해보세요!</p>
          <Link to="/" className="cart-empty__button">
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="cart">
      <div className="container">
        <h1 className="cart__title">장바구니</h1>
        
        <div className="cart__content">
          <div className="cart__items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.productImage} 
                  alt={item.productTitle} 
                  className="cart-item__image"
                />
                
                <div className="cart-item__info">
                  <h3 className="cart-item__title">{item.productTitle}</h3>
                  <p className="cart-item__price">
                    {item.productPrice?.toLocaleString() || 0}원
                  </p>
                </div>
                <div className="cart-item__quantity">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    className="cart-item__quantity-btn"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="cart-item__quantity-value">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    className="cart-item__quantity-btn"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="cart-item__total">
                  {((item.productPrice || 0) * item.quantity).toLocaleString()}원
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cart-item__remove"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="cart__summary">
            <h2 className="cart__summary-title">주문 요약</h2>
            
            <div className="cart__summary-row">
              <span>상품 금액</span>
              <span>{getTotalPrice().toLocaleString()}원</span>
            </div>
            
            <div className="cart__summary-row">
              <span>배송비</span>
              <span>무료</span>
            </div>
            
            <div className="cart__summary-divider"></div>
            
            <div className="cart__summary-total">
              <span>총 결제 금액</span>
              <span>{getTotalPrice().toLocaleString()}원</span>
            </div>
            <button className="cart__checkout-btn">
              주문하기
            </button>
            <button 
              onClick={clearCart}
              className="cart__clear-btn"
            >
              장바구니 비우기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
