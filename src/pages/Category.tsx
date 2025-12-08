import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { productService } from '../services/productService';
import type { Product } from '../services/productService';
import '../css/Category.css';

export const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (categoryName) {
      loadProducts(categoryName);
    }
  }, [categoryName]);

  const loadProducts = async (cat: string) => {
    try {
      setLoading(true);
      const data = await productService.getProductsByCategory(cat);
      setProducts(data);
    } catch (err) {
      setError('상품을 불러오는데 실패했습니다');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
        <button onClick={() => categoryName && loadProducts(categoryName)}>다시 시도</button>
      </div>
    );
  }

  return (
    <div className="category">
      <div className="container">
        <h1 className="category__title">{categoryName}</h1>
        <p className="category__count">{products.length}개의 상품</p>
        
        <div className="category__products">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>이 카테고리에 상품이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};
