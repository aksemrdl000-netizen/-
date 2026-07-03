import React from 'react';
import { ShieldAlert, Cpu, HeartHandshake, Settings } from 'lucide-react';

export default function CompanyIntro() {
  const highlights = [
    {
      icon: <Cpu className="w-5 h-5 text-brand-blue" />,
      title: '생산 환경 완전 최적화',
      desc: '공장의 여유 부지, 주 사용 원자재, 일평균 가동율을 정교하게 반영하여 장비 사양을 완벽하게 튜닝합니다.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-brand-blue" />,
      title: '전 공정 책임 제조 시스템',
      desc: '외부 하청을 남발하지 않고 설계자, 용접 전문가, 제어 PLC 설계자가 한 팀이 되어 일괄 책임 제조합니다.'
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-b border-line relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Grid */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-brand-blue font-bold text-xs uppercase tracking-widest">Company Introduction</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight leading-tight">
                왜 수많은 기업들이<br />
                광성산업을 다시 찾을까요?
              </h2>
            </div>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              산업용 열처리로는 단순히 철판을 용접하고 히터를 조립하는 단순 장비가 아닙니다. 극도의 열팽창과 고온 하중을 버티며 수십 년을 가동해야 하는 최고 수준의 기술력이 집약된 대형 정밀 시스템입니다.
            </p>

            <div className="p-5 bg-gray-light border-l-4 border-brand-blue border border-line rounded-r-xl space-y-2">
              <p className="text-sm font-semibold text-navy">
                "설계부터 제작, 설치, 시운전, 유지보수까지 모든 전 공정이 유기적으로 한 곳에서 완성되어야만 실제 현장에서 흔들림 없이 고균일한 품질을 지속 확보할 수 있습니다."
              </p>
              <p className="text-xs text-slate-500 font-bold">광성산업 기술 고문단 일동</p>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              우리는 다년간의 납품 경험으로 각 산업군별 최적의 작동 온도를 분석하고, 현장에 설치된 이후 오차 없이 가동될 수 있도록 모든 안전 사양과 열손실 방지 장치를 자체 시공합니다.
            </p>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gray-light border border-line p-8 rounded-2xl space-y-6 shadow-md">
              <h3 className="text-lg font-extrabold text-navy flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-brand-blue shrink-0" />
                <span>잘못된 열처리 제작 시 발생하는 손실</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start pb-4 border-b border-line">
                  <div className="bg-red-50 border border-red-200 text-red-600 px-2 py-1 rounded text-[10px] font-mono shrink-0 mt-0.5 font-bold">CASE 01</div>
                  <div>
                    <p className="text-sm font-bold text-navy">단열 두께 부족으로 인한 전력·가스 낭비</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">부적절한 단열 자재 마감은 외부로 상당량의 복사열을 방출해 공장 실내 온도 상승 및 요금 폭탄을 초래합니다.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start pb-4 border-b border-line">
                  <div className="bg-red-50 border border-red-200 text-red-600 px-2 py-1 rounded text-[10px] font-mono shrink-0 mt-0.5 font-bold">CASE 02</div>
                  <div>
                    <p className="text-sm font-bold text-navy">온도 편차 발생에 의한 제품 전량 불량</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">로내 상하부 온도 평형도가 맞지 않을 경우, 부품이 불균일하게 가열되어 크랙이 가거나 균일도가 망가집니다.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 border border-red-200 text-red-600 px-2 py-1 rounded text-[10px] font-mono shrink-0 mt-0.5 font-bold">CASE 03</div>
                  <div>
                    <p className="text-sm font-bold text-navy">설치 및 시운전 지연으로 가동중단 사태</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">시공 업체와 설계 주체가 다르면 납품 후 작동 불량 시 서로 책임을 회피하여 유지관리 및 하자보수가 마비됩니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="bg-white border border-line p-5 rounded-xl space-y-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-light p-1.5 rounded-lg border border-line">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-extrabold text-navy">{item.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
