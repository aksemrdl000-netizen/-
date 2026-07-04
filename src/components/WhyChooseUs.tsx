import React from 'react';
import { Award, ShieldCheck, DollarSign, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      title: '실력 (Skill)',
      subtitle: '검증된 사후 관리 엔지니어링',
      icon: <Award className="w-8 h-8 text-brand-blue" />,
      color: 'border-line border-l-4 border-l-brand-blue bg-white',
      glow: 'shadow-md shadow-slate-100',
      points: [
        '수십 년간 축적된 다양한 제조사 열처리로 정비 이력',
        '노후 노체 분해 수리 및 고성능 내열강 특수 제관 용접',
        '오차 범위 ±1℃ 복원을 위한 PID 제어 시스템 튜닝 기술',
        '단열 두께 보강 및 열 손실 시뮬레이션 기반 마감 시공',
        '구형 조작반의 최신 PLC 모니터링 스마트 자동화 개조'
      ]
    },
    {
      title: '신뢰 (Trust)',
      subtitle: '책임감 있는 정직한 파트너십',
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      color: 'border-line border-l-4 border-l-navy bg-white',
      glow: 'shadow-md shadow-slate-100',
      points: [
        '허위 과다 견적을 원천 배제한 투명한 필수 정비 공정 제안',
        '수리 자재의 출처가 확실한 정품 세라믹 파이버 및 국산 히터 적용',
        '공장 생산에 지장이 없도록 가동 중단 일정을 준수하는 시공 마감',
        '정비 완료 후 온도 균질도(TUS) 테스트를 통한 객관적 검증 지원',
        '24시간 긴급 수리 긴급 대응반 운영을 통한 지속적 파트너십'
      ]
    },
    {
      title: '합리적인 가격 (Value)',
      subtitle: '불필요한 설비 신설 비용 완전 차단',
      icon: <DollarSign className="w-8 h-8 text-emerald-600" />,
      color: 'border-line border-l-4 border-l-navy bg-white',
      glow: 'shadow-md shadow-slate-100',
      points: [
        '신설 대비 70~80% 예산 절감 효과가 있는 노후로 리모델링 기법',
        '과스펙 정비를 지양하고 고장 원인 부위만을 정밀 정비하는 가격 합리성',
        '단열재 완벽 충진으로 열방출을 막아 월 가스·전력 요금 최대 30% 절감',
        '표준화된 고수명 소모성 교체 부품 보급을 통한 유지비 최소화',
        '가동 신뢰도 증가로 생산 불량률을 감소시켜 원가 절감 기여'
      ]
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-gray-light relative overflow-hidden">
      {/* Background decoration lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-brand-blue/30 to-slate-200" />
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-navy/30 to-slate-200" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Why Choose Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            우리를 선택해야 하는 세 가지 이유
          </h2>
          <div className="h-1 w-12 bg-brand-blue mx-auto rounded-full" />
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            기존 설비의 경제성과 가동 안전성을 최고 수준으로 끌어올리는 광성산업만의 약속입니다.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={card.title}
              className={`border rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 ${card.color} ${card.glow} flex flex-col justify-between`}
            >
              <div>
                {/* Icon wrapper */}
                <div className="bg-gray-light border border-line w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  {card.icon}
                </div>

                <div className="space-y-1.5 mb-6">
                  <h3 className="text-xl font-extrabold text-navy tracking-tight">{card.title}</h3>
                  <p className="text-xs text-slate-500 font-bold">{card.subtitle}</p>
                </div>

                {/* Point details */}
                <ul className="space-y-3">
                  {card.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2.5 text-sm text-slate-600 leading-relaxed font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {idx === 2 && (
                <div className="mt-8 pt-6 border-t border-line bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-brand-blue font-bold text-center leading-relaxed">
                    "불필요한 비용을 과감히 없애고,<br />
                    고객 예산에 맞춘 최고의 가성비 산업로를 제공합니다."
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
