import React from 'react';
import { ShieldAlert, Cpu, HeartHandshake, Settings } from 'lucide-react';

export default function CompanyIntro() {
  const highlights = [
    {
      icon: <Cpu className="w-5 h-5 text-brand-blue" />,
      title: '노후 설비 성능 복원 및 업그레이드',
      desc: '단열재 보강, 고효율 버너/히터 교체, 최신 PLC 디지털 제어 적용으로 기존 로를 새 장비 수준으로 리모델링합니다.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-brand-blue" />,
      title: '철저한 긴급 출동 정비 시스템',
      desc: '돌발 장애 및 온도 편차 발생 시, 다년간의 정비 노하우를 가진 당사 전담 정비팀이 즉시 출동하여 현장 보수합니다.'
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
                광성산업에 유지보수를 맡길까요?
              </h2>
            </div>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              산업용 열처리로는 영구적인 장비가 아닙니다. 장기간 고온 가동 시 단열재 열화, 열선 단선, 가스 버너 불완전 연소, 제어반 오작동 등 다양한 노후화 문제가 반드시 발생합니다. 광성산업은 축적된 기술력으로 기존 노후 노를 철저히 정비하고 복원합니다.
            </p>

            <div className="p-5 bg-gray-light border-l-4 border-brand-blue border border-line rounded-r-xl space-y-2">
              <p className="text-sm font-semibold text-navy">
                "단순히 부품 하나를 바꾸는 정비가 아닙니다. 단열, 열량 연산, PID 제어 튜닝까지 유기적인 종합 진단이 이루어져야 기존 설비의 효율을 극대화할 수 있습니다."
              </p>
              <p className="text-xs text-slate-500 font-bold">광성산업 정비기술진 일동</p>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              우리는 대형 산업로 및 맞춤형 열처리로의 수리·보수 실적을 바탕으로 각 제조사 장비의 구조적 취약점을 꿰뚫고 있으며, 재발 없는 영구 보수를 보장합니다.
            </p>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gray-light border border-line p-8 rounded-2xl space-y-6 shadow-md">
              <h3 className="text-lg font-extrabold text-navy flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-brand-blue shrink-0" />
                <span>노후 열처리로 방치 시 발생하는 심각한 손실</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start pb-4 border-b border-line">
                  <div className="bg-red-50 border border-red-200 text-red-600 px-2 py-1 rounded text-[10px] font-mono shrink-0 mt-0.5 font-bold">CASE 01</div>
                  <div>
                    <p className="text-sm font-bold text-navy">단열 성능 노후화로 인한 전력·가스비 급증</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">열화된 세라믹 파이버 단열재는 복사 열손실을 일으켜 실내 온도를 높이고 막대한 에너지를 낭비하게 만듭니다.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start pb-4 border-b border-line">
                  <div className="bg-red-50 border border-red-200 text-red-600 px-2 py-1 rounded text-[10px] font-mono shrink-0 mt-0.5 font-bold">CASE 02</div>
                  <div>
                    <p className="text-sm font-bold text-navy">제어·센서 노후화에 의한 로내 온도 편차 및 불량률 증가</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">열선 성능 저하나 센서 편차를 방치하면 온도 분포도(Uniformity)가 붕괴되어 생산품의 경도 불균일 및 전량 폐기 손실이 발생합니다.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-red-50 border border-red-200 text-red-600 px-2 py-1 rounded text-[10px] font-mono shrink-0 mt-0.5 font-bold">CASE 03</div>
                  <div>
                    <p className="text-sm font-bold text-navy">긴급 정비 수리 지연으로 인한 전 공정 가동중단 사태</p>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">전문 정비망이 없는 대리점식 유지보수 업체를 쓰면 예비 부품 수급 및 숙련된 용접/제어 보수가 불가능해 가동 중단 기간이 길어집니다.</p>
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
