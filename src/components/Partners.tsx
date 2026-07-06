import React from 'react';
import { Building2, CheckCircle2, ShieldCheck, Award, Factory, Zap, Target } from 'lucide-react';
import { SiteSettings } from '../types';

interface PartnersProps {
  siteSettings: SiteSettings;
}

export default function Partners({ siteSettings }: PartnersProps) {
  // Map icons based on tag or index
  const getIcon = (idx: number) => {
    const icons = [
      <Factory className="w-5 h-5 text-brand-blue" />,
      <Building2 className="w-5 h-5 text-brand-orange" />,
      <Zap className="w-5 h-5 text-brand-blue" />,
      <ShieldCheck className="w-5 h-5 text-brand-orange" />,
      <Award className="w-5 h-5 text-brand-blue" />,
      <Target className="w-5 h-5 text-brand-orange" />
    ];
    return icons[idx % icons.length];
  };

  return (
    <section id="partners" className="py-24 bg-[#f8fafc] relative overflow-hidden border-t border-b border-line">
      {/* Background Subtle Geometrics */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs text-brand-orange font-bold uppercase tracking-widest">Trusted Partners</p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            신뢰로 검증된 국내외 주요 거래처
          </h2>
          <div className="h-1 w-12 bg-brand-blue mx-auto rounded-full" />
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
            최상의 가열 정밀도와 신뢰성이 필수적인 글로벌 자동차 부품, 방위산업 및 초정밀 부품 제조 대기업들이 {siteSettings.companyName}과 함께하고 있습니다.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteSettings.partners && siteSettings.partners.map((client, idx) => {
            const accentColor = idx % 2 === 0 ? 'border-l-brand-blue' : 'border-l-brand-orange';
            return (
              <div
                key={client.id || idx}
                className={`bg-white border-y border-r border-line border-l-4 ${accentColor} p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-gray-light w-10 h-10 rounded-xl border border-line flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(idx)}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      idx % 2 === 0
                        ? 'bg-brand-blue/5 text-brand-blue border border-brand-blue/10'
                        : 'bg-brand-orange/5 text-brand-orange border border-brand-orange/20'
                    }`}>
                      {client.tag}
                    </span>
                  </div>
                  
                  <h3 className="font-extrabold text-navy text-base tracking-tight mb-1 group-hover:text-brand-blue transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold mb-3">{client.sector}</p>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {client.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center text-[11px] text-slate-400 font-bold">
                  <CheckCircle2 className={`w-4 h-4 mr-1.5 shrink-0 ${idx % 2 === 0 ? 'text-brand-blue' : 'text-brand-orange'}`} />
                  <span>정기 유지보수 및 제어시스템 정밀 개조</span>
                </div>
              </div>
            );
          })}

          {/* Plus / Etc Card */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-dashed border-slate-300 p-6 rounded-2xl flex flex-col justify-between shadow-sm min-h-[220px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-slate-400" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/50 text-slate-500 border border-slate-300">
                  And More
                </span>
              </div>
              <h3 className="font-extrabold text-slate-600 text-base tracking-tight mb-1">
                기타 다수의 제조 대기업
              </h3>
              <p className="text-[11px] text-slate-400 font-bold mb-3">글로벌 파트너십 확장</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                국내 최고 수준의 열처리 기술 협업 체계를 바탕으로 다수의 단조, 침탄, 소둔, 열처리 가공 전문 협력사 및 중견·대기업 정비 네트워크를 운영하고 있습니다.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center text-[11px] text-slate-400 font-bold">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-slate-400 shrink-0" />
              <span>전국 산업단지 열처리 설비 기술 제휴</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
