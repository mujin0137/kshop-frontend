import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import '../css/Login.css';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData);
      // 로그인 성공 시 홈으로 이동
      window.location.href = '/';
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login-container">
      <h1 className="login-title">로그인</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#fee', 
            color: '#c33', 
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input 
            type="email" 
            id="email" 
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input 
            type="password" 
            id="password" 
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <p className="login-footer">
        계정이 없으신가요? <Link to="/register">회원가입</Link>
      </p>
    </div>
  );
};
