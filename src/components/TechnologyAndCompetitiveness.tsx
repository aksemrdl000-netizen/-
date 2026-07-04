import React from 'react';
import { Check, ShieldCheck, Thermometer, Zap, Eye, Gauge, AlertTriangle, Hammer, HelpCircle } from 'lucide-react';

export default function TechnologyAndCompetitiveness() {
  const technologies = [
    {
      title: '노체 정밀 노후화 진단',
      desc: '열화상 카메라 및 자체 계측 장비로 노체 크랙, 열화 점검 및 단열 이탈부를 정밀 분석합니다.',
      icon: <Hammer className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '고밀도 단열 보강 시공',
      desc: '1,200℃ 이상의 고온 스트레스를 견디는 최고등급 세라믹 단열재 마감으로 열손실을 완벽 차단합니다.',
      icon: <Thermometer className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'PID 온도 제어 튜닝',
      desc: '노후화로 틀어진 PID 전력 제어 동조화 값을 미세 보정하여 온도 오차 편차를 ±1℃ 이내로 극소화합니다.',
      icon: <Gauge className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '스마트 제어반 리모델링',
      desc: '조작이 어렵고 잔고장이 잦은 구형 아날로그 계장 전반을 PLC 디지털 터치스크린으로 개조합니다.',
      icon: <Zap className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '에너지 효율 극대화 개조',
      desc: '버너 리큐퍼레이터 튜닝 및 기밀성 복원 공법으로 가동에 필요한 전력과 가스 소비를 즉시 줄입니다.',
      icon: <Check className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '발열체 수명 증대 시공',
      desc: '국산 및 최고급 칸탈 열선을 표준 유닛화하여 교환 주기를 늘리고 신속한 유지 정비 환경을 구축합니다.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '5중 안전 개조 연동',
      desc: '과승 온도 차단기, 안전 자석 연동 스위치, 안전 가스 밸브 연동 차단 등 복합 방재 회로를 보강합니다.',
      icon: <AlertTriangle className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '24시간 긴급 장애 수리',
      desc: '단열 처짐, 히터 단선, 제어 고장 등 돌발 이슈 발생 시 수석 정비팀이 신속히 출동해 복구합니다.',
      icon: <Eye className="w-5 h-5 text-brand-blue" />
    }
  ];

  const comparisonRows = [
    { label: '노체 진단 능력', general: '육안 확인 및 어림치 판정', us: '● (열화상 및 계측기 활용 정밀 열손실 분석)' },
    { label: '부품 정비 및 교체', general: '호환이 어려운 고가 독점 부품 공급 유도', us: '● (규격화·표준화 부품 적용으로 단가 절감)' },
    { label: '단열재 전면 시공', general: '단열재 단순 충진에 의한 빠른 재이탈', us: '● (이중 지지 프레임 보강 및 특수 모르타르 접착)' },
    { label: '온도 균질도(TUS) 테스트', general: '단순히 온도 상승 여부만 확인', us: '● (다구역 계측을 통한 분배율 오차 미세 보정)' },
    { label: '제어반 리모델링 기술', general: '단순 마그네틱/릴레이 등 배선 수리 한계', us: '● (구형 아날로그를 PLC 터치 감시반으로 리빌딩)' },
    { label: '장애 긴급 긴급 출동', general: '사후 관리 회피 및 일정 지연 다반사', us: '● (정비 전문가 밀착 대기, 24시간 내 착수)' }
  ];

  return (
    <section id="technology" className="py-24 bg-gray-light relative overflow-hidden border-t border-b border-line">
      {/* Decorative vertical light bar */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 7: 기술력 */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Core Technical Expertise</p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              압도적인 온도 균질화 및 고효율 기술력
            </h2>
            <div className="h-1 w-12 bg-brand-blue mx-auto rounded-full" />
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
              열처리로 사후 관리의 핵심은 일시적 땜질식 처방이 아닌, 근본적인 온도 균질도(Uniformity) 회복과 에너지 효율 리모델링입니다. 광성산업의 정비 표준은 검증된 엔지니어링을 토대로 합니다.
            </p>
          </div>

          {/* Grid of 8 Technologies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech) => (
              <div
                key={tech.title}
                className="bg-white border border-line hover:border-brand-blue/40 p-6 rounded-2xl transition-all hover:scale-[1.01] shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gray-light p-2.5 rounded-lg border border-line shrink-0">
                    {tech.icon}
                  </div>
                  <h3 className="font-extrabold text-navy text-base tracking-tight">{tech.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 8: 경쟁력 비교표 */}
        <div className="border-t border-line pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Table Explainer Text */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Market Competitiveness</p>
              <h2 className="font-display text-3xl font-extrabold text-navy tracking-tight leading-tight">
                경쟁사 비교 분석표
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                가동 중단 시간을 최소화하고 정비 예산을 가장 투명하게 환원하는 광성산업만의 독보적인 강점입니다.
              </p>

              <div className="space-y-3 bg-white p-5 rounded-2xl border border-line text-xs text-slate-500 shadow-sm">
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-brand-blue">●</span>
                  <span className="text-navy">완벽 지원 (무결점 가동 가능)</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-slate-400">○</span>
                  <span>보통 지원 (일부 한계점 상존)</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-slate-300">△</span>
                  <span>미흡 또는 외부 아웃소싱에 의존</span>
                </div>
              </div>
            </div>

            {/* Table itself */}
            <div className="lg:col-span-7 overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden border border-line rounded-2xl shadow-md bg-white">
                  <table className="min-w-full divide-y divide-line">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-200">구분</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-400">일반 업체</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-brand-blue bg-white/5">광성산업 (우리)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line bg-white">
                      {comparisonRows.map((row) => (
                        <tr key={row.label} className="hover:bg-slate-50 transition-colors">
                          <td className="whitespace-nowrap px-6 py-4 text-xs font-bold text-navy">{row.label}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-500 font-medium">{row.general}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-xs font-extrabold text-brand-blue bg-brand-blue/5">{row.us}</td>
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
