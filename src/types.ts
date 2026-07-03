export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  images?: string[]; // 여러개 이미지 리스트
  duration: string; // 제작기간
  size: string; // 규격
  temperature: string; // 사용온도
  features: string[]; // 특징
  description: string; // 설명
  createdAt: number;
}

export interface Inquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  furnaceType: string;
  temperatureRequired: string;
  message: string;
  status: 'pending' | 'completed';
  createdAt: number;
}
