import React, { useState } from 'react';
import { Flame, Mail, MapPin, Phone, MessageCircle, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [showKakaoToast, setShowKakaoToast] = useState(false);

  const triggerKakao = () => {
    setShowKakaoToast(true);
    setTimeout(() => {
      setShowKakaoToast(false);
    }, 4000);
  };

  return (
    <footer className="bg-navy border-t border-slate-800 py-16 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Logo and Slogans */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-blue p-1.5 rounded-lg">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                (주)광성산업
              </span>
            </div>
            <p className="text-slate-200 leading-relaxed max-w-sm font-semibold">
              "실력으로 증명하고 신뢰로 이어갑니다."
            </p>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              우수한 온도 복원력과 뛰어난 열손실 방지 시공, 그리고 철저한 긴급 출동 정비 시스템으로 고객사 열처리 설비의 가동율을 극대화합니다.
            </p>
          </div>

          {/* Core Menu Quick-links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wide">업무 시간 안내</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>• 공장 상시 가동 (설계/제조팀)</li>
              <li>• 기술 상담: 08:30 ~ 18:30 (평일/주말)</li>
              <li>• 현장 정밀 진단: 사전 조율 시 즉각 조치</li>
              <li>• 긴급 장애 대응 및 복구: 24시간 가동</li>
            </ul>
          </div>

          {/* Socials / Kakaotalk Action */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wide">온라인 즉시 연결</h4>
            <div className="space-y-3">
              <button
                onClick={triggerKakao}
                className="w-full flex items-center justify-center space-x-2 bg-[#FEE500] hover:bg-[#FCE000] text-[#191919] font-bold py-3 px-4 rounded-xl transition-all shadow hover:shadow-[#FEE500]/10 cursor-pointer text-xs"
              >
                <MessageCircle className="w-5 h-5 fill-[#191919] text-[#191919]" />
                <span>카카오톡 1:1 실시간 기술 문의</span>
              </button>

              <a
                href="tel:010-1234-5678"
                className="w-full flex items-center justify-center space-x-2 bg-slate-800/80 hover:bg-slate-850 border border-slate-700 text-slate-200 hover:text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-xs"
              >
                <Phone className="w-4 h-4 text-brand-blue" />
                <span>긴급 전화 연결: 010-1234-5678</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Company Legal Specs */}
        <div className="pt-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-[11px] leading-relaxed text-slate-500 font-medium">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-x-6 gap-y-1.5">
              <span className="text-slate-300 font-extrabold">(주)광성산업</span>
              <span>사업자등록번호: <strong className="text-slate-400">123-45-67890</strong></span>
              <span>대표자: <strong className="text-slate-400">이광성</strong></span>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-1.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                <span>주소: 경기도 시흥시 시화벤처로 234번길 88 (시화공단 3나동)</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                <span>이메일: contact@kwangsung-furnace.co.kr</span>
              </span>
            </div>

            <p className="pt-2 text-[10px] text-slate-600">
              상표권 고지: 본 사이트의 대형 산업용 카타입로, 강제순환식 분위기로 및 자동 제어 시스템 관련 이미지와 특허 설계안은 (주)광성산업 고유 기술 지적재산권에 의해 보호받습니다. 무단 도용을 금합니다.
            </p>
          </div>

          <div className="shrink-0 text-slate-600 text-[10px] space-y-1 text-left lg:text-right font-medium">
            <p className="flex items-center lg:justify-end gap-1 font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>검증 및 정밀 납품 규격 통과 완료</span>
            </p>
            <p>© 2026 (주)광성산업. All Rights Reserved.</p>
          </div>
        </div>

      </div>

      {/* Kakao Toast simulation popup */}
      {showKakaoToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-[#FEE500]/30 text-white rounded-2xl p-4 shadow-2xl max-w-sm animate-bounce flex items-start gap-3">
          <div className="bg-[#FEE500] p-2 rounded-xl text-[#191919] shrink-0">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h5 className="font-extrabold text-white text-xs">카카오톡 상담 채널 (주)광성산업</h5>
            <p className="text-[11px] text-slate-400 mt-1 leading-normal font-medium">
              이재혁 수석 부장(설계전문) 1:1 상담방으로 연결됩니다. 실제 카카오톡 모바일/PC 채널을 연동하여 상세 3D CAD 검토를 시작합니다.
            </p>
            <div className="mt-2 text-[10px] text-amber-400 font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>실제 운영 시에는 카카오톡 비즈니스 채널 URL로 이동합니다.</span>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
