import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { Product } from '../../services/productService';
import '../../css/ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__image-wrapper">
        <img 
          src={product.image} 
          alt={product.title}
          className="product-card__image"
        />
        {product.isNew && (
          <span className="product-card__badge">NEW</span>
        )}
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        
        <div className="product-card__rating">
          <div className="product-card__stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                color="#fbbf24"
              />
            ))}
          </div>
          <span className="product-card__rating-text">
            ({product.reviewCount?.toLocaleString() || 0})
          </span>
        </div>
        
        <div className="product-card__price-section">
          {product.originalPrice && (
            <span className="product-card__original-price">
              {product.originalPrice.toLocaleString()}원
            </span>
          )}
          <div className="product-card__price">
            {product.price?.toLocaleString() || 0}원
          </div>
        </div>
      </div>
    </Link>
  );
};
