import React from 'react';
import { PhoneCall, MapPin, Edit3, Hammer, Settings, HardHat, Play, LifeBuoy, ArrowRight, CornerDownRight } from 'lucide-react';

export default function ProcessTimeline() {
  const steps = [
    {
      num: '01',
      title: '상담',
      icon: <PhoneCall className="w-5 h-5 text-brand-blue" />,
      desc: '사용 목적, 규격, 목표 온도 조율'
    },
    {
      num: '02',
      title: '현장 확인',
      icon: <MapPin className="w-5 h-5 text-brand-blue" />,
      desc: '공장 부지, 동선, 전기/가스 인입 확인'
    },
    {
      num: '03',
      title: '설계',
      icon: <Edit3 className="w-5 h-5 text-brand-blue" />,
      desc: '3D CAD 및 열응력 맞춤 구조 설계'
    },
    {
      num: '04',
      title: '제작',
      icon: <Hammer className="w-5 h-5 text-brand-blue" />,
      desc: '정밀 제관 및 로체 프레임 견고 가공'
    },
    {
      num: '05',
      title: '조립',
      icon: <Settings className="w-5 h-5 text-brand-blue" />,
      desc: '열선 배치, 단열 마감, PLC 제어반 배선'
    },
    {
      num: '06',
      title: '설치',
      icon: <HardHat className="w-5 h-5 text-brand-blue" />,
      desc: '현장 반입, 안착 및 안전 배관 최종 인입'
    },
    {
      num: '07',
      title: '시운전',
      icon: <Play className="w-5 h-5 text-brand-blue" />,
      desc: '단계별 가열 및 최적 PID 동조 작동 테스팅'
    },
    {
      num: '08',
      title: 'A/S',
      icon: <LifeBuoy className="w-5 h-5 text-brand-blue" />,
      desc: '문제 발생 시 즉각 출동, 신속 기술 지원'
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
            체계적이고 완벽한 8단계 제작 과정
          </h2>
          <div className="h-1 w-12 bg-brand-blue mx-auto rounded-full" />
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            첫 만남부터 설계, 시운전, 평생의 유지보수까지 모든 과정을 당사 기술진이 투명하고 엄격하게 책임 제조합니다.
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
