import React from 'react';
import { Flame, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-slate-800 py-16 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 border-b border-slate-800">
          
          {/* Logo and Slogans */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-blue p-1.5 rounded-lg">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                광성산업
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
          <div className="space-y-4 md:pl-12">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wide">업무 시간 안내</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>• 공장 상시 가동 (설계/제조팀)</li>
              <li>• 기술 상담: 08:30 ~ 18:30 (평일/주말)</li>
              <li>• 현장 정밀 진단: 사전 조율 시 즉각 조치</li>
              <li>• 긴급 장애 대응 및 복구: 24시간 가동</li>
            </ul>
          </div>

        </div>

        {/* Bottom Company Legal Specs */}
        <div className="pt-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-[11px] leading-relaxed text-slate-500 font-medium">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-x-6 gap-y-1.5">
              <span className="text-slate-300 font-extrabold">광성산업</span>
              <span>사업자등록번호: <strong className="text-slate-400">140-04-58486</strong></span>
              <span>대표자: <strong className="text-slate-400">이희열</strong></span>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-1.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                <span>주소: 경기도 안산시 단원구 성곡동 779-15번지 광성산업</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                <span>이메일: LHY3394@NAVER.COM</span>
              </span>
            </div>

            <p className="pt-2 text-[10px] text-slate-600">
              상표권 고지: 본 사이트의 대형 산업용 카타입로, 강제순환식 분위기로 및 자동 제어 시스템 관련 이미지와 특허 설계안은 광성산업 고유 기술 지적재산권에 의해 보호받습니다. 무단 도용을 금합니다.
            </p>
          </div>

          <div className="shrink-0 text-slate-600 text-[10px] space-y-1 text-left lg:text-right font-medium">
            <p className="flex items-center lg:justify-end gap-1 font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>검증 및 정밀 납품 규격 통과 완료</span>
            </p>
            <p>© 2026 광성산업. All Rights Reserved.</p>
          </div>
        </div>

      </div>

    </footer>
  );
}
