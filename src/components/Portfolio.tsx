import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { Clock, Thermometer, Maximize2, CheckCircle, ArrowUpRight, Sparkles, X, FileText, PhoneCall } from 'lucide-react';

interface PortfolioProps {
  items: PortfolioItem[];
  onSelectProjectForQuote: (projectName: string) => void;
}

export default function Portfolio({ items, onSelectProjectForQuote }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleOpenModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setActiveImageIndex(0);
  };

  // Extract unique categories dynamically
  const categories = ['전체', '대형 산업로', '맞춤 제작'];

  const filteredItems = selectedCategory === '전체'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-white border-t border-b border-line relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-xs text-brand-blue font-bold uppercase tracking-widest">Our Accomplishments</p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              실력으로 증명한 제작 포트폴리오
            </h2>
            <div className="h-1 w-12 bg-brand-blue rounded-full mx-auto md:mx-0" />
            <p className="text-slate-500 text-sm max-w-2xl leading-relaxed font-medium">
              고객사의 생산 요구사항에 맞춤 제작하여 성공적으로 인도하고 상업 가동 중인 실제 산업로 실적물입니다.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 bg-gray-light border border-line p-1.5 rounded-xl self-center md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-tight transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-blue text-white shadow shadow-brand-blue/10'
                    : 'text-slate-500 hover:text-navy hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-light border border-line rounded-2xl">
            <p className="text-slate-500 font-medium">선택하신 카테고리의 포트폴리오가 존재하지 않습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenModal(item)}
                className="group bg-white border border-line hover:border-brand-blue/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
              >
                {/* Image Wrap */}
                <div className="relative aspect-video overflow-hidden bg-gray-light shrink-0">
                  <img
                    src={(item.images && item.images.length > 0) ? item.images[0] : item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-brand-blue text-white font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                    {item.category}
                  </span>

                  {/* Multiple Images Badge Indicator */}
                  {item.images && item.images.length > 1 && (
                    <span className="absolute bottom-4 right-4 bg-navy/80 backdrop-blur-sm text-white font-extrabold text-[9px] px-2 py-1 rounded-md flex items-center gap-1 shadow">
                      <span>사진 {item.images.length}장</span>
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-center items-center text-center">
                  <h3 className="text-sm sm:text-base font-extrabold text-navy group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="mt-2.5 flex items-center justify-center gap-1 text-[11px] font-extrabold text-brand-blue hover:underline">
                    <span>사진 보기</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Project addition notice for visitors */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-medium">
            * 프로젝트 포트폴리오는 지속적으로 성실히 업로드되고 있습니다. 주문형 맞춤 설계 상담은 언제든 환영합니다.
          </p>
        </div>

      </div>

      {/* Portfolio Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-white border border-line rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8">
            
            {/* Header image in modal */}
            {(() => {
              const itemImages = selectedItem.images && selectedItem.images.length > 0 ? selectedItem.images : [selectedItem.image];
              const currentImgSrc = itemImages[activeImageIndex] || selectedItem.image;
              return (
                <>
                  <div className="relative h-72 sm:h-[450px] bg-slate-950 flex items-center justify-center">
                    <img
                      src={currentImgSrc}
                      alt={selectedItem.title}
                      className="max-w-full max-h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-4 right-4 bg-white/95 border border-line hover:border-brand-blue text-slate-500 hover:text-navy p-2 rounded-full transition-all cursor-pointer z-10 shadow-sm"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-6 left-6 right-6 pointer-events-none z-10">
                      <span className="bg-brand-blue text-white text-[10px] font-bold px-2.5 py-1 rounded mb-2 inline-block tracking-wider uppercase shadow">
                        {selectedItem.category}
                      </span>
                      <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight drop-shadow-md">
                        {selectedItem.title}
                      </h3>
                    </div>
                  </div>

                  {/* Thumbnail Selector Row */}
                  {itemImages.length > 1 && (
                    <div className="bg-gray-light border-b border-line px-6 py-3.5 flex gap-2 overflow-x-auto scrollbar-thin">
                      {itemImages.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                            activeImageIndex === idx
                              ? 'border-brand-blue scale-[1.05] shadow-sm'
                              : 'border-transparent hover:border-slate-300 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`슬라이드 ${idx + 1}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}

            {/* Modal Action Buttons */}
            <div className="p-6 bg-gray-light border-t border-line flex flex-col sm:flex-row gap-3">
              <a
                href="tel:031-497-7671"
                className="flex-1 flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow shadow-brand-blue/10 transition-all cursor-pointer text-center"
              >
                <PhoneCall className="w-4.5 h-4.5 text-white animate-pulse" />
                <span>직통 전화 문의 (031-497-7671)</span>
              </a>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-navy rounded-xl text-xs sm:text-sm font-bold border border-line transition-all cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
