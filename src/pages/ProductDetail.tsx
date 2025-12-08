import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productService } from '../services/productService';
import type { Product } from '../services/productService';
import '../css/ProductDetail.css';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    try {
      setLoading(true);
      const data = await productService.getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError('상품을 불러오는데 실패했습니다');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      await addToCart({
        productId: product.id,
        productTitle: product.title,
        productPrice: product.price,
        productImage: product.image,
        quantity: quantity,
      });
      alert('장바구니에 추가되었습니다!');
    }
  };

  const handleBuyNow = async () => {
    if (product) {
      await addToCart({
        productId: product.id,
        productTitle: product.title,
        productPrice: product.price,
        productImage: product.image,
        quantity: quantity,
      });
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
        <p>상품을 불러오는 중...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'red' }}>{error || '상품을 찾을 수 없습니다'}</p>
        <button onClick={() => navigate('/')}>홈으로 돌아가기</button>
      </div>
    );
  }

  const images = [product.image];

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail__content">
          <div className="product-detail__gallery">
            <div className="product-detail__main-image">
              <img src={images[selectedImage]} alt={product.title} />
            </div>
          </div>

          <div className="product-detail__info">
            {product.isNew && (
              <span className="product-detail__badge">NEW</span>
            )}
            
            <h1 className="product-detail__title">{product.title}</h1>
            
            <div className="product-detail__rating">
              <div className="product-detail__stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                    color="#fbbf24"
                  />
                ))}
              </div>
              <span className="product-detail__rating-text">
                {product.rating} ({product.reviewCount.toLocaleString()}개 리뷰)
              </span>
            </div>

            <div className="product-detail__price-section">
              {product.originalPrice && (
                <span className="product-detail__original-price">
                  {product.originalPrice.toLocaleString()}원
                </span>
              )}
              <div className="product-detail__price">
                {product.price.toLocaleString()}원
              </div>
              {product.originalPrice && (
                <span className="product-detail__discount">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% 할인
                </span>
              )}
            </div>

            <div className="product-detail__divider"></div>

            <div className="product-detail__description">
              <h3>상품 설명</h3>
              <p>고품질의 {product.title}입니다. {product.category} 카테고리의 인기 상품으로, 많은 고객들의 사랑을 받고 있습니다.</p>
            </div>

            <div className="product-detail__quantity">
              <label>수량</label>
              <div className="product-detail__quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="product-detail__quantity-btn"
                >
                  -
                </button>
                <span className="product-detail__quantity-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="product-detail__quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-detail__actions">
              <button
                onClick={handleAddToCart}
                className="product-detail__add-to-cart"
              >
                <ShoppingCart size={20} />
                장바구니 담기
              </button>
              <button
                onClick={handleBuyNow}
                className="product-detail__buy-now"
              >
                바로 구매
              </button>
              <button className="product-detail__wishlist">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
