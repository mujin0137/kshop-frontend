import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';
import '../../css/Layout.css';

export const Layout: React.FC = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
