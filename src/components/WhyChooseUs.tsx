import React from 'react';
import { Award, ShieldCheck, DollarSign, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';

interface WhyChooseUsProps {
  siteSettings: SiteSettings;
}

export default function WhyChooseUs({ siteSettings }: WhyChooseUsProps) {
  const cards = [
    {
      title: '실력 (Skill)',
      subtitle: '검증된 사후 관리 엔지니어링',
      icon: <Award className="w-8 h-8 text-brand-blue" />,
      color: 'border-line border-l-4 border-l-brand-blue bg-white',
      glow: 'shadow-md shadow-slate-100',
      points: [
        '수십 년간 축적된 다양한 제조사 열처리로 정비 이력',
        '±1℃ 극소 온도 편차 복원을 위한 PID 제어 시스템 튜닝 기술',
        '고밀도 세라믹 단열 시공 및 스마트 PLC 디지털 제어 개조'
      ]
    },
    {
      title: '신뢰 (Trust)',
      subtitle: '책임감 있는 정직한 파트너십',
      icon: <ShieldCheck className="w-8 h-8 text-brand-orange" />,
      color: 'border-line border-l-4 border-l-brand-orange bg-white',
      glow: 'shadow-md shadow-slate-100',
      points: [
        '허위 과다 청구를 원천 차단하는 정직하고 직관적인 투명 견적',
        '생산 차질을 방지하는 칼 같은 시공 일정 준수 및 24시간 긴급 정비 대응',
        '시공 완료 후 정밀 다채널 TUS(온도 균질도) 현장 측정 및 검증 지원'
      ]
    },
    {
      title: '합리적인 가격 (Value)',
      subtitle: '불필요한 설비 신설 비용 완전 차단',
      icon: <DollarSign className="w-8 h-8 text-brand-blue" />,
      color: 'border-line border-l-4 border-l-brand-blue bg-white',
      glow: 'shadow-md shadow-slate-100',
      points: [
        '새 장비 구입 대비 최대 70~80% 예산을 아끼는 정교한 리빌딩 기법',
        '열방출을 완벽 마감해 가스·전력 요금을 즉각 줄여주는 에너지 세이빙',
        '표준화된 고수명 국산 최고급 부품 적용으로 향후 유지보수비 최소화'
      ]
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-gray-light relative overflow-hidden">
      {/* Background decoration lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-brand-blue/30 to-slate-200" />
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-brand-orange/30 to-slate-200" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Why Choose Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            우리를 선택해야 하는 세 가지 이유
          </h2>
          <div className="h-1 w-12 bg-brand-orange mx-auto rounded-full" />
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            기존 설비의 경제성과 가동 안전성을 최고 수준으로 끌어올리는 {siteSettings.companyName}만의 약속입니다.
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
                  <p className="text-xs text-brand-orange font-bold text-center leading-relaxed">
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
