
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { authService } from '../../services/authService';
import type { UserResponse } from '../../services/authService';
import '../../css/Header.css';

export const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            K-SHOP
          </Link>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li><Link to="/category/electronics">디지털/가전</Link></li>
              <li><Link to="/category/패션/의류">패션/의류</Link></li>
              <li><Link to="/category/리빙/생활">리빙/생활</Link></li>
              <li><Link to="/category/뷰티">뷰티</Link></li>
              <li><Link to="/category/스포츠">스포츠</Link></li>
              {currentUser && currentUser.role === 'ADMIN' && (
                <li><Link to="/admin/products" style={{ color: '#f59e0b' }}>관리자</Link></li>
              )}
            </ul>
          </nav>

          <div className="header__actions">
            {currentUser ? (
              <>
                <div className="header__user">
                  <User size={20} />
                  <span>{currentUser.name}님</span>
                </div>
                <button onClick={handleLogout} className="header__logout">
                  <LogOut size={20} />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="header__login">
                <User size={20} />
                <span>로그인</span>
              </Link>
            )}
            
            <Link to="/cart" className="header__cart">
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="header__cart-badge">{getTotalItems()}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
