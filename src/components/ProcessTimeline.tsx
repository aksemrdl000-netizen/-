import React from 'react';
import { PhoneCall, MapPin, Edit3, Hammer, Settings, HardHat, Play, LifeBuoy, ArrowRight, CornerDownRight } from 'lucide-react';

export default function ProcessTimeline() {
  const steps = [
    {
      num: '01',
      title: '정비 상담',
      icon: <PhoneCall className="w-5 h-5 text-brand-blue" />,
      desc: '이상 증상, 제어 오작동, 단열 노화 상태 1차 유선 진단'
    },
    {
      num: '02',
      title: '무상 실사',
      icon: <MapPin className="w-5 h-5 text-brand-blue" />,
      desc: '수석 엔지니어 현장 방문, 노체 전장 정밀 계측 및 정비 진단'
    },
    {
      num: '03',
      title: '설계/제안',
      icon: <Edit3 className="w-5 h-5 text-brand-blue" />,
      desc: '필수 보수 및 개조 도면 검토, 상세 자재 투명 견적 제안'
    },
    {
      num: '04',
      title: '자재 준비',
      icon: <Hammer className="w-5 h-5 text-brand-blue" />,
      desc: '고품질 세라믹 파이버 및 국산 정품 가열체/PLC 전장 선별 가공'
    },
    {
      num: '05',
      title: '철저 시공',
      icon: <Settings className="w-5 h-5 text-brand-blue" />,
      desc: '노체 균열 특수 내열 용접 및 노후 발열체/단열재 전면 수리 교체'
    },
    {
      num: '06',
      title: '전장 개조',
      icon: <HardHat className="w-5 h-5 text-brand-blue" />,
      desc: '최신 PLC 자동 디지털 제어반 이식 배선 및 안전 센서 연동 시공'
    },
    {
      num: '07',
      title: 'TUS 검증',
      icon: <Play className="w-5 h-5 text-brand-blue" />,
      desc: '승온 운전을 통한 온도 균질도(TUS) 테스트 및 미세 PID 동조 검사'
    },
    {
      num: '08',
      title: '사후 관리',
      icon: <LifeBuoy className="w-5 h-5 text-brand-blue" />,
      desc: '밀착 정비 이력 관리 및 24시간 돌발 비상 기술 대응 지원'
    }
  ];

  return (
    <section id="process" className="py-24 bg-gray-light relative overflow-hidden border-t border-b border-line">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.02),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Workflow Timeline</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            신속하고 완벽한 8단계 유지보수 및 개조 절차
          </h2>
          <div className="h-1 w-12 bg-brand-blue mx-auto rounded-full" />
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            돌발 고장 현상 진단부터 무상 실사, 맞춤 보수 설계, 정밀 부품 시공, TUS(온도 균질도) 최종 측정 검증까지 전 과정을 투명하게 책임 완수합니다.
          </p>
        </div>

        {/* Timeline Grid: Desktop Horizontal Scroll / Large Display */}
        <div className="hidden lg:grid grid-cols-8 gap-4 relative">
          
          {/* Connector Line across elements */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-line -translate-y-10 z-0" />

          {steps.map((step, idx) => (
            <div key={step.num} className="relative z-10 flex flex-col items-center text-center group">
              
              {/* Badge Number */}
              <div className="text-xs font-mono font-bold text-brand-blue mb-2 bg-brand-blue/5 border border-brand-blue/10 px-2 py-0.5 rounded">
                STEP {step.num}
              </div>

              {/* Icon Ball */}
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-line group-hover:border-brand-blue group-hover:shadow-md transition-all duration-300 flex items-center justify-center mb-4 shadow-sm relative">
                {step.icon}
                {/* Arrow to next item */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 text-slate-300 font-bold hidden xl:block">
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Content text */}
              <div className="space-y-1.5 px-1">
                <h3 className="text-base font-extrabold text-navy group-hover:text-brand-blue transition-colors">
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
            <div key={step.num} className="flex gap-4 items-center bg-white border border-line p-4 rounded-xl hover:border-brand-blue/30 transition-all shadow-sm">
              <div className="bg-gray-light text-brand-blue font-mono font-bold text-xs p-2.5 rounded-lg border border-line shrink-0 w-11 h-11 flex items-center justify-center">
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
