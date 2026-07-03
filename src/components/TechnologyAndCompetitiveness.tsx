import React from 'react';
import { Check, ShieldCheck, Thermometer, Zap, Eye, Gauge, AlertTriangle, Hammer, HelpCircle } from 'lucide-react';

export default function TechnologyAndCompetitiveness() {
  const technologies = [
    {
      title: '맞춤 설계',
      desc: '3D CAD 및 고열 모델 시뮬레이션을 반영하여 한 치의 오차 없이 최적화 설계합니다.',
      icon: <Hammer className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '고온 단열 기술',
      desc: '1,200℃ 이상의 고온에서도 표면 온도를 상온 수준으로 보존하는 최고등급 세라믹 단열 시공.',
      icon: <Thermometer className="w-5 h-5 text-brand-blue" />
    },
    {
      title: 'PID 온도제어',
      desc: '미세 전력량 연산을 통해 설정 온도 오차 범위 ±1℃ 미만을 유지하는 정밀 제어 루프.',
      icon: <Gauge className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '자동 제어 시스템',
      desc: '터치 인터페이스 PLC 연동으로 실시간 온도기록, 레시피 기억, 무인 가동을 완벽 제어.',
      icon: <Zap className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '열효율 향상 설계',
      desc: '버너 배기가스 폐열을 신선한 공기로 리큐퍼레이팅하여 열원 소모율을 전격 저감합니다.',
      icon: <Check className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '에너지 절감 설계',
      desc: '다구역(Multi-Zone) 전력 분산 제어를 통하여 피크 전력을 억제하고 대기전력을 절감합니다.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '안전 설계',
      desc: '오버 템퍼 방지 제어기, 가스 압력 차단 장치, 오작동 비상 락 등 5중 통합 안전 제어반.',
      icon: <AlertTriangle className="w-5 h-5 text-brand-blue" />
    },
    {
      title: '유지보수 용이성',
      desc: '발열체 교체가 외측에서 단시간 내 가능하게 한 유닛형 구조로 가동중단 시간을 단축.',
      icon: <Eye className="w-5 h-5 text-brand-blue" />
    }
  ];

  const comparisonRows = [
    { label: '맞춤설계', general: '△ (규격화 위주 공급)', us: '● (1:1 완전 주문 설계)' },
    { label: '제작', general: '○ (일반 용접 및 외부 사급)', us: '● (특수 내열 강판 자체 제관)' },
    { label: '설치', general: '△ (외부 현장 인력 투입)', us: '● (담당 전담 설계진 상주 감독)' },
    { label: '시운전', general: '△ (기초 가온 점검에 국한)', us: '● (PID 전구역 자동 동조 및 튜닝)' },
    { label: 'A/S 및 사후관리', general: '△ (부품 수급 지연 다반사)', us: '● (실시간 밀착 정비망, 24시 대응)' },
    { label: '견적 산출', general: '불명확 (추가금 빈발)', us: '명확 (마진 제거 정직한 내역 제시)' }
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
              열처리의 핵심은 고온 유지도 중요하지만, 공간 내 온도가 얼마나 균일하게 전달되는가(온도 분포)입니다. 광성산업의 설계 표준은 전 세계 기준에 부합합니다.
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
                일반적인 임가공 위주 공급 업체들과의 기술 완성도 및 신용 지표 격차를 투명하게 공개합니다.
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
