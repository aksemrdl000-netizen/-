import React from 'react';
import { Award, ShieldCheck, DollarSign, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      title: '실력 (Skill)',
      subtitle: '검증된 정밀 가공 기술',
      icon: <Award className="w-8 h-8 text-brand-blue" />,
      color: 'border-line border-l-4 border-l-brand-blue bg-white',
      glow: 'shadow-md shadow-slate-100',
      points: [
        '풍부한 산업용 열처리로 제작 경험',
        '다양한 형태의 맞춤형 산업로 설계 및 제조',
        '현장 맞춤형 최적화 설계 솔루션',
        '초정밀 안정성 확보를 위한 PID 온도 제어',
        '에너지 세이빙을 보장하는 높은 열효율 공법'
      ]
    },
    {
      title: '신뢰 (Trust)',
      subtitle: '책임감 있는 원스톱 파트너십',
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      color: 'border-line border-l-4 border-l-navy bg-white',
      glow: 'shadow-md shadow-slate-100',
      points: [
        '약속을 최우선으로 지키는 투명한 기업',
        '허위 마진 없는 투명하고 정직한 견적',
        '완성도 높은 마감과 정확한 납기 준수',
        '설치 후 안정적인 시운전 및 철저한 A/S 사후관리',
        '지속적인 정비 지원으로 고객과의 장기적인 파트너십'
      ]
    },
    {
      title: '합리적인 가격 (Value)',
      subtitle: '과도한 예산 지출 방지',
      icon: <DollarSign className="w-8 h-8 text-emerald-600" />,
      color: 'border-line border-l-4 border-l-navy bg-white',
      glow: 'shadow-md shadow-slate-100',
      points: [
        '과스펙을 피하고 현장 사양에 꼭 필요한 기능만 제안',
        '불필요한 제조 단가 및 설계 유통 비용 제거',
        '고객 예산 범위에 최적화된 최적 설계 적용',
        '운영 전력 및 가스 소모량 최적화를 통한 가동 비용 절감',
        '비용 대비 높은 내구성으로 긴 유지관리 주기 제공'
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
            단순히 기계를 납품하는 것을 넘어, 생산 공정의 생산성과 최고 수준의 품질을 보장합니다.
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
