import { PortfolioItem, Inquiry } from './types';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p-1',
    title: '대형 카타입 열처리로 노체 정비 및 단열 개조 (SR 소둔용)',
    category: '유지보수·개조',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    duration: '15일',
    size: 'W 4,500 x H 3,500 x L 8,000 mm (보수 영역)',
    temperature: '상용 950℃ (정밀 단열 시공)',
    features: [
      '열손실 30% 방지용 최고밀도 세라믹 파이버 수리 시공',
      '고정밀 멀티존 PID 온도 분배율 전면 복원',
      '자동 카타입 하부 구동 레일 평형 정밀 정렬 및 윤활',
      '배기가스 폐열 회수 리큐퍼레이터 버너 노즐 정비 및 크랙 용접'
    ],
    description: '철강 구조물 및 대형 제관 제품 용접 응력 제거용 노후 카타입 가스 로의 노체를 전면 철거 후 재시공한 실적입니다. 열화로 심하게 처진 단열재를 수리하여 방산 열손실을 없애고 온도 평형도를 설계 규격 수준으로 100% 복원했습니다.',
    createdAt: 1719878400000
  },
  {
    id: 'p-2',
    title: '정밀 가스 분위기 소둔 열처리로 제어반 디지털 리모델링',
    category: '유지보수·개조',
    image: 'https://images.unsplash.com/photo-1563784462386-044fd95e9852?auto=format&fit=crop&w=800&q=80',
    duration: '10일',
    size: 'W 1,200 x H 1,200 x L 2,500 mm (로체 규격)',
    temperature: '최대 1,000℃ (질소/알곤 가스 흐름 연동)',
    features: [
      '구형 아날로그 계장 기기를 최신 컬러 터치스크린 PLC 시스템으로 개조',
      '질소(N2) 및 아르곤(Ar) 투입 안전 기밀 자동 밸브 유닛 전면 보강',
      '실시간 모바일 알람 및 3중 과승 방지 세이프티 차단 장치 설치',
      'SCR 파워 조절기를 통한 Multi-Zone 고성능 미세 전력 동조화 보정'
    ],
    description: '금속 표면 광휘 어닐링용 가스 분위기로의 노후화된 조작 전장반을 전면 분해하고 디지털 PLC 스마트 패널로 개조한 실적입니다. 편차가 심하던 설정 편차를 ±1℃ 이하로 완전히 제어하여 불량률을 획기적으로 개선했습니다.',
    createdAt: 1719964800000
  },
  {
    id: 'p-3',
    title: '연속식 메쉬벨트 분위기 소환로 메쉬 교환 및 연소실 보수',
    category: '유지보수·개조',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    duration: '8일',
    size: 'W 800 x H 500 x L 12,000 mm (이송 노체)',
    temperature: '상용 850℃ (벨트 구동 연동 장치)',
    features: [
      '열열화로 늘어나고 이탈하던 특수 내열 합금 메쉬벨트 전면 신규 교체',
      '메쉬벨트 구동축 축정렬(얼라인먼트) 및 슬립 방지 특수 구동 로터 장착',
      '버너 연소실 균열 크랙 내열 용접 복원 및 가스 안전 전자변 연동',
      '풍량 밸런싱을 통한 자체 배기가스 안전 연소 및 환기 덕트 수리'
    ],
    description: '소형 볼트/너트 및 정밀 기어 부품의 이송식 분위기 소환로 보수 실적입니다. 가열 중 무단 이탈하던 내열 벨트를 교환하고 과부하 방지 안전 모듈을 보강하여 가동 연속성을 안전하게 재확보했습니다.',
    createdAt: 1720051200000
  },
  {
    id: 'p-4',
    title: '전기식 고온 챔버 전기로 고장 발열체(칸탈) 교체 및 전면 복원',
    category: '유지보수·개조',
    image: 'https://images.unsplash.com/photo-1542156822-6924d1a71aba?auto=format&fit=crop&w=800&q=80',
    duration: '5일',
    size: 'W 1,000 x H 1,000 x L 1,200 mm',
    temperature: '상용 최대 1,200℃ (고장 히터 교환 완료)',
    features: [
      '단선 및 노화된 스웨덴산 고품질 칸탈(Kanthal-A1) 히터 유닛 전원 교체',
      '고온 내열용 알루미나 히터 서포터 핀 부분 신설 보조 시공',
      '수직형 슬라이딩 전동 도어의 자석 리미트 스위치 안전 락 장치 개선',
      '방열 자켓 하우징 내측 단열 모르타르 균열 보강 시멘트 재시공'
    ],
    description: '공장 연구소 및 시험 가공 업체에서 사용 중이던 1,200도 초고온 상자형 전기로의 가열 불량 정비 실적입니다. 단선된 히터 부위를 교체하고, 단열 모르타르를 전면 보수하여 외부 하우징 표면 온도를 획기적으로 낮췄습니다.',
    createdAt: 1720137600000
  },
  {
    id: 'p-5',
    title: '원통형 피트식(수직) 강제순환로 팬 축 수리 및 덮개 밀봉 보강',
    category: '유지보수·개조',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=800&q=80',
    duration: '12일',
    size: 'Ø 2,500 x L 6,000 (유효 실사 규격)',
    temperature: '최대 950℃ (안전 기밀 정비)',
    features: [
      '상부 고열용 대형 순환 팬의 축(Shaft) 베어링 교체 및 진동 밸런싱',
      '수직 덮개(Lid) 원터치 인장 잠금 장치 가스켓(Glass fiber 패킹) 교체',
      '로내 가열 대칭 전력 평형 밸런싱 및 소모성 열전대 센서 신설 교체',
      '원통 벽 내부 노출 열선 고정용 세라믹 홀더 완벽 고정 복구 시공'
    ],
    description: '코일 와이어 및 원통 부품 강제 순환 소둔로의 핵심인 팬 축 흔들림 고장과 덮개 사이 가스 누출 건을 완벽하게 밀봉 정비한 실적입니다. 고온 분위기 가스의 누출을 완전 방지하고 완벽한 원활 운전을 복원했습니다.',
    createdAt: 1720224000000
  },
  {
    id: 'p-6',
    title: '공장 맞춤형 신규 대형 열처리로 구축 솔루션',
    category: '신설·맞춤제작',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    duration: '45일',
    size: '고객 현장 요청 맞춤형 설계 및 설치',
    temperature: '최대 1,100℃ (에너지 세이빙 특허 공법)',
    features: [
      '고밀도 세라믹 파이버 단열 구조 및 에너지 절감형 발열체 배치',
      '미세 전력량 연산을 통한 고정밀 멀티존 PID 온도 제어 시스템',
      '공장 내 동선과 유입 동력을 정밀하게 반영한 공간 최적화 설계',
      '운용 효율 극대화를 위한 풀 디지털 터치스크린 스마트 컨트롤러'
    ],
    description: '신규로 설비를 설치해야 하는 고객사를 위한 프리미엄 주문 제작 솔루션입니다. 기성품의 한계를 뛰어넘어 공장의 전기용량, 도선 동선, 사용 원자재 두께에 부합하도록 1:1 맞춤형 고성능 산업로를 시공 인도합니다.',
    createdAt: 1720224000000
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
    message: '공장에서 수년간 상용 운전 중인 SR 소둔용 대형 가스 카타입 열처리로입니다. 최근 단열재 이탈 현상이 발생하고 있으며, 로 내부 온도 편차가 15℃ 이상 벌어지는 문제가 있어 무상 현장 정밀 실사 및 정비 견적 요청드립니다. 가급적 가동 중단 일정을 최소화하여 공사를 진행하고 싶습니다.',
    status: 'pending',
    createdAt: 1720023450000
  }
];

// Local Storage Keys
const PORTFOLIO_KEY = 'furnace_app_portfolio_items';
const INQUIRY_KEY = 'furnace_app_customer_inquiries';

export function getStoredPortfolio(): PortfolioItem[] {
  if (typeof window === 'undefined') return INITIAL_PORTFOLIO;
  try {
    const stored = localStorage.getItem(PORTFOLIO_KEY);
    if (!stored) {
      try {
        localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(INITIAL_PORTFOLIO));
      } catch (err) {
        console.warn('localStorage is disabled or blocked:', err);
      }
      return INITIAL_PORTFOLIO;
    }
    return JSON.parse(stored);
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
