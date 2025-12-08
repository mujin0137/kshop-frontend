import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { productService } from '../services/productService';
import type { Product } from '../services/productService';
import '../css/Home.css';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('상품을 불러오는데 실패했습니다');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: '디지털/가전', slug: 'electronics', icon: '💻' },
    { name: '패션/의류', slug: 'fashion', icon: '👕' },
    { name: '리빙/생활', slug: 'living', icon: '🏠' },
    { name: '뷰티', slug: 'beauty', icon: '💄' },
    { name: '스포츠', slug: 'sports', icon: '⚽' },
  ];

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
        <p>상품을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={loadProducts}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-content">
            <div className="home-hero-text">
              <h1 className="home-hero-title">여름 정기 세일</h1>
              <h2 className="home-hero-subtitle">최대 50% 할인</h2>
              <p className="home-hero-description">
                전자제품, 패션, 생활용품 등 최고의 딜을 만나보세요.
              </p>
              <button className="home-hero-button">
                쇼핑하기 →
              </button>
            </div>
            <div className="home-hero-image">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80" 
                alt="Summer Sale" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-categories">
        <div className="container">
          <h2 className="home-section-title">카테고리별 쇼핑</h2>
          <div className="home-category-grid">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/category/${category.slug}`} 
                className="home-category-card"
              >
                <span className="home-category-icon">{category.icon}</span>
                <h3 className="home-category-name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-featured">
        <div className="container">
          <div className="home-section-header">
            <h2 className="home-section-title">오늘의 특가</h2>
            <Link to="/category/전체" className="home-view-all">
              전체보기 →
            </Link>
          </div>
          <div className="home-product-grid">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
