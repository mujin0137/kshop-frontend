import React from 'react';
import '../../css/Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="flex justify-between footer__content">
          <div>
            <h3 className="footer__heading">고객센터</h3>
            <ul className="footer__list">
              <li>도움말</li>
              <li>반품/환불</li>
              <li>주문배송조회</li>
              <li>문의하기</li>
            </ul>
          </div>
          <div>
            <h3 className="footer__heading">K-SHOP 소개</h3>
            <ul className="footer__list">
              <li>회사소개</li>
              <li>채용정보</li>
              <li>이용약관</li>
              <li>개인정보처리방침</li>
            </ul>
          </div>
          <div>
            <h3 className="footer__heading">SNS</h3>
            <ul className="footer__list">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>YouTube</li>
            </ul>
          </div>
          <div>
            <h3 className="footer__heading">앱 다운로드</h3>
            <div className="footer__app-download"></div>
            <div className="footer__app-download"></div>
          </div>
        </div>
        
        <div className="footer__copyright">
          <p>&copy; 2024 K-SHOP. All rights reserved.</p>
          <p className="footer__copyright-text">서울시 강남구 테헤란로 123 | 사업자등록번호: 123-45-67890</p>
        </div>
      </div>
    </footer>
  );
};
