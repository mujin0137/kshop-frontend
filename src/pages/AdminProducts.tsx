import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, X } from 'lucide-react';
import { productService } from '../services/productService';
import { adminService } from '../services/adminService';
import type { ProductRequest } from '../services/adminService';
import type { Product } from '../services/productService';
import '../css/AdminProducts.css';
export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductRequest>({
    title: '',
    price: 0,
    originalPrice: 0,
    image: '',
    rating: 4.5,
    reviewCount: 0,
    isNew: false,
    category: 'electronics',
  });
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
      alert('상품 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        image: product.image,
        rating: product.rating,
        reviewCount: product.reviewCount,
        isNew: product.isNew,
        category: product.category,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        price: 0,
        originalPrice: 0,
        image: '',
        rating: 4.5,
        reviewCount: 0,
        isNew: false,
        category: 'electronics',
      });
    }
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        await adminService.updateProduct(editingProduct.id, formData);
        alert('상품이 수정되었습니다.');
      } else {
        await adminService.createProduct(formData);
        alert('상품이 추가되었습니다.');
      }
      handleCloseModal();
      loadProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('상품 저장에 실패했습니다. 관리자 권한이 있는지 확인해주세요.');
    }
  };
  const handleDelete = async (id: number) => {
    if (!confirm('정말 이 상품을 삭제하시겠습니까?')) {
      return;
    }
    try {
      await adminService.deleteProduct(id);
      alert('상품이 삭제되었습니다.');
      loadProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('상품 삭제에 실패했습니다. 관리자 권한이 있는지 확인해주세요.');
    }
  };
  if (loading) {
    return (
      <div className="admin-loading">
        <p>상품 목록을 불러오는 중...</p>
      </div>
    );
  }
  return (
    <div className="admin-products">
      <div className="container">
        <div className="admin-products__header">
          <h1>상품 관리</h1>
          <button onClick={() => handleOpenModal()} className="admin-products__add-btn">
            <Plus size={20} />
            상품 추가
          </button>
        </div>
        <div className="admin-products__table-container">
          <table className="admin-products__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>이미지</th>
                <th>제목</th>
                <th>가격</th>
                <th>카테고리</th>
                <th>평점</th>
                <th>NEW</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img src={product.image} alt={product.title} className="admin-products__thumbnail" />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price.toLocaleString()}원</td>
                  <td>{product.category}</td>
                  <td>{product.rating}</td>
                  <td>{product.isNew ? '✓' : ''}</td>
                  <td>
                    <div className="admin-products__actions">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="admin-products__edit-btn"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="admin-products__delete-btn"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="admin-modal">
            <div className="admin-modal__overlay" onClick={handleCloseModal}></div>
            <div className="admin-modal__content">
              <div className="admin-modal__header">
                <h2>{editingProduct ? '상품 수정' : '상품 추가'}</h2>
                <button onClick={handleCloseModal} className="admin-modal__close">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form__field">
                  <label>제목</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form__row">
                  <div className="admin-form__field">
                    <label>가격</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="admin-form__field">
                    <label>원가</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="admin-form__field">
                  <label>이미지 URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form__row">
                  <div className="admin-form__field">
                    <label>평점</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="admin-form__field">
                    <label>리뷰 수</label>
                    <input
                      type="number"
                      value={formData.reviewCount}
                      onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="admin-form__field">
                  <label>카테고리</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="electronics">디지털/가전</option>
                    <option value="fashion">패션/의류</option>
                    <option value="living">리빙/생활</option>
                    <option value="beauty">뷰티</option>
                    <option value="sports">스포츠</option>
                  </select>
                </div>
                <div className="admin-form__checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isNew}
                      onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    />
                    신상품
                  </label>
                </div>
                <div className="admin-form__actions">
                  <button type="button" onClick={handleCloseModal} className="admin-form__cancel">
                    취소
                  </button>
                  <button type="submit" className="admin-form__submit">
                    {editingProduct ? '수정' : '추가'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
