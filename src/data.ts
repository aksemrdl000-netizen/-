import { PortfolioItem, Inquiry } from './types';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p-1',
    title: '대형 카타입 열처리로 (SR 소둔용)',
    category: '대형 산업로',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    duration: '65일',
    size: 'W 4,500 x H 3,500 x L 8,000 mm',
    temperature: '최대 1,100℃ (상용 950℃)',
    features: [
      '고정밀 멀티존 PID 온도제어',
      '고밀도 세라믹 파이버 단열 구조',
      '자동 카타입 구동 및 자동 도어 승강',
      '배기가스 폐열 회수식 리큐퍼레이터 버너'
    ],
    description: '철강 구조물 및 대형 제관 제품의 용접 응력 제거(SR)와 조직 균질화(소둔)를 위한 대용량 열처리 시스템입니다. 높은 열효율과 정밀한 온도 균일도를 보장합니다.',
    createdAt: 1719878400000
  },
  {
    id: 'p-2',
    title: '정밀 가스 분위기 소둔 열처리로',
    category: '맞춤 제작',
    image: 'https://images.unsplash.com/photo-1563784462386-044fd95e9852?auto=format&fit=crop&w=800&q=80',
    duration: '45일',
    size: 'W 1,200 x H 1,200 x L 2,500 mm',
    temperature: '최대 1,000℃ (질소/알곤 가스 제어)',
    features: [
      '질소(N2) 및 아르곤(Ar) 정밀 투입 시스템',
      '노내 고순도 산소농도 상시 모니터링',
      '에너지 절감형 발열체 배치 설계',
      '터치스크린 PLC 시스템 및 3중 안전 모듈'
    ],
    description: '금속 부품의 표면 산화 및 탈탄을 완벽히 차단하고 정밀 분위기 가스를 제어하여 광휘 어닐링(풀림) 처리를 가능하게 만드는 고품질 맞춤형 전기로입니다.',
    createdAt: 1719964800000
  },
  {
    id: 'p-3',
    title: '연속식 메쉬벨트 분위기 소환로',
    category: '맞춤 제작',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    duration: '55일',
    size: 'W 800 x H 500 x L 12,000 mm',
    temperature: '최대 850℃ (이송속도 조절 가능)',
    features: [
      '무단 속도 제어형 내열 합금 메쉬벨트',
      '다구역(Multi-Zone) 독립 PID 가열 제어',
      '구동축 과부하 알람 및 비상 정지 유닛',
      '자체 배가스 연소 장치 내장형 친환경 설계'
    ],
    description: '볼트, 너트 및 소형 정밀 자동차 부품의 고속 연속식 열처리를 위해 특수 내열 메쉬벨트 컨베이어를 적용한 양산형 열처리 설비입니다.',
    createdAt: 1720051200000
  },
  {
    id: 'p-4',
    title: '전기식 고온 챔버형 소량다품종 열처리로',
    category: '맞춤 제작',
    image: 'https://images.unsplash.com/photo-1542156822-6924d1a71aba?auto=format&fit=crop&w=800&q=80',
    duration: '30일',
    size: 'W 1,000 x H 1,000 x L 1,200 mm',
    temperature: '최대 1,200℃ (고수명 칸탈 히터)',
    features: [
      '고수명 최고급 칸탈(Kanthal-A1) 히터 내장',
      '다단 패턴 프로그래밍 디지털 콘트롤러',
      '전동 구동식 상하 개폐 도어 안전 잠금 장치',
      '이중 자켓 하우징 설계로 외부 표면 온도 저하'
    ],
    description: '시험실, 연구소 및 정밀 부품 가공 업체의 다품종 소량 부품 열처리에 완벽히 대응하는 고온 상자형 전기로입니다. 온도 분포도가 매우 균일하며 운전이 직관적입니다.',
    createdAt: 1720137600000
  },
  {
    id: 'p-5',
    title: '원통형 피트식(수직형) 강제순환 소둔로',
    category: '대형 산업로',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=800&q=80',
    duration: '50일',
    size: 'Ø 2,500 x L 6,000 (유효 치수)',
    temperature: '최대 950℃',
    features: [
      '상부 고풍량 내열 팬을 통한 열풍 강제 순환',
      '크레인 인양용 상부 덮개(Lid) 원터치 체결 장치',
      '로내 상/중/하 개별 전력 제어로 편차 최소화',
      '중하중용 지지 링과 하부 고정 서포트 구조'
    ],
    description: '코일 와이어, 대형 축류 부품 및 원통형 제관물을 수직 방향으로 입고하여 강제 순환 팬으로 신속하고 균일하게 열처리를 행할 수 있는 대형 피트형 수직 열처리로입니다.',
    createdAt: 1720224000000
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    companyName: '삼우중공업 (샘플)',
    contactPerson: '김민수 부장',
    phone: '010-1234-5678',
    email: 'ms.kim@samwoo-h.com',
    furnaceType: '대형 카타입 가스열처리로',
    temperatureRequired: '최대 1,100℃',
    message: '대형 가압 용접 구조물의 템퍼링(소려) 및 응력제거(SR)용 가스 열처리로 견적이 필요합니다. 규격은 대략 폭 4m, 길이 10m 수준으로 보고 있으며 공장 내 빈터에 설비 설치가 가능한지 현장 확인도 요청드립니다.',
    status: 'pending',
    createdAt: 1720023450000
  }
];

// Local Storage Keys
const PORTFOLIO_KEY = 'furnace_app_portfolio_items';
const INQUIRY_KEY = 'furnace_app_customer_inquiries';

export function getStoredPortfolio(): PortfolioItem[] {
  if (typeof window === 'undefined') return INITIAL_PORTFOLIO;
  const stored = localStorage.getItem(PORTFOLIO_KEY);
  if (!stored) {
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(INITIAL_PORTFOLIO));
    return INITIAL_PORTFOLIO;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_PORTFOLIO;
  }
}

export function savePortfolio(items: PortfolioItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(items));
}

export function getStoredInquiries(): Inquiry[] {
  if (typeof window === 'undefined') return INITIAL_INQUIRIES;
  const stored = localStorage.getItem(INQUIRY_KEY);
  if (!stored) {
    localStorage.setItem(INQUIRY_KEY, JSON.stringify(INITIAL_INQUIRIES));
    return INITIAL_INQUIRIES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_INQUIRIES;
  }
}

export function saveInquiries(inquiries: Inquiry[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(INQUIRY_KEY, JSON.stringify(inquiries));
}
