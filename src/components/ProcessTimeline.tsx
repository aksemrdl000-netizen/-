import React from 'react';
import { PhoneCall, Edit3, Settings, Play, ArrowRight, CornerDownRight } from 'lucide-react';

export default function ProcessTimeline() {
  const steps = [
    {
      num: '01',
      title: '정밀 무료 진단',
      icon: <PhoneCall className="w-5 h-5 text-brand-blue" />,
      desc: '당사 기술진이 현장 방문하여 노체 열손실 계측 및 전장 계측 노후도 진단'
    },
    {
      num: '02',
      title: '도면/투명 견적',
      icon: <Edit3 className="w-5 h-5 text-brand-orange" />,
      desc: '도면 기반 맞춤형 리모델링 수립 및 과다 견적 배제한 정직한 투명 견적서 제안'
    },
    {
      num: '03',
      title: '책임 정비 시공',
      icon: <Settings className="w-5 h-5 text-brand-blue" />,
      desc: '고밀도 단열 보강, 노체 용접 및 터치 PLC 등 스마트 자동화 디지털 제어반 구축'
    },
    {
      num: '04',
      title: 'TUS 최종 검증',
      icon: <Play className="w-5 h-5 text-brand-orange" />,
      desc: '온도 균질도(TUS) 정밀 측정을 통한 오차 범위 ±1℃ 이내 극소 균일 승온 최종 인도'
    }
  ];

  return (
    <section id="process" className="py-24 bg-gray-light relative overflow-hidden border-t border-b border-line">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.02),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <p className="text-xs text-brand-orange font-bold uppercase tracking-widest">Workflow Timeline</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            신속하고 완벽한 4단계 유지보수 및 개조 절차
          </h2>
          <div className="h-1 w-12 bg-brand-blue mx-auto rounded-full" />
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            정밀 진단부터 투명 견적 제안, 맞춤형 정비 시공 및 TUS(온도 균질도) 최종 측정 검증까지 전 과정을 한눈에 파악하실 수 있습니다.
          </p>
        </div>

        {/* Timeline Grid: Desktop Horizontal Scroll / Large Display */}
        <div className="hidden lg:grid grid-cols-4 gap-4 relative">
          
          {/* Connector Line across elements */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-line -translate-y-10 z-0" />

          {steps.map((step, idx) => (
            <div key={step.num} className="relative z-10 flex flex-col items-center text-center group">
              
              {/* Badge Number */}
              <div className={`text-xs font-mono font-bold mb-2 px-2 py-0.5 rounded ${
                idx % 2 === 0 
                  ? 'text-brand-blue bg-brand-blue/5 border border-brand-blue/10' 
                  : 'text-brand-orange bg-brand-orange/5 border border-brand-orange/10'
              }`}>
                STEP {step.num}
              </div>

              {/* Icon Ball */}
              <div className={`w-16 h-16 rounded-2xl bg-white border-2 border-line transition-all duration-300 flex items-center justify-center mb-4 shadow-sm relative ${
                idx % 2 === 0
                  ? 'group-hover:border-brand-blue group-hover:shadow-md'
                  : 'group-hover:border-brand-orange group-hover:shadow-md'
              }`}>
                {step.icon}
                {/* Arrow to next item */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 text-slate-300 font-bold hidden xl:block">
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Content text */}
              <div className="space-y-1.5 px-4">
                <h3 className={`text-base font-extrabold text-navy transition-colors ${
                  idx % 2 === 0
                    ? 'group-hover:text-brand-blue'
                    : 'group-hover:text-brand-orange'
                }`}>
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Mobile vertical flow */}
        <div className="lg:hidden space-y-6 max-w-md mx-auto">
          {steps.map((step, idx) => (
            <div key={step.num} className={`flex gap-4 items-center bg-white border border-line p-4 rounded-xl transition-all shadow-sm ${
              idx % 2 === 0 ? 'hover:border-brand-blue/30' : 'hover:border-brand-orange/30'
            }`}>
              <div className={`font-mono font-bold text-xs p-2.5 rounded-lg border shrink-0 w-11 h-11 flex items-center justify-center ${
                idx % 2 === 0
                  ? 'bg-brand-blue/5 text-brand-blue border-brand-blue/20'
                  : 'bg-brand-orange/5 text-brand-orange border-brand-orange/20'
              }`}>
                {step.num}
              </div>
              <div className="shrink-0 bg-gray-light p-2.5 rounded-xl border border-line">
                {step.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy flex items-center gap-1.5">
                  {step.title}
                  {idx < steps.length - 1 && <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
