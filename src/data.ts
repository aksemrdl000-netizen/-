import { PortfolioItem, Inquiry, SiteSettings } from './types';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'NSK 공급장치 신규 제작설치',
    category: '맞춤 제작',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    duration: '협의 후 진행',
    size: '주문 규격',
    temperature: '상온 가동',
    features: ['정밀 제어', '고속 공급', '내구성 확보'],
    description: '광성산업의 고정밀 제어 기술과 축적된 노하우를 바탕으로 신규 설계 및 맞춤 제작하여 현장 설치를 완수했습니다.',
    createdAt: 1720023400000
  },
  {
    id: 'port-2',
    title: '베어링아트 공급장치 신규 제작설치',
    category: '맞춤 제작',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    duration: '협의 후 진행',
    size: '주문 규격',
    temperature: '상온 가동',
    features: ['자동 공급', '안정성 최적화', '시스템 연동'],
    description: '베어링 가공 공정의 생산성 향상을 위해 맞춤형 공급장치를 신규 설계 및 현장 제작하여 안전하게 연동 및 설치를 마쳤습니다.',
    createdAt: 1720023410000
  },
  {
    id: 'port-3',
    title: '베어링아트 공급장치 신규 제작설치',
    category: '맞춤 제작',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    duration: '협의 후 진행',
    size: '주문 규격',
    temperature: '상온 가동',
    features: ['고품질 자재', '안전 시스템', '공정 고도화'],
    description: '추가 증설된 라인에 맞춰 최신 정밀 사양의 공급장치를 추가로 신규 제작 및 완벽하게 현장 설치하여 시운전을 완료했습니다.',
    createdAt: 1720023420000
  },
  {
    id: 'port-4',
    title: '진합 소려로 OVERHAUL',
    category: '대형 산업로',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    duration: '협의 후 진행',
    size: '대형 설비',
    temperature: '고온 오버홀',
    features: ['성능 복원', '단열 보강', '수명 연장'],
    description: '소려로 설비의 전반적인 노후 부품 교체, 단열재 보강 및 정밀 구조 제어 시스템 조율을 통해 신품급 효율로 성능을 완벽히 복원하였습니다.',
    createdAt: 1720023430000
  },
  {
    id: 'port-5',
    title: '티아이씨 연속로 축로 보수 외',
    category: '대형 산업로',
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&q=80&w=800',
    duration: '협의 후 진행',
    size: '대형 설비',
    temperature: '초고온 연속로',
    features: ['축로 내화물 교체', '열효율 개선', '긴급 보수'],
    description: 'TIC 대형 연속 열처리로의 마모 및 손상된 특수 내화 벽돌(축로) 부위를 정밀 철거 및 재시공하고, 연관 설비 전반을 무결점으로 정비 완료했습니다.',
    createdAt: 1720023440000
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    companyName: '삼우중공업 (정비 샘플)',
    contactPerson: '김민수 부장',
    phone: '010-1234-5678',
    email: 'ms.kim@samwoo-h.com',
    furnaceType: '대형 카타입 가스열처리로 노체 보수 및 버너 점검',
    temperatureRequired: '상용 950℃ / 최대 1,100℃',
    message: '공장에서 수년부터 상용 운전 중인 SR 소둔용 대형 가스 카타입 열처리로입니다. 최근 단열재 이탈 현상이 발생하고 있으며, 로 내부 온도 편차가 15℃ 이상 벌어지는 문제가 있어 무상 현장 정밀 실사 및 정비 견적 요청드립니다. 가급적 가동 중단 일정을 최소화하여 공사를 진행하고 싶습니다.',
    status: 'pending',
    createdAt: 1720023450000
  }
];

// Local Storage Keys
const PORTFOLIO_KEY = 'furnace_app_portfolio_items';
const INQUIRY_KEY = 'furnace_app_customer_inquiries';
const PORTFOLIO_VERSION_KEY = 'furnace_app_portfolio_version';
const CURRENT_VERSION = 'v5'; // Bump version to force reset of local storage so everyone sees updated static list

export function getStoredPortfolio(): PortfolioItem[] {
  if (typeof window === 'undefined') return INITIAL_PORTFOLIO;
  try {
    const version = localStorage.getItem(PORTFOLIO_VERSION_KEY);
    if (version !== CURRENT_VERSION) {
      localStorage.setItem(PORTFOLIO_VERSION_KEY, CURRENT_VERSION);
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(INITIAL_PORTFOLIO));
      return INITIAL_PORTFOLIO;
    }

    const stored = localStorage.getItem(PORTFOLIO_KEY);
    if (!stored) {
      try {
        localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(INITIAL_PORTFOLIO));
      } catch (err) {
        console.warn('localStorage is disabled or blocked:', err);
      }
      return INITIAL_PORTFOLIO;
    }
    const parsed: PortfolioItem[] = JSON.parse(stored);
    
    // Auto-merge any new default items from INITIAL_PORTFOLIO that are not in localStorage
    let hasUpdates = false;
    const merged = [...parsed];
    INITIAL_PORTFOLIO.forEach((defaultItem) => {
      if (!merged.some((item) => item.id === defaultItem.id)) {
        merged.push(defaultItem);
        hasUpdates = true;
      }
    });
    
    if (hasUpdates) {
      try {
        localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(merged));
      } catch (err) {
        console.warn('Failed to save merged portfolio to localStorage:', err);
      }
    }
    return merged;
  } catch (e) {
    console.warn('Failed to load portfolio from localStorage, falling back to initial:', e);
    return INITIAL_PORTFOLIO;
  }
}

export function savePortfolio(items: PortfolioItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save portfolio to localStorage:', e);
  }
}

export function getStoredInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return INITIAL_INQUIRIES;
  try {
    const stored = localStorage.getItem(INQUIRY_KEY);
    if (!stored) {
      try {
        localStorage.setItem(INQUIRY_KEY, JSON.stringify(INITIAL_INQUIRIES));
      } catch (err) {
        console.warn('localStorage is disabled or blocked:', err);
      }
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.warn('Failed to load inquiries from localStorage, falling back to initial:', e);
    return INITIAL_INQUIRIES;
  }
}

export function saveInquiries(inquiries: Inquiry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(INQUIRY_KEY, JSON.stringify(inquiries));
  } catch (e) {
    console.warn('Failed to save inquiries to localStorage:', e);
  }
}

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: '광성산업',
  ceoName: '이희열',
  establishedYear: '1988',
  phone: '031-497-7671', // 직통번호 031-497-7671
  fax: '031-496-0394',
  email: 'LHY3394@NAVER.COM',
  address: '경기도 안산시 단원구 성곡동 779-15번지 광성산업',
  businessNumber: '140-04-58486',
  
  heroTitle: '열처리로 보수, 개조 및 신설비 설계·제작 전문',
  heroSubtitle: '기존 노후 설비 보수·개조부터 부품 교체, 단열 보강 및 고효율 신설비 맞춤형 설계·제작까지 완벽 시공',
  heroImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80',
  heroBadge: '열처리로 보수·개조 및 고성능 신설비 설계·제작전문기업',
  
  introTitle: '왜 수많은 기업들이 광성산업에 보수·개조 및 신설설비 제작을 맡길까요?',
  introText1: '산업용 열처리로는 정밀한 단열 설계와 고온 가온 및 정확한 제어가 필수적인 고품격 설비입니다. 광성산업은 다년간 축적된 정밀 엔지니어링 기술로 기존 노후 노를 완전히 복원·개조하는 것은 물론, 고객사의 생산 효율을 최대화하기 위한 고성능 신규 열처리로 설비를 맞춤 설계 및 신설 제작해 드립니다.',
  introText2: '우리는 대형 산업로, 카타입로, 맞춤형 분위기로의 수리·보수 실적과 신규 설계 역량을 바탕으로 어떤 제조사의 로든 완벽하게 진단하고 신설 제작 및 영구 보수를 보장합니다.',
  introQuote: '단순히 부품을 교환하거나 땜질식 처방을 하는 정비가 아닙니다. 단열재 보강, 열량 연산, PID 제어 및 신설비 설계 능력까지 고루 갖추어야 완벽한 생산 효율을 이끌어낼 수 있습니다.',
  introHighlights: [
    {
      title: '노후 설비 성능 개조 및 신설 설비 제작',
      desc: '세라믹 단열 보강, 고효율 발열체 교체, 최신 제어계측 개조뿐만 아니라 고객사 요구 규격에 최적화된 신설비를 완벽 맞춤 설계 및 제작합니다.'
    },
    {
      title: '철저한 현장 보수 및 기술 점검 시스템',
      desc: '돌발 장애 및 온도 편차 발생 시, 다년간의 현장 엔지니어링 실력을 바탕으로 신속하고 책임감 있는 점검 및 복구 서비스를 제공합니다.'
    }
  ],
  
  partners: [
    {
      id: 'part-1',
      name: '주식회사 티아이씨 (TIC)',
      sector: '정밀 감속기 & 열처리',
      desc: '차량용 정밀 감속기, 공작기계 기어 및 열처리 가공 전문 제조 대기업',
      tag: '자동차 부품'
    },
    {
      id: 'part-2',
      name: '주식회사 진합',
      sector: '글로벌 패스너 전문',
      desc: '세계적 수준의 자동차용 패스너 및 정밀 냉간단조 부품 제조 글로벌 리더',
      tag: '정밀 포징'
    },
    {
      id: 'part-3',
      name: '주식회사 선일다이파스',
      sector: '고장력 자동차 볼트',
      desc: '현대·기아 핵심 파트너로서 고장력 볼트 및 냉간 압조 특수 체결 부품 생산 기업',
      tag: '체결 부품'
    },
    {
      id: 'part-4',
      name: '주식회사 베어링아트',
      sector: '일진그룹 초정밀 베어링',
      desc: '최상의 안정성을 요구하는 프리미엄 차량 및 산업설비 초정밀 베어링 가공 전문 기업',
      tag: '정밀 베어링'
    },
    {
      id: 'part-5',
      name: '주식회사 NSK',
      sector: '글로벌 정밀 기계 부품',
      desc: '초정밀 베어링 및 자동차 조향장치 솔루션 분야의 세계적 기술 선두 주자 (한국NSK)',
      tag: '글로벌 스탠다드'
    },
    {
      id: 'part-6',
      name: '주식회사 제이엔드에프 (J&F)',
      sector: '단조 & 정밀 열처리 부품',
      desc: '고기능성 정밀 기계 금속 단조품 및 구조재 가공 최적화 제조 기업',
      tag: '정밀 단조'
    },
    {
      id: 'part-7',
      name: '주식회사 SNT 다이내믹스',
      sector: '방산 및 고정밀 변속기',
      desc: '궤도차량 변속기, 방산 기어 및 고기능 파워트레인 기계 핵심 모듈 전문 대기업',
      tag: '방위 산업 / 기어'
    }
  ]
};

const SITE_SETTINGS_KEY = 'furnace_app_site_settings';
const SITE_SETTINGS_VERSION_KEY = 'furnace_app_site_settings_version';
const CURRENT_SITE_VERSION = 'v3';

export function getStoredSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return INITIAL_SITE_SETTINGS;
  try {
    const version = localStorage.getItem(SITE_SETTINGS_VERSION_KEY);
    if (version !== CURRENT_SITE_VERSION) {
      localStorage.setItem(SITE_SETTINGS_VERSION_KEY, CURRENT_SITE_VERSION);
      localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(INITIAL_SITE_SETTINGS));
      return INITIAL_SITE_SETTINGS;
    }
    const stored = localStorage.getItem(SITE_SETTINGS_KEY);
    if (!stored) {
      localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(INITIAL_SITE_SETTINGS));
      return INITIAL_SITE_SETTINGS;
    }
    return JSON.parse(stored);
  } catch (e) {
    console.warn('Failed to load site settings, falling back:', e);
    return INITIAL_SITE_SETTINGS;
  }
}

export function saveSiteSettings(settings: SiteSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save site settings:', e);
  }
}

