import React from 'react';
import '../css/Home.css'; // Reusing Home css for container

export const Profile: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: 'var(--spacing-lg)' }}>마이페이지</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
        준비 중인 페이지입니다.
      </p>
    </div>
  );
};
