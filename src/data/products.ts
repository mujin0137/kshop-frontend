export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  category: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: '프리미엄 노이즈 캔슬링 헤드폰',
    price: 299000,
    originalPrice: 350000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    rating: 4.8,
    reviewCount: 1240,
    isNew: true,
    category: '디지털/가전'
  },
  {
    id: '2',
    title: '인체공학적 사무용 의자',
    price: 189000,
    originalPrice: 250000,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80',
    rating: 4.5,
    reviewCount: 850,
    category: '리빙/생활'
  },
  {
    id: '3',
    title: '스마트 4K UHD TV 55인치',
    price: 650000,
    originalPrice: 890000,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
    rating: 4.7,
    reviewCount: 3200,
    category: '디지털/가전'
  },
  {
    id: '4',
    title: 'RGB 기계식 게이밍 키보드',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80',
    rating: 4.9,
    reviewCount: 560,
    isNew: true,
    category: '디지털/가전'
  },
  {
    id: '5',
    title: '생수 500ml',
    price: 25000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&q=80',
    rating: 4.3,
    reviewCount: 120,
    category: '리빙/생활'
  },
  {
    id: '6',
    title: '오가닉 코튼 티셔츠 3팩',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    rating: 4.6,
    reviewCount: 890,
    category: '패션/의류'
  },
  {
    id: '7',
    title: '전문가용 DSLR 카메라 키트',
    price: 1450000,
    originalPrice: 1800000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
    rating: 4.9,
    reviewCount: 450,
    category: '디지털/가전'
  },
  {
    id: '8',
    title: '미니멀 우드 데스크 램프',
    price: 55000,
    originalPrice: 70000,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80',
    rating: 4.4,
    reviewCount: 230,
    category: '리빙/생활'
  },
  {
    id: '9',
    title: '수분 촉촉 페이셜 크림',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
    rating: 4.7,
    reviewCount: 450,
    category: '뷰티'
  },
  {
    id: '10',
    title: '요가 매트 프로',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    rating: 4.8,
    reviewCount: 320,
    category: '스포츠'
  },
  {
    id: '11',
    title: '원목 블록 세트',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80',
    rating: 4.9,
    reviewCount: 150,
    category: '완구/취미'
  }
];
