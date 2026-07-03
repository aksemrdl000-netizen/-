import React, { useState, useEffect } from 'react';
import { getStoredInquiries, saveInquiries } from '../data';
import { Inquiry } from '../types';
import { CheckCircle2, PhoneCall, MapPin, FileText, Send, Sparkles, AlertCircle, RefreshCw, Star } from 'lucide-react';

interface CustomerInquiryProps {
  preselectedModel: string;
  onClearPreselect: () => void;
}

export default function CustomerInquiry({ preselectedModel, onClearPreselect }: CustomerInquiryProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [furnaceType, setFurnaceType] = useState('');
  const [temperatureRequired, setTemperatureRequired] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle preselection pre-fill
  useEffect(() => {
    if (preselectedModel) {
      setFurnaceType(preselectedModel);
      // Automatically scroll to the form
      const el = document.getElementById('inquiry-form-card');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [preselectedModel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!companyName.trim() || !contactPerson.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('회사명, 담당자명, 연락처 및 문의 내용은 필수 기입 항목입니다.');
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      try {
        const currentList = getStoredInquiries();
        const newInquiry: Inquiry = {
          id: `inq-${Date.now()}`,
          companyName,
          contactPerson,
          phone,
          email: email || '미기입',
          furnaceType: furnaceType || '맞춤 제작 상담',
          temperatureRequired: temperatureRequired || '상담 후 설정',
          message,
          status: 'pending',
          createdAt: Date.now()
        };

        saveInquiries([newInquiry, ...currentList]);

        // Reset form
        setCompanyName('');
        setContactPerson('');
        setPhone('');
        setEmail('');
        setFurnaceType('');
        setTemperatureRequired('');
        setMessage('');
        onClearPreselect();
        
        setIsSuccess(true);
      } catch (err) {
        setErrorMsg('견적 제출 중 시스템 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1200);
  };

  const values = [
    { title: '생산성 향상', desc: '초고속 램프-업 속도와 정밀 자동 제어를 통해 가열 시간을 최적화하고 공장 1일 처리량을 극대화합니다.' },
    { title: '에너지 절감', desc: '리큐퍼레이터 버너 시스템 및 특수 축열 단열벽 설계로 기존 노후 장비 대비 가스·전력을 최대 30% 이상 절약합니다.' },
    { title: '균일한 품질', desc: '다구역 제어로 로내 가열 편차를 억제하여 잔류 응력과 변형을 완벽 제어, 균일하고 하자 없는 완성품을 인도합니다.' },
    { title: '유지관리 비용 절감', desc: '히터 교환이 쉬운 외장 장착식 구조와 고수명 내열 내식 강재 사용으로 불필요한 보수비 지출을 완전 봉쇄합니다.' },
    { title: '장비 수명 극대화', desc: '열팽창 완화 프레임 설계를 토대로 하여 초고온 운용 스트레스를 예방, 설계 내구 수명 15년 이상을 충족합니다.' }
  ];

  const consultSteps = [
    { num: '01', title: '전화 상담 및 접수', desc: '간단 조건 파악' },
    { num: '02', title: '무상 현장 정밀 실사', desc: '인입 전기/가스 동선 파악' },
    { num: '03', title: '설계안 및 투명 견적 제안', desc: '최종 가격 확정' },
    { num: '04', title: '일괄 책임 제작 및 설치', desc: '시운전 및 안전 검사' }
  ];

  return (
    <section id="inquiry" className="py-24 bg-white relative border-t border-line overflow-hidden">
      {/* Visual glowing heat circle */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 9: 고객이 얻는 가치 */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Customer Value Addition</p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              열처리로 제작을 통한 미래 경쟁력 확보
            </h2>
            <div className="h-1 w-12 bg-brand-blue mx-auto rounded-full" />
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
              설비를 새로 제작하거나 노후 장비를 업그레이드할 때 고객사에 가져올 핵심 경영학적 가치입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => (
              <div
                key={v.title}
                className="bg-gray-light border border-line hover:border-brand-blue/40 p-6 rounded-2xl relative transition-all shadow-sm"
              >
                <div className="absolute top-4 right-4 text-xs font-mono font-extrabold text-brand-blue/30">
                  VALUE 0{idx + 1}
                </div>
                <div className="bg-white border border-line w-10 h-10 rounded-lg flex items-center justify-center mb-5">
                  <Star className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="text-base font-extrabold text-navy mb-2 tracking-tight">{v.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 10: 문의하기 */}
        <div className="border-t border-line pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Consultation steps */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Consultation Request</p>
                <h2 className="font-display text-3xl font-extrabold text-navy tracking-tight">
                  무료 기술 자문 및 견적 문의
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  견적 산정 및 설치 동선 확인을 위해 엔지니어가 무상 현장 실사를 지원합니다. 부담 없이 연락해주십시오.
                </p>
              </div>

              {/* Steps of Consulting */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">간편 상담 진행 절차</h3>
                <div className="space-y-4">
                  {consultSteps.map((step) => (
                    <div key={step.num} className="flex gap-4 items-start">
                      <div className="bg-brand-blue/5 text-brand-blue font-mono font-bold text-xs px-2.5 py-1 rounded-md border border-brand-blue/20 shrink-0">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-navy">{step.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call support */}
              <div className="bg-gray-light border border-line p-6 rounded-2xl flex items-center space-x-4 shadow-sm">
                <div className="bg-brand-blue p-3 rounded-xl shadow shadow-brand-blue/10">
                  <PhoneCall className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold">전화 직통 기술 상담 (평일/주말 상시 대응)</p>
                  <p className="text-lg sm:text-xl font-extrabold text-navy tracking-tight mt-1">010-1234-5678</p>
                </div>
              </div>

            </div>

            {/* Interactive Form Card */}
            <div className="lg:col-span-7" id="inquiry-form-card">
              <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />

                {preselectedModel && (
                  <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-3 mb-6 flex items-center justify-between">
                    <span className="text-xs text-brand-blue font-bold">
                      선택 모델: <strong>{preselectedModel}</strong>
                    </span>
                    <button
                      onClick={onClearPreselect}
                      className="text-[10px] bg-gray-light border border-line text-slate-500 hover:text-navy px-2 py-1 rounded cursor-pointer"
                    >
                      변경
                    </button>
                  </div>
                )}

                {isSuccess ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="bg-brand-blue/10 border border-brand-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow">
                      <CheckCircle2 className="w-10 h-10 text-brand-blue" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-navy">견적 상담 신청 완료</h3>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto font-medium">
                        성공적으로 견적 의뢰서가 저장되었습니다. 담당 수석 엔지니어가 접수 즉시 기재하신 연락처로 전화드려 1차 유선 컨설팅을 제공하겠습니다.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="bg-gray-light hover:bg-slate-100 border border-line text-slate-600 hover:text-navy px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      새로운 문의 등록
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {errorMsg && (
                      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-2 text-xs text-red-500">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">회사명 <span className="text-brand-blue">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="예: 삼우정밀(주)"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full bg-gray-light border border-line focus:border-brand-blue focus:bg-white text-navy rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">담당자 직책 및 성함 <span className="text-brand-blue">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="예: 이재혁 부장"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                          className="w-full bg-gray-light border border-line focus:border-brand-blue focus:bg-white text-navy rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">연락처 <span className="text-brand-blue">*</span></label>
                        <input
                          type="tel"
                          required
                          placeholder="예: 010-1234-5678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-gray-light border border-line focus:border-brand-blue focus:bg-white text-navy rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">이메일 주소</label>
                        <input
                          type="email"
                          placeholder="예: contact@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-gray-light border border-line focus:border-brand-blue focus:bg-white text-navy rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">희망 설비 종류</label>
                        <input
                          type="text"
                          placeholder="예: 대형 카타입 열처리로"
                          value={furnaceType}
                          onChange={(e) => setFurnaceType(e.target.value)}
                          className="w-full bg-gray-light border border-line focus:border-brand-blue focus:bg-white text-navy rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">사용 희망 온도</label>
                        <input
                          type="text"
                          placeholder="예: 상용 950℃ / 최대 1,100℃"
                          value={temperatureRequired}
                          onChange={(e) => setTemperatureRequired(e.target.value)}
                          className="w-full bg-gray-light border border-line focus:border-brand-blue focus:bg-white text-navy rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy">추가 상세 의뢰 내용 <span className="text-brand-blue">*</span></label>
                      <textarea
                        required
                        rows={4}
                        placeholder="예: 열처리하고자 하는 제품 규격, 일평균 가열 물량, 신규 설치 공장 장소 등을 간략히 적어주시면 훨씬 심도 높은 1차 견적 분석이 가능합니다."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-gray-light border border-line focus:border-brand-blue focus:bg-white text-navy rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-slate-400 font-medium resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center space-x-2 bg-brand-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow shadow-brand-blue/10 transition-all cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>견적 요청 분석 및 접수 중...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-white" />
                            <span>무상 현장 실사 및 무료 견적 신청하기</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 text-center leading-relaxed font-medium">
                      * 접수 즉시 회사 개인정보 보호 지침에 의해 암호화 보관되며, 오직 견적 자문 용도 외에는 일절 사용하지 않습니다.
                    </p>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
