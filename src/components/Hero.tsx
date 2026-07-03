import React from 'react';
import { motion } from 'motion/react';
import { Flame, ChevronRight, FileText, ArrowRight } from 'lucide-react';

interface HeroProps {
  onScrollTo: (elementId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const steps = ['설계', '제작', '설치', '시운전', '유지보수'];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden pt-16"
    >
      {/* Background Industrial Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80"
          alt="산업용 열처리 공장"
          className="w-full h-full object-cover object-center opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/95" />
        {/* Subtle blue radial glows representing heat/furnace */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center md:text-left w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-brand-blue/10 border border-brand-blue/30 px-4 py-2 rounded-full text-brand-blue text-xs sm:text-sm font-bold tracking-wide"
            >
              <Flame className="w-4 h-4 text-brand-blue animate-pulse" />
              <span>기술로 완성하는 산업용 열처리로</span>
            </motion.div>

            {/* Slogans */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
              >
                산업용 열처리로 <br className="sm:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-amber-500">
                  전문 제작
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-200 font-medium max-w-2xl leading-relaxed"
              >
                고객의 생산성과 품질을 높이는 최적의 산업용 열처리 시스템
              </motion.p>
            </div>

            {/* One Stop Solution Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#1e293b]/60 backdrop-blur-sm border border-slate-800 p-5 rounded-2xl max-w-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-brand-blue font-bold text-sm tracking-widest uppercase">One-Stop Solution</span>
                <span className="text-xs text-slate-300">설계부터 유지보수까지 일괄 처리</span>
              </div>
              <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center">
                {steps.map((step, idx) => (
                  <div key={step} className="flex items-center">
                    <div className="flex-1 bg-navy/90 border border-slate-800 hover:border-brand-blue/40 rounded-xl py-3 px-1 sm:px-2 transition-all">
                      <p className="text-[10px] text-slate-500 font-mono mb-1">0{idx + 1}</p>
                      <p className="text-xs sm:text-sm font-bold text-slate-200">{step}</p>
                    </div>
                    {idx < steps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <button
                onClick={() => onScrollTo('portfolio')}
                className="group relative flex items-center justify-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-blue/20 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>포트폴리오 보기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onScrollTo('inquiry')}
                className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 text-white font-bold px-8 py-4 rounded-xl border border-white/30 hover:border-white transition-all duration-200 cursor-pointer"
              >
                <FileText className="w-5 h-5 text-brand-blue" />
                <span>무료 견적 문의</span>
              </button>
            </motion.div>

          </div>

          {/* Quick Stats Grid Side-Panel */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-navy/95 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden hero-circle-deco"
            >
              <div className="border-b border-slate-800 pb-4">
                <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Our Commitment</p>
                <h3 className="text-xl font-bold text-white mt-1">정직·검증·신용</h3>
              </div>

              <div className="space-y-4 font-medium">
                <div>
                  <p className="text-xs text-slate-400">신뢰 약속</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">"정직한 견적, 검증된 기술, 믿을 수 있는 품질"</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">핵심 가치</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">실력으로 증명하고, 신뢰로 장기 파트너십을 맺습니다.</p>
                </div>
                <div className="pt-2 flex items-center space-x-2 text-xs text-brand-blue font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>2026년 열처리 설계 표준 준수</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Decorative slant divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-light to-transparent z-10" />
    </section>
  );
}
