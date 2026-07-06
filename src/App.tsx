import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import CompanyIntro from './components/CompanyIntro';
import ProcessTimeline from './components/ProcessTimeline';
import Portfolio from './components/Portfolio';
import Partners from './components/Partners';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

import { PortfolioItem, Inquiry, SiteSettings } from './types';
import { getStoredPortfolio, getStoredInquiries, getStoredSiteSettings } from './data';
import { Lock, X, Check, ShieldAlert, ArrowRight, Flame } from 'lucide-react';

export default function App() {
  // Database States
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  // UI States
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Cross-component communication (Pre-selecting a model for Quote)
  const [preselectedModel, setPreselectedModel] = useState('');
  
  // Navigation active state tracker
  const [activeSection, setActiveSection] = useState('home');

  // Load Initial Data
  useEffect(() => {
    // Initial sync from local storage for instant render
    const localPortfolio = getStoredPortfolio();
    const localInquiries = getStoredInquiries();
    const localSettings = getStoredSiteSettings();
    setPortfolio(localPortfolio);
    setInquiries(localInquiries);
    setSiteSettings(localSettings);

    // Fetch fresh data from backend server if available
    const fetchServerData = async () => {
      try {
        const settingsRes = await fetch('/api/site-settings');
        if (settingsRes.ok) {
          const serverSettings = await settingsRes.json();
          if (serverSettings) {
            setSiteSettings(serverSettings);
            localStorage.setItem('furnace_app_site_settings', JSON.stringify(serverSettings));
          }
        }
      } catch (err) {
        console.warn('Could not fetch site settings from server, using local cache:', err);
      }

      try {
        const portfolioRes = await fetch('/api/portfolio');
        if (portfolioRes.ok) {
          const serverPortfolio = await portfolioRes.json();
          if (serverPortfolio) {
            setPortfolio(serverPortfolio);
            localStorage.setItem('furnace_app_portfolio_items', JSON.stringify(serverPortfolio));
          }
        }
      } catch (err) {
        console.warn('Could not fetch portfolio from server, using local cache:', err);
      }
    };

    fetchServerData();
  }, []);

  // Monitor Scroll to update active header nav item
  useEffect(() => {
    if (isAdmin) return; // Disable scroll tracking while inside Admin Panel

    const handleScroll = () => {
      const sections = ['home', 'why-us', 'process', 'portfolio', 'partners'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin]);

  // Handle section jumping
  const handleScrollTo = (sectionId: string) => {
    if (isAdmin) {
      // Exit admin view to scroll to section
      setIsAdmin(false);
    }
    
    setActiveSection(sectionId);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Secure admin passcode check
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1111') {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPasswordError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
    }
  };

  // Admin Logout
  const handleAdminLogout = () => {
    setIsAdmin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Selecting a specific project model for custom quote pre-fill
  const handleSelectProjectForQuote = (projectName: string) => {
    setPreselectedModel(projectName);
    handleScrollTo('inquiry');
  };

  if (!siteSettings) {
    return <div className="min-h-screen bg-navy flex items-center justify-center text-white">로딩 중...</div>;
  }

  return (
    <div className="bg-gray-light min-h-screen text-slate-700 font-sans selection:bg-brand-blue selection:text-white">
      
      {/* Sticky Header Nav */}
      <Header
        isAdmin={isAdmin}
        onAdminToggle={() => setShowPasswordModal(true)}
        onLogout={handleAdminLogout}
        activeSection={activeSection}
        onNavigate={handleScrollTo}
        siteSettings={siteSettings}
      />

      {/* Conditionally Render ADMIN PANEL or CORPORATE FRONTEND */}
      {isAdmin ? (
        <AdminPanel
          portfolio={portfolio}
          inquiries={inquiries}
          onUpdatePortfolio={setPortfolio}
          onUpdateInquiries={setInquiries}
          onClose={handleAdminLogout}
          siteSettings={siteSettings}
          onUpdateSiteSettings={setSiteSettings}
        />
      ) : (
        <main>
          {/* Section 2: Hero Section */}
          <Hero onScrollTo={handleScrollTo} siteSettings={siteSettings} />

          {/* Section 3: Why Choose Us (우리를 선택해야 하는 이유) */}
          <WhyChooseUs siteSettings={siteSettings} />

          {/* Section 4: Company Intro (회사 소개) */}
          <CompanyIntro siteSettings={siteSettings} />

          {/* Section 5: Manufacturing Process Timeline (제작 과정) */}
          <ProcessTimeline />

          {/* Section 6: Portfolio Catalog (포트폴리오) */}
          <Portfolio
            items={portfolio}
            onSelectProjectForQuote={handleSelectProjectForQuote}
          />

          {/* Section 6.5: Main Clients (주요 거래처) */}
          <Partners siteSettings={siteSettings} />
        </main>
      )}

      {/* Footer Section (Includes Business Meta details & Kakao Link) */}
      <Footer siteSettings={siteSettings} />

      {/* Secure Admin Access Modal Password Dialog */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
          <div className="bg-white border border-line rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 relative">
            
            {/* Close */}
            <button
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordInput('');
                setPasswordError('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-navy cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="text-center space-y-2">
              <div className="bg-brand-blue/10 border border-brand-blue/20 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-extrabold text-navy tracking-tight">관리자 시스템 접속</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                포트폴리오 업로드 및 견적의뢰 내역 관리를 위해<br />
                관리자 비밀번호를 입력해주십시오.
              </p>
            </div>

            {/* Password input form */}
            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Access Code (비밀번호)</label>
                <input
                  type="password"
                  autoFocus
                  placeholder="관리자 인증 비밀번호 기입"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  className="w-full bg-gray-light border border-line focus:border-brand-blue text-center text-navy tracking-widest text-lg font-bold rounded-xl px-4 py-3 focus:outline-none transition-all placeholder:text-slate-400 placeholder:tracking-normal"
                />
              </div>

              {passwordError && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-[11px] text-red-500 font-medium flex items-center gap-1.5 justify-center">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{passwordError}</span>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordInput('');
                    setPasswordError('');
                  }}
                  className="flex-1 bg-gray-light hover:bg-slate-100 text-slate-500 border border-line py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-1 bg-brand-blue hover:bg-blue-600 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-blue/10 cursor-pointer"
                >
                  <span>인증 및 로그인</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="bg-gray-light p-3 rounded-lg border border-line text-[10px] text-slate-500 text-center font-medium">
              안내: 테스트용 관리자 마스터 비밀번호는 <strong>1111</strong> 입니다.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
