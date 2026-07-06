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

export interface ClientPartner {
  id: string;
  name: string;
  sector: string;
  desc: string;
  tag: string;
}

export interface SiteSettings {
  companyName: string;
  ceoName: string;
  establishedYear: string;
  phone: string;
  fax: string;
  email: string;
  address: string;
  businessNumber: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroBadge: string;
  
  // Company Intro
  introTitle: string;
  introText1: string;
  introText2: string;
  introQuote: string;
  introHighlights: { title: string; desc: string }[];
  
  // Partners
  partners: ClientPartner[];
}
