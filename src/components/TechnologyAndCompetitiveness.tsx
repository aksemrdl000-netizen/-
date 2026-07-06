import React from 'react';
import { ShieldCheck, Thermometer, Gauge, Hammer, Cpu, Zap, Activity } from 'lucide-react';

export default function TechnologyAndCompetitiveness() {
  const technologies = [
    {
      title: '정밀 노후 진단 & 엔지니어링',
      subtitle: 'Advanced Diagnosis',
      desc: '열화상 감지 및 정밀 계측기를 활용해 에너지 누출 부위, 단열 노후화, 노체 크랙 지점을 정량적·과학적으로 완벽 분석합니다.',
      icon: <Hammer className="w-5 h-5 text-brand-blue" />,
      colorClass: 'text-brand-blue'
    },
    {
      title: '고온 단열 시공 & 에너지 세이빙',
      subtitle: 'Premium Insulation',
      desc: '1,200℃ 초고온 스트레스를 견디는 특등급 세라믹 파이버와 이중 프레임 고정 방식으로 방산 열손실을 완벽 차단해 가동 에너지를 획기적으로 낮춥니다.',
      icon: <Thermometer className="w-5 h-5 text-brand-orange" />,
      colorClass: 'text-brand-orange'
    },
    {
      title: 'PLC 스마트 디지털 제어 개조',
      subtitle: 'Smart Control System',
      desc: '조작이 까다로운 구형 아날로그 제어반을 고성능 PLC 디지털 터치스크린으로 리빌딩하여 온도 편차를 ±1℃ 이내로 정밀 제어합니다.',
      icon: <Gauge className="w-5 h-5 text-brand-blue" />,
      colorClass: 'text-brand-blue'
    },
    {
      title: '발열체 설계 & 긴급 복구 솔루션',
      subtitle: 'Emergency Technical Care',
      desc: '최고급 칸탈 열선 유닛 규격화와 5중 세이프티 방재 설계 연동은 물론, 돌발 고장 발생 시 전문 정비팀이 즉각 투입되어 완벽하게 조치합니다.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-orange" />,
      colorClass: 'text-brand-orange'
    }
  ];

  const comparisonRows = [
    { label: '노체 진단', general: '육안 판정 및 감에 의존', us: '열화상 카메라 및 정밀 기기 활용 과학적 분석' },
    { label: '부품 정비', general: '독점 단가를 부풀린 임의 부품 공급', us: '규격화·표준화 국산 최고급 부품 적용으로 비용 절감' },
    { label: '단열 공법', general: '충진재 단순 부착 (단시간 내 재이탈)', us: '이중 지지 앵커 프레임 및 고착식 특수 모르타르 시공' },
    { label: '온도 복원', general: '단순 동작 유무 수준의 불완전 튜닝', us: '다구역 TUS 측정을 통한 미세 균일도(±1℃) 완전 매칭' },
    { label: '장애 대응', general: '일정 지연 및 불명확한 사후 관리', us: '긴급 수리 전문가 전용 비상 채널 가동, 24시간 대응' }
  ];

  return (
    <section id="technology" className="py-24 bg-gray-light relative overflow-hidden border-t border-b border-line">
      {/* Decorative ambient light */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs text-brand-blue font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Core Engineering Power</span>
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            독보적인 기술력과 정비 표준
          </h2>
          <div className="h-1 w-10 bg-brand-blue mx-auto rounded-full" />
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            일시적인 미봉책이 아닌, 가열로 설계 이론에 기반한 고효율 에너지 리모델링과 정밀 온도 오차 복원을 지향합니다.
          </p>
        </div>

        {/* 4 Premium Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.title}
              className={`bg-white border border-line p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${
                tech.colorClass === 'text-brand-blue' ? 'hover:border-brand-blue/40' : 'hover:border-brand-orange/40'
              }`}
            >
              <div>
                <div className="bg-gray-light w-11 h-11 rounded-xl border border-line flex items-center justify-center mb-5">
                  {tech.icon}
                </div>
                <p className={`text-[10px] font-extrabold uppercase tracking-wider mb-1 ${tech.colorClass}`}>{tech.subtitle}</p>
                <h3 className="font-extrabold text-navy text-base tracking-tight mb-3">{tech.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {tech.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Competitiveness Comparison */}
        <div className="border-t border-line pt-20">
          <div className="bg-white border border-line rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left text column */}
              <div className="lg:col-span-5 space-y-5">
                <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Market Comparison</p>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-navy tracking-tight leading-tight">
                  왜 광성산업 정비기술인가?
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  단순 외주에 의존하는 일반 수리업체와 달리, 엔지니어링 전담 설계 기술과 전문 설비 장비로 고객사 설비의 연속 운전을 강력하게 백업합니다.
                </p>
                <div className="p-4 bg-gray-light border border-line rounded-2xl flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-navy">철저한 부품 규격화 표준화</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium mt-1">외산 부품 대체가 용이한 국산 최고 사양의 표준 정장품 적용으로, 향후 유지 비용과 자재 조달 소요 시간을 혁신적으로 경감해 드립니다.</p>
                  </div>
                </div>
              </div>

              {/* Right table column */}
              <div className="lg:col-span-7 overflow-hidden border border-line rounded-2xl bg-gray-light shadow-inner">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-line text-xs font-medium">
                    <thead className="bg-navy text-white text-left">
                      <tr>
                        <th className="px-5 py-3 font-bold">진단/정비 항목</th>
                        <th className="px-5 py-3 font-medium text-slate-300">일반 정비업체</th>
                        <th className="px-5 py-3 font-black text-brand-blue bg-white/5">광성산업 (우리)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line bg-white">
                      {comparisonRows.map((row) => (
                        <tr key={row.label} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-navy whitespace-nowrap">{row.label}</td>
                          <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap sm:whitespace-normal">{row.general}</td>
                          <td className="px-5 py-3.5 font-bold text-navy bg-brand-blue/[0.03] text-brand-blue">{row.us}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
