import { PortfolioItem, Inquiry } from './types';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [];

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
const CURRENT_VERSION = 'v4'; // Bump version to force reset of local storage so everyone sees updated static list

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
