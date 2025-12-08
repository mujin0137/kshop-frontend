import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Category } from './pages/Category';
import { AdminProducts } from './pages/AdminProducts';
import './css/App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="category/:categoryName" element={<Category />} />
        <Route path="admin/products" element={<AdminProducts />} />
        {/* Add more routes here later */}
        <Route path="*" element={<div className="not-found">페이지를 찾을 수 없습니다.</div>} />
      </Route>
    </Routes>
  );
}

export default App;
