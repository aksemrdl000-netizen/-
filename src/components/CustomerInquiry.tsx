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
    { title: '성능 100% 복원', desc: '정밀 온도 보정 및 열선 재배치, 노체 균열 보강을 통해 신제품 수준의 높은 가열 성능과 온도 분배율을 되찾아 드립니다.' },
    { title: '독보적 에너지 절감', desc: '손상된 구형 단열재를 고밀도 세라믹 파이버로 전면 재시공하고 폐열 회수식 버너를 튜닝하여 전력·가스 소모를 즉시 줄입니다.' },
    { title: '불량률 제로 회복', desc: 'SCR 정밀 다구역 전력 제어반 및 고성능 디지털 PID 시스템으로 로내 온도 편차를 ±1℃ 이내로 극소화하여 열처리 하자를 예방합니다.' },
    { title: '유지 정비 비용 절감', desc: '외장식 교환 발열체 유닛 개조, 표준화된 고수명 소모품 적용으로 불필요한 사후 관리 및 수리비 지출을 영구 예방합니다.' },
    { title: '설비 수명 10년 연장', desc: '로체 골조 보강과 열변형 방지 지지 설계를 통해 신규 설비 교체 비용 대비 단 20~30%의 예산으로 사용 수명을 획기적으로 늘립니다.' }
  ];

  const consultSteps = [
    { num: '01', title: '전화 상담 및 애로 접수', desc: '고장 현상, 온도 편차, 버너 실화 상태 등 1차 진단' },
    { num: '02', title: '무상 현장 정밀 실사 및 정밀 진단', desc: '당사 수석 엔지니어가 직접 방문하여 로체 열화 및 열선 저항 정밀 계측' },
    { num: '03', title: '보수/개조 도면 및 투명 견적서 제안', desc: '과다 정비를 지양하고 필수 정비 내역 중심의 명확한 투명 내역서 산출' },
    { num: '04', title: '현장 신속 시공 및 시운전 검증', desc: '숙련된 기술진의 안전 밀착 정비 시공 및 가열 균일도(TUS) 최종 검증' }
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
              열처리로 보수·개조를 통한 설비 경쟁력 극대화
            </h2>
            <div className="h-1 w-12 bg-brand-blue mx-auto rounded-full" />
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
              기존 노후 설비를 리모델링하고 철저히 보수함으로써 실현되는 가동 안정성과 경영 효율성 가치입니다.
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
                  무료 노후 설비 진단 및 정비·개조 문의
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  정확한 정비 분석, 부식 상태 검사, 전장 계측 장비 노후도 실사를 위해 전문 엔지니어가 직접 무상 현장 진단을 지원합니다.
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
                      <h3 className="text-xl font-extrabold text-navy">정비 및 개조 상담 신청 완료</h3>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto font-medium">
                        성공적으로 기술 진단 의뢰서가 저장되었습니다. 담당 수석 엔지니어가 접수 즉시 연락처로 전화드려 긴급 유선 자문 및 방문 일정을 조율해 드립니다.
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
                        <label className="text-xs font-bold text-navy">정비/개조 대상 설비 종류</label>
                        <input
                          type="text"
                          placeholder="예: 대형 카타입 가스로 수리 / 제어반 개조"
                          value={furnaceType}
                          onChange={(e) => setFurnaceType(e.target.value)}
                          className="w-full bg-gray-light border border-line focus:border-brand-blue focus:bg-white text-navy rounded-xl px-4 py-3 text-sm focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">사용 가열 온도</label>
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
                      <label className="text-xs font-bold text-navy">현재 고장 증상 및 정비/개조 요청 내용 <span className="text-brand-blue">*</span></label>
                      <textarea
                        required
                        rows={4}
                        placeholder="예: 현재 단열재 이탈 현상이 발생하고 있거나, 로 내부 온도 편차가 벌어져 가공 불량이 납니다. 혹은 구형 전장 제어반을 고정밀 PLC 및 터치스크린으로 개조하고 싶습니다."
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
