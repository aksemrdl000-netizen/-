import React, { useState, useEffect } from 'react';
import { Flame, Lock, LogOut, Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onAdminToggle: () => void;
  onLogout: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({
  isAdmin,
  onAdminToggle,
  onLogout,
  activeSection,
  onNavigate
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'why-us', label: '핵심경쟁력' },
    { id: 'process', label: '정비절차' },
    { id: 'portfolio', label: '보수실적' },
    { id: 'technology', label: '정비기술력' },
    { id: 'inquiry', label: '정비문의' },
  ];

  const handleItemClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b-2 border-navy shadow-md py-3'
          : 'bg-white border-b-2 border-navy py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="header-logo"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleItemClick('home')}
          >
            <div className="bg-brand-blue p-2 rounded-lg flex items-center justify-center shadow-md">
              <Flame className="w-5 h-5 text-brand-orange animate-pulse" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-navy flex items-center gap-1.5 leading-none">
                광성산업 <span className="text-brand-orange text-[10px] px-1.5 py-0.5 bg-brand-orange/5 border border-brand-orange/20 rounded font-bold">열처리로 전문</span>
              </span>
              <p className="text-[10px] text-brand-blue font-bold tracking-wider uppercase mt-1">Industrial Furnace Technology</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-3 py-2 rounded-md text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-brand-blue bg-slate-50 border-b-2 border-brand-blue rounded-b-none'
                    : 'text-navy hover:text-brand-blue hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Utility Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="tel:031-497-7671"
              id="header-phone-btn"
              className="flex items-center space-x-1.5 bg-slate-50 border border-line hover:border-brand-blue/50 text-slate-700 hover:text-navy px-3.5 py-2 rounded-lg text-xs font-bold transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-blue" />
              <span>031-497-7671</span>
            </a>

            {isAdmin ? (
              <button
                onClick={onLogout}
                id="header-logout-btn"
                className="flex items-center space-x-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>관리자 로그아웃</span>
              </button>
            ) : (
              <button
                onClick={onAdminToggle}
                id="header-admin-btn"
                className="flex items-center space-x-1.5 bg-navy hover:bg-slate-800 text-white border border-transparent px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-brand-orange" />
                <span>관리자 모드</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {isAdmin && (
              <button
                onClick={onLogout}
                className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-navy hover:text-brand-blue p-2 rounded-lg bg-slate-50 border border-line cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-menu-dropdown" className="md:hidden bg-white border-b-2 border-navy py-4 px-4 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-left px-4 py-3 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                  activeSection === item.id
                    ? 'bg-brand-blue/5 text-brand-blue border-l-4 border-brand-blue'
                    : 'text-navy hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-line flex flex-col space-y-2">
            <a
              href="tel:031-497-7671"
              className="flex items-center justify-center space-x-2 bg-slate-50 border border-line text-slate-700 py-3 rounded-lg text-xs sm:text-sm font-bold"
            >
              <PhoneCall className="w-4 h-4 text-brand-blue" />
              <span>031-497-7671 (전화상담)</span>
            </a>

            {!isAdmin ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAdminToggle();
                }}
                className="flex items-center justify-center space-x-2 bg-navy text-white py-3 rounded-lg text-xs sm:text-sm font-bold border border-transparent shadow-sm"
              >
                <Lock className="w-4 h-4 text-brand-blue" />
                <span>관리자 모드 로그인</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-3 rounded-lg text-xs sm:text-sm font-bold border border-red-200"
              >
                <LogOut className="w-4 h-4" />
                <span>관리자 로그아웃</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
