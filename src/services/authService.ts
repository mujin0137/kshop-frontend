import api from './api';

export interface SignupData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  phone: string | null;
  address: string | null;
  role: string;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  user: UserResponse;
}

export const authService = {
  // 회원가입
  signup: async (data: SignupData): Promise<UserResponse> => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  // 로그인
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', data);
    // 토큰 저장
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // 현재 사용자 정보
  getCurrentUser: (): UserResponse | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
