import React, { useState } from 'react';
import { PortfolioItem, Inquiry, SiteSettings } from '../types';
import { getStoredPortfolio, savePortfolio, getStoredInquiries, saveInquiries, INITIAL_PORTFOLIO, saveSiteSettings } from '../data';
import { Lock, Plus, Trash2, Edit, Save, X, Eye, FileText, CheckCircle2, RefreshCw, Star, Info, Hammer, Sparkles, MessageSquare, Flame, Upload, ImageIcon, Download, Clipboard, Check, Settings, ShieldCheck, AlignLeft, Building2 } from 'lucide-react';

interface AdminPanelProps {
  portfolio: PortfolioItem[];
  inquiries: Inquiry[];
  onUpdatePortfolio: (updated: PortfolioItem[]) => void;
  onUpdateInquiries: (updated: Inquiry[]) => void;
  onClose: () => void;
  siteSettings: SiteSettings;
  onUpdateSiteSettings: (updated: SiteSettings) => void;
}

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 800; // 최대 800px 너비/높이 제한으로 저장이 원활하게 함
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressed);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = (err) => reject(err);
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export default function AdminPanel({
  portfolio,
  inquiries,
  onUpdatePortfolio,
  onUpdateInquiries,
  onClose,
  siteSettings,
  onUpdateSiteSettings
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'inquiries' | 'siteSettings'>('portfolio');
  
  // Site Settings Form States
  const [settingsCompany, setSettingsCompany] = useState(siteSettings.companyName || '');
  const [settingsRepresentative, setSettingsRepresentative] = useState(siteSettings.ceoName || '');
  const [settingsEstablishedYear, setSettingsEstablishedYear] = useState(siteSettings.establishedYear || '1988');
  const [settingsRegNumber, setSettingsRegNumber] = useState(siteSettings.businessNumber || '');
  const [settingsAddress, setSettingsAddress] = useState(siteSettings.address || '');
  const [settingsFax, setSettingsFax] = useState(siteSettings.fax || '');
  const [settingsEmail, setSettingsEmail] = useState(siteSettings.email || '');
  const [settingsPhone, setSettingsPhone] = useState(siteSettings.phone || '');
  
  const [settingsHeroBadge, setSettingsHeroBadge] = useState(siteSettings.heroBadge || '');
  const [settingsHeroTitle, setSettingsHeroTitle] = useState(siteSettings.heroTitle || '');
  const [settingsHeroSubtitle, setSettingsHeroSubtitle] = useState(siteSettings.heroSubtitle || '');
  const [settingsHeroImage, setSettingsHeroImage] = useState(siteSettings.heroImage || '');
  
  const [settingsIntroTitle, setSettingsIntroTitle] = useState(siteSettings.introTitle || '');
  const [settingsIntroText1, setSettingsIntroText1] = useState(siteSettings.introText1 || '');
  const [settingsIntroText2, setSettingsIntroText2] = useState(siteSettings.introText2 || '');
  const [settingsIntroQuote, setSettingsIntroQuote] = useState(siteSettings.introQuote || '');
  
  // Highlights 및 Partners 편집용 상태
  const [settingsHighlights, setSettingsHighlights] = useState(siteSettings.introHighlights || []);
  const [settingsPartners, setSettingsPartners] = useState(siteSettings.partners || []);

  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerSector, setNewPartnerSector] = useState('');
  const [newPartnerDesc, setNewPartnerDesc] = useState('');
  const [newPartnerTag, setNewPartnerTag] = useState('자동차 부품');

  // Server upload helper for images
  const uploadToServer = async (base64Image: string): Promise<string> => {
    // Vercel, Netlify, Github Pages 등 서버리스/스태틱 배포 환경에서는
    // 업로드 폴더(/public/uploads)가 영구 유지되지 않으므로 base64를 직접 데이터로 저장합니다.
    const isServerless = typeof window !== 'undefined' && (
      window.location.hostname.includes('vercel') ||
      window.location.hostname.includes('netlify') ||
      window.location.hostname.includes('amplify') ||
      window.location.hostname.includes('github.io') ||
      window.location.hostname.includes('firebaseapp') ||
      window.location.hostname.includes('web.app')
    );

    if (isServerless) {
      console.log('Serverless environment detected (Vercel/etc). Preserving image as base64 directly.');
      return base64Image;
    }

    try {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image })
      });
      if (res.ok) {
        const data = await res.json();
        return data.url;
      }
      return base64Image;
    } catch (err) {
      console.error('Failed uploading image to server, falling back to base64:', err);
      return base64Image;
    }
  };

  // Portfolio CRUD States
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Form fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('대형 산업로');
  const [formImage, setFormImage] = useState('');
  const [formImages, setFormImages] = useState<string[]>([]);
  const [manualUrlInput, setManualUrlInput] = useState('');
  const [formDuration, setFormDuration] = useState('');
  const [formSize, setFormSize] = useState('');
  const [formTemperature, setFormTemperature] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Backup & Code Export States
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Backup & Import Handlers
  const handleExportJSON = () => {
    try {
      const dataStr = JSON.stringify(portfolio, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `kwangsung_portfolio_${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (err) {
      alert('백업 파일 생성에 실패했습니다.');
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const isValid = parsed.every(item => item && typeof item === 'object' && 'id' in item && 'title' in item);
          if (isValid) {
            if (confirm(`불러온 백업 파일에서 ${parsed.length}개의 포트폴리오를 가져오시겠습니까? 기존의 모든 실적 데이터가 덮어씌워집니다.`)) {
              savePortfolio(parsed);
              onUpdatePortfolio(parsed);
              alert('백업 데이터를 성공적으로 불러왔습니다!');
            }
          } else {
            alert('올바르지 않은 백업 파일 양식입니다.');
          }
        } else {
          alert('올바르지 않은 백업 파일 양식입니다. (JSON 배열이 아닙니다.)');
        }
      } catch (error) {
        alert('백업 파일을 읽는 도중 오류가 발생했습니다. 파일 형식을 확인해주세요.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCopyCode = () => {
    const codeStr = JSON.stringify(portfolio, null, 2);
    navigator.clipboard.writeText(codeStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      alert('자동 복사에 실패했습니다. 아래 텍스트를 직접 드래그하여 복사해 주세요.');
    });
  };

  // File Upload & Compression handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImage(files[i]);
        const url = await uploadToServer(compressed);
        uploadedUrls.push(url);
      } catch (error) {
        console.error('이미지 압축 또는 업로드 중 오류 발생:', error);
      }
    }
    
    if (uploadedUrls.length > 0) {
      setFormImages(prev => [...prev, ...uploadedUrls]);
    }
    // Reset target value so same files can be re-uploaded if needed
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (!files) return;
    
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImage(files[i]);
        const url = await uploadToServer(compressed);
        uploadedUrls.push(url);
      } catch (error) {
        console.error('이미지 압축 또는 업로드 중 오류 발생:', error);
      }
    }
    
    if (uploadedUrls.length > 0) {
      setFormImages(prev => [...prev, ...uploadedUrls]);
    }
  };

  const handleAddUrlImage = () => {
    if (manualUrlInput.trim()) {
      setFormImages(prev => [...prev, manualUrlInput.trim()]);
      setManualUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSetRepresentative = (index: number) => {
    if (index === 0) return;
    setFormImages(prev => {
      const next = [...prev];
      const [target] = next.splice(index, 1);
      return [target, ...next];
    });
  };

  // Open Edit Form
  const startEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsAddingNew(false);
    
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormImage(item.image);
    setFormImages(item.images || (item.image ? [item.image] : []));
    setManualUrlInput('');
    setFormDuration(item.duration);
    setFormSize(item.size);
    setFormTemperature(item.temperature);
    setFormFeatures(item.features.join(', '));
    setFormDescription(item.description);

    // Scroll to form
    setTimeout(() => {
      document.getElementById('admin-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Open Add Form
  const startAdd = () => {
    setEditingItem(null);
    setIsAddingNew(true);

    setFormTitle('');
    setFormCategory('대형 산업로');
    // Set a high quality random heavy machinery picture as fallback
    const defaultImg = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80';
    setFormImage(defaultImg);
    setFormImages([defaultImg]);
    setManualUrlInput('');
    setFormDuration('-');
    setFormSize('-');
    setFormTemperature('-');
    setFormFeatures('');
    setFormDescription('새롭게 설계 인도된 맞춤 가열 및 정밀 분위기 전기로 시스템입니다.');

    // Scroll to form
    setTimeout(() => {
      document.getElementById('admin-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Save Portfolio Item (Add or Edit)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const featureList = formFeatures
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    let updatedList: PortfolioItem[] = [];
    const mainImg = formImages[0] || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80';
    const imagesToSave = formImages.length > 0 ? formImages : [mainImg];

    if (isAddingNew) {
      const newItem: PortfolioItem = {
        id: `p-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        image: mainImg,
        images: imagesToSave,
        duration: formDuration,
        size: formSize,
        temperature: formTemperature,
        features: featureList,
        description: formDescription,
        createdAt: Date.now()
      };
      updatedList = [newItem, ...portfolio];
    } else if (editingItem) {
      updatedList = portfolio.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            title: formTitle,
            category: formCategory,
            image: mainImg,
            images: imagesToSave,
            duration: formDuration,
            size: formSize,
            temperature: formTemperature,
            features: featureList,
            description: formDescription
          };
        }
        return item;
      });
    }

    savePortfolio(updatedList);
    onUpdatePortfolio(updatedList);

    // Sync with backend Express Server to write file in repository
    fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedList)
    }).catch(err => console.error('Failed to sync portfolio to server:', err));
    
    // Reset form state
    setEditingItem(null);
    setIsAddingNew(false);
  };

  // Delete Portfolio Item
  const handleDeletePortfolio = (id: string) => {
    if (confirm('이 포트폴리오 프로젝트 실적을 정말 영구 삭제하시겠습니까?')) {
      const updated = portfolio.filter(item => item.id !== id);
      savePortfolio(updated);
      onUpdatePortfolio(updated);
      
      // Sync with backend Express Server to write file in repository
      fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      }).catch(err => console.error('Failed to sync deleted portfolio to server:', err));

      if (editingItem?.id === id) {
        setEditingItem(null);
      }
    }
  };

  // Restore Default Samples
  const handleRestoreSamples = () => {
    if (confirm('샘플 포트폴리오 데이터(5개 기본 내역)로 복원하시겠습니까? (추가하신 내역은 사라집니다)')) {
      savePortfolio(INITIAL_PORTFOLIO);
      onUpdatePortfolio(INITIAL_PORTFOLIO);

      // Sync with backend Express Server to write file in repository
      fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(INITIAL_PORTFOLIO)
      }).catch(err => console.error('Failed to sync restored portfolio to server:', err));

      setEditingItem(null);
      setIsAddingNew(false);
    }
  };

  // Update Inquiry Status (Pending -> Completed)
  const toggleInquiryStatus = (id: string) => {
    const updated = inquiries.map(inq => {
      if (inq.id === id) {
        return {
          ...inq,
          status: inq.status === 'pending' ? ('completed' as const) : ('pending' as const)
        };
      }
      return inq;
    });
    saveInquiries(updated);
    onUpdateInquiries(updated);
  };

  // Delete Inquiry Log
  const handleDeleteInquiry = (id: string) => {
    if (confirm('이 고객 견적 상담 내역을 영구 삭제하시겠습니까?')) {
      const updated = inquiries.filter(inq => inq.id !== id);
      saveInquiries(updated);
      onUpdateInquiries(updated);
    }
  };

  // Save All Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedSettings: SiteSettings = {
      companyName: settingsCompany,
      ceoName: settingsRepresentative,
      establishedYear: settingsEstablishedYear,
      phone: settingsPhone,
      fax: settingsFax,
      email: settingsEmail,
      address: settingsAddress,
      businessNumber: settingsRegNumber,
      
      heroTitle: settingsHeroTitle,
      heroSubtitle: settingsHeroSubtitle,
      heroImage: settingsHeroImage,
      heroBadge: settingsHeroBadge,
      
      introTitle: settingsIntroTitle,
      introText1: settingsIntroText1,
      introText2: settingsIntroText2,
      introQuote: settingsIntroQuote,
      introHighlights: settingsHighlights,
      
      partners: settingsPartners
    };
    
    saveSiteSettings(updatedSettings);
    onUpdateSiteSettings(updatedSettings);
    
    // Save to server
    try {
      const res = await fetch('/api/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });
      if (res.ok) {
        alert('홈페이지 전체 정보가 완벽히 저장되었습니다! 이 데이터는 깃허브에 영구 저장 가능하도록 기록되었습니다.');
      } else {
        alert('브라우저에는 임시 저장되었으나, 서버 파일 저장에 실패했습니다.');
      }
    } catch (err) {
      console.error('Failed to save settings to server:', err);
      alert('서버 연결 실패로 로컬 브라우저에만 저장되었습니다.');
    }
  };

  // Upload Hero image background
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const compressed = await compressImage(files[0]);
      const url = await uploadToServer(compressed);
      setSettingsHeroImage(url);
    } catch (err) {
      console.error('Hero 이미지 업로드 실패:', err);
    }
  };

  // Manage highlights inline
  const handleHighlightChange = (index: number, field: 'title' | 'desc', value: string) => {
    setSettingsHighlights(prev => prev.map((hl, i) => i === index ? { ...hl, [field]: value } : hl));
  };

  // Manage Partners
  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerName.trim() || !newPartnerSector.trim()) return;
    
    const newPartner = {
      id: `part-${Date.now()}`,
      name: newPartnerName,
      sector: newPartnerSector,
      desc: newPartnerDesc,
      tag: newPartnerTag
    };
    
    setSettingsPartners(prev => [...prev, newPartner]);
    setNewPartnerName('');
    setNewPartnerSector('');
    setNewPartnerDesc('');
  };

  const handleRemovePartner = (id: string) => {
    if (confirm('이 거래처를 목록에서 삭제하시겠습니까?')) {
      setSettingsPartners(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-gray-light min-h-screen pt-28 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Dashboard Banner */}
        <div className="bg-navy border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 shadow-md">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-brand-blue font-bold text-xs tracking-wider uppercase">
              <Flame className="w-4 h-4 animate-pulse" />
              <span>Kwangsung Industrial Furnace Admin System</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              광성산업 원스톱 관리 시스템
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              포트폴리오 업로드 및 실시간 고객 무료 견적 문의 내역을 모니터링하고 가공할 수 있는 통합 관리자 관제탑입니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRestoreSamples}
              className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-300" />
              <span>포트폴리오 초기화 (기본형)</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center space-x-1 bg-brand-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>관리자 종료 (메인 페이지로)</span>
            </button>
          </div>
        </div>

        {/* Dashboard Content Toggle Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Menu Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-line p-4 rounded-2xl space-y-2 shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-3 mb-2">업무 메뉴</p>
              
              <button
                onClick={() => {
                  setActiveTab('portfolio');
                  setEditingItem(null);
                  setIsAddingNew(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold tracking-tight transition-all cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'bg-brand-blue text-white font-bold'
                    : 'text-slate-500 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Hammer className="w-4 h-4" />
                  <span>포트폴리오 관리</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] ${activeTab === 'portfolio' ? 'bg-blue-700 text-white font-bold' : 'bg-gray-light border border-line text-slate-500 font-bold'}`}>
                  {portfolio.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('inquiries');
                  setEditingItem(null);
                  setIsAddingNew(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold tracking-tight transition-all cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-brand-blue text-white font-bold'
                    : 'text-slate-500 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>견적 문의 내역 수신함</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  inquiries.filter(i => i.status === 'pending').length > 0
                    ? 'bg-red-500 text-white font-bold'
                    : (activeTab === 'inquiries' ? 'bg-blue-700 text-white font-bold' : 'bg-gray-light border border-line text-slate-500 font-bold')
                }`}>
                  {inquiries.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('siteSettings');
                  setEditingItem(null);
                  setIsAddingNew(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold tracking-tight transition-all cursor-pointer ${
                  activeTab === 'siteSettings'
                    ? 'bg-brand-blue text-white font-bold'
                    : 'text-slate-500 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-brand-orange animate-spin-slow" />
                  <span>홈페이지 전체 보수 관리</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  activeTab === 'siteSettings' ? 'bg-blue-700 text-white font-bold' : 'bg-gray-light border border-line text-slate-500 font-bold'
                }`}>
                  실시간
                </span>
              </button>
            </div>

            <div className="bg-white border border-line p-5 rounded-2xl space-y-3 shadow-sm">
              <h4 className="text-xs font-bold text-navy flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-brand-blue" />
                <span>데이터 저장 방식</span>
              </h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                본 웹페이지는 B2B 클라이언트 프로토타입 사양으로, 추가 및 변경하신 모든 포트폴리오와 고객의 실시간 문의 내용은 브라우저의 <strong>로컬 스토리지(localStorage)</strong>에 보존됩니다. 브라우저 캐시를 소거하기 전까지 완벽히 보관 및 로딩됩니다.
              </p>
            </div>

            <div className="bg-white border border-line p-5 rounded-2xl space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-navy flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
                <span>포트폴리오 백업 & 배포 연동</span>
              </h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                업로드하신 사진과 실적을 다른 기기나 Vercel 배포 사이트에 그대로 적용하기 위한 백업 시스템입니다.
              </p>
              
              <div className="space-y-2 pt-1">
                {/* Export JSON Button */}
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="w-full flex items-center justify-center gap-1.5 bg-brand-blue hover:bg-blue-600 text-white py-2.5 rounded-xl text-[11px] font-bold transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>백업 파일 저장 (.json)</span>
                </button>
                
                {/* Import JSON Button */}
                <div className="relative">
                  <input
                    type="file"
                    id="import-backup-file"
                    accept="application/json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                  <label
                    htmlFor="import-backup-file"
                    className="w-full flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-line py-2.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer text-center"
                  >
                    <Upload className="w-3.5 h-3.5 text-brand-blue" />
                    <span>백업 파일 불러오기 (.json)</span>
                  </label>
                </div>
                
                {/* Code Export Button */}
                <button
                  type="button"
                  onClick={() => setShowExportModal(true)}
                  className="w-full flex items-center justify-center gap-1.5 bg-navy hover:bg-slate-800 text-white py-2.5 rounded-xl text-[11px] font-bold transition-all shadow-sm cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-brand-blue" />
                  <span>배포용 소스코드 추출 (AI 전송)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Core Panel Content */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* TAB 1: Portfolio Administration */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                
                {/* Form Anchor for Smooth scrolling */}
                <div id="admin-form-anchor" />

                {/* Add / Edit Form Area */}
                {(isAddingNew || editingItem) && (
                  <div className="bg-white border border-line rounded-3xl p-6 shadow-md space-y-6">
                    <div className="flex items-center justify-between border-b border-line pb-4">
                      <h3 className="text-base font-extrabold text-navy flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-blue" />
                        <span>{isAddingNew ? '신규 포트폴리오 추가' : '포트폴리오 내용 편집'}</span>
                      </h3>
                      <button
                        onClick={() => {
                          setIsAddingNew(false);
                          setEditingItem(null);
                        }}
                        className="text-slate-400 hover:text-navy p-1 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-navy">설비 프로젝트명 *</label>
                          <input
                            type="text"
                            required
                            placeholder="예: 대형 카타입 가스식 열처리로"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-navy">구분 (카테고리) *</label>
                          <select
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                            className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                          >
                            <option value="대형 산업로">대형 산업로</option>
                            <option value="맞춤 제작">맞춤 제작</option>
                          </select>
                        </div>
                      </div>

                      {/* 포트폴리오 이미지 관리 구역 (컴퓨터 파일 업로드 & 여러 장 첨부) */}
                      <div className="space-y-3 bg-gray-light/50 border border-line p-4 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-navy flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-brand-blue" />
                            <span>포트폴리오 이미지 관리 (여러 개 첨부 가능) *</span>
                          </label>
                          <span className="text-[10px] bg-brand-blue/10 text-brand-blue border border-brand-blue/20 px-2 py-0.5 rounded-full font-bold">
                            현재 첨부된 이미지: {formImages.length}개
                          </span>
                        </div>

                        {/* Drag and Drop Zone */}
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                            isDragging
                              ? 'border-brand-blue bg-brand-blue/5 scale-[1.01]'
                              : 'border-slate-300 hover:border-brand-blue bg-white hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="file"
                            id="portfolio-file-upload"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="portfolio-file-upload"
                            className="flex flex-col items-center justify-center cursor-pointer space-y-2"
                          >
                            <Upload className="w-8 h-8 text-brand-blue" />
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-navy">내 컴퓨터에서 이미지 첨부하기</p>
                              <p className="text-[10px] text-slate-400">
                                마우스로 이미지 파일을 여기에 드래그하거나, 클릭하여 직접 선택하세요. (다중 선택 가능)
                              </p>
                            </div>
                          </label>
                        </div>

                        {/* Optional Web URL Input */}
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-500">인터넷 이미지 주소(URL)로 직접 추가</p>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="https://example.com/image.jpg"
                              value={manualUrlInput}
                              onChange={(e) => setManualUrlInput(e.target.value)}
                              className="flex-1 bg-white border border-line text-navy rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-blue font-semibold"
                            />
                            <button
                              type="button"
                              onClick={handleAddUrlImage}
                              className="bg-navy hover:bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                            >
                              주소 추가
                            </button>
                          </div>
                        </div>

                        {/* Thumbnail Grid & Rearranger */}
                        {formImages.length > 0 ? (
                          <div className="space-y-1.5 pt-2">
                            <p className="text-[10px] font-bold text-slate-400">
                              * 이미지를 마우스로 편리하게 삭제하거나, "대표 지정"을 클릭하여 메인 커버 이미지로 지정하세요.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {formImages.map((imgUrl, idx) => (
                                <div key={idx} className="relative group bg-white border border-line rounded-xl overflow-hidden aspect-video shadow-sm">
                                  <img
                                    src={imgUrl}
                                    alt={`첨부 이미지 ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                    {idx > 0 ? (
                                      <button
                                        type="button"
                                        onClick={() => handleSetRepresentative(idx)}
                                        className="bg-brand-blue text-white font-bold text-[10px] px-2 py-1 rounded hover:bg-blue-600 transition-all shadow cursor-pointer"
                                      >
                                        대표 지정
                                      </button>
                                    ) : null}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveImage(idx)}
                                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all shadow cursor-pointer"
                                      title="이미지 삭제"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  
                                  {/* Representative Tag Indicator */}
                                  <div className="absolute top-1.5 left-1.5">
                                    {idx === 0 ? (
                                      <span className="bg-brand-blue text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                                        대표 커버
                                      </span>
                                    ) : (
                                      <span className="bg-black/60 text-slate-200 text-[9px] font-medium px-1.5 py-0.5 rounded">
                                        추가 슬라이드
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4 bg-white rounded-xl border border-line text-slate-400 font-medium text-xs">
                            첨부된 이미지가 없습니다. 최소 1장 이상의 사진을 업로드해 주세요.
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">상세 설명 *</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="설비의 전체적인 적용 처 및 특징에 대해 서술형으로 작성합니다."
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingNew(false);
                            setEditingItem(null);
                          }}
                          className="px-4 py-2.5 bg-gray-light hover:bg-slate-100 border border-line text-slate-500 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="flex items-center space-x-1.5 bg-brand-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>저장 완료하기</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Portfolio List Panel */}
                <div className="bg-white border border-line rounded-3xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-line pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-navy">등록된 실적 포트폴리오</h3>
                      <p className="text-[10px] text-slate-400 mt-1">포트폴리오 리스트 목록입니다.</p>
                    </div>
                    
                    {!isAddingNew && !editingItem && (
                      <button
                        onClick={startAdd}
                        className="flex items-center space-x-1 bg-gray-light hover:bg-slate-100 border border-line text-brand-blue px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>새 포트폴리오 등록</span>
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-line">
                    {portfolio.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0 group"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={(item.images && item.images.length > 0) ? item.images[0] : item.image}
                            alt={item.title}
                            className="w-14 h-10 object-cover rounded-lg bg-gray-light border border-line shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-gray-light text-slate-500 px-2 py-0.5 border border-line rounded font-extrabold uppercase tracking-wider">
                                {item.category}
                              </span>
                              <span className="text-xs text-slate-400 font-mono">ID: {item.id}</span>
                              {item.images && item.images.length > 1 && (
                                <span className="text-[10px] bg-brand-blue/10 text-brand-blue border border-brand-blue/20 px-1.5 py-0.5 rounded font-extrabold">
                                  사진 {item.images.length}장
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-extrabold text-navy mt-1 group-hover:text-brand-blue transition-colors">
                              {item.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => startEdit(item)}
                            className="flex items-center space-x-1 bg-gray-light hover:bg-slate-100 border border-line text-slate-700 p-2 rounded-lg text-xs transition-all cursor-pointer"
                            title="수정"
                          >
                            <Edit className="w-3.5 h-3.5 text-brand-blue" />
                          </button>
                          <button
                            onClick={() => handleDeletePortfolio(item.id)}
                            className="flex items-center space-x-1 bg-gray-light hover:bg-red-50 border border-line text-slate-400 hover:text-red-600 hover:border-red-200 p-2 rounded-lg text-xs transition-all cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: Customer Inquiries Administration */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                
                <div className="bg-white border border-line rounded-3xl p-6 space-y-4 shadow-sm">
                  <div className="border-b border-line pb-4">
                    <h3 className="text-sm font-bold text-navy">수신된 고객 견적 의뢰 내역</h3>
                    <p className="text-[10px] text-slate-400 mt-1">
                      홈페이지에서 고객이 "무료 견적 문의" 양식에 기입하여 신청한 최신 접수 장부입니다.
                    </p>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-16 bg-gray-light border border-line rounded-2xl">
                      <p className="text-slate-500 font-medium text-xs">접수된 고객 문의가 존재하지 않습니다.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className={`border rounded-2xl p-5 space-y-4 transition-all ${
                            inq.status === 'completed'
                              ? 'bg-slate-50/50 border-line opacity-75'
                              : 'bg-white border-line shadow-sm'
                          }`}
                        >
                          {/* Top Row info */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                            <div className="space-y-1">
                              <span className="text-xs font-mono font-extrabold text-brand-blue">
                                접수번호 {inq.id}
                              </span>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-extrabold text-navy">{inq.companyName}</h4>
                                <span className="text-xs text-slate-500 font-medium">({inq.contactPerson})</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleInquiryStatus(inq.id)}
                                className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                  inq.status === 'completed'
                                    ? 'bg-slate-100 border border-line text-slate-500'
                                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600'
                                }`}
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>{inq.status === 'completed' ? '처리 완료' : '접수 검토중'}</span>
                              </button>
                              
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="bg-gray-light border border-line hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-600 p-1 rounded transition-all cursor-pointer"
                                title="상담 기록 삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Client Contact Info */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-light p-3 rounded-xl border border-line text-xs font-medium">
                            <div>
                              <p className="text-slate-400 text-[10px] font-bold">연락처</p>
                              <a href={`tel:${inq.phone}`} className="text-navy hover:text-brand-blue transition-colors font-extrabold">{inq.phone}</a>
                            </div>
                            <div>
                              <p className="text-slate-400 text-[10px] font-bold">이메일</p>
                              <p className="text-navy font-bold truncate">{inq.email}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-[10px] font-bold">희망 설비 종류</p>
                              <p className="text-brand-blue font-extrabold truncate">{inq.furnaceType}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 text-[10px] font-bold">사용 온도 대역</p>
                              <p className="text-navy font-bold truncate">{inq.temperatureRequired}</p>
                            </div>
                          </div>

                          {/* Message Content */}
                          <div className="bg-slate-50/60 p-4 rounded-xl border border-line/60">
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">의뢰자 추가 건의 및 메시지</p>
                            <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed font-medium">
                              {inq.message}
                            </p>
                          </div>

                          <div className="text-[9px] text-slate-400 font-mono text-right font-medium">
                            의뢰 일시: {new Date(inq.createdAt).toLocaleString('ko-KR')}
                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* TAB 3: Website Site Settings Administration */}
            {activeTab === 'siteSettings' && (
              <div className="space-y-6">
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  
                  {/* Card 1: Company Contact & Metadata */}
                  <div className="bg-white border border-line rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="border-b border-line pb-3">
                      <h3 className="text-sm font-bold text-navy flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-brand-blue" />
                        <span>회사 기본 정보 관리</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">회사명, 연락처, 주소 등 사업자 필수 메타데이터를 관리합니다.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">상호명 (회사명) *</label>
                        <input
                          type="text"
                          required
                          value={settingsCompany}
                          onChange={(e) => setSettingsCompany(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">대표자명 *</label>
                        <input
                          type="text"
                          required
                          value={settingsRepresentative}
                          onChange={(e) => setSettingsRepresentative(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">대표 전화번호 (직통) *</label>
                        <input
                          type="text"
                          required
                          value={settingsPhone}
                          onChange={(e) => setSettingsPhone(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">팩스 번호 (FAX) *</label>
                        <input
                          type="text"
                          required
                          value={settingsFax}
                          onChange={(e) => setSettingsFax(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">이메일 주소 *</label>
                        <input
                          type="email"
                          required
                          value={settingsEmail}
                          onChange={(e) => setSettingsEmail(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">사업자 등록번호 *</label>
                        <input
                          type="text"
                          required
                          value={settingsRegNumber}
                          onChange={(e) => setSettingsRegNumber(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy">회사 사업장 주소 *</label>
                      <input
                        type="text"
                        required
                        value={settingsAddress}
                        onChange={(e) => setSettingsAddress(e.target.value)}
                        className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                      />
                    </div>
                  </div>

                  {/* Card 2: Hero Main Banner Section */}
                  <div className="bg-white border border-line rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="border-b border-line pb-3">
                      <h3 className="text-sm font-bold text-navy flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-brand-orange" />
                        <span>메인 히어로 배너 관리</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">홈페이지 메인 대형 슬라이드 및 슬로건을 변경합니다.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy">히어로 슬림 배지 텍스트 *</label>
                      <input
                        type="text"
                        required
                        value={settingsHeroBadge}
                        onChange={(e) => setSettingsHeroBadge(e.target.value)}
                        className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">메인 메세지 타이틀 *</label>
                        <input
                          type="text"
                          required
                          value={settingsHeroTitle}
                          onChange={(e) => setSettingsHeroTitle(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">서브 카피 설명 문구 *</label>
                        <input
                          type="text"
                          required
                          value={settingsHeroSubtitle}
                          onChange={(e) => setSettingsHeroSubtitle(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 bg-gray-light/50 border border-line p-4 rounded-2xl">
                      <label className="text-xs font-bold text-navy flex items-center gap-1.5">
                        <Upload className="w-4 h-4 text-brand-blue" />
                        <span>메인 대형 배경 사진 업로드 (Vite 및 GitHub 저장) *</span>
                      </label>
                      <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <img
                          src={settingsHeroImage}
                          alt="Hero Preview"
                          className="w-full sm:w-48 aspect-video object-cover rounded-xl border border-line bg-white shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-2 w-full">
                          <input
                            type="file"
                            id="hero-file-upload"
                            accept="image/*"
                            onChange={handleHeroImageUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="hero-file-upload"
                            className="inline-flex items-center gap-1.5 bg-brand-blue hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>새 배경 사진 업로드</span>
                          </label>
                          <p className="text-[10px] text-slate-400">
                            * 가로형 고해상도(1920x1080급) 실제 공장 설비 사진을 업로드하시면 홈페이지의 전면 배경이 변경됩니다.
                          </p>
                          <input
                            type="text"
                            placeholder="이미지 주소(URL) 직접 입력도 가능"
                            value={settingsHeroImage}
                            onChange={(e) => setSettingsHeroImage(e.target.value)}
                            className="w-full bg-white border border-line text-navy rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-blue font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Brand Core Introduces */}
                  <div className="bg-white border border-line rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="border-b border-line pb-3">
                      <h3 className="text-sm font-bold text-navy flex items-center gap-1.5">
                        <AlignLeft className="w-4 h-4 text-brand-blue" />
                        <span>브랜드 코어 및 소개 문구 관리</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">회사 소개 섹션의 전문 및 요약 명언 카피를 관리합니다.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy">소개 타이틀 *</label>
                      <input
                        type="text"
                        required
                        value={settingsIntroTitle}
                        onChange={(e) => setSettingsIntroTitle(e.target.value)}
                        className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">상세 본문 단락 1 *</label>
                        <textarea
                          required
                          rows={4}
                          value={settingsIntroText1}
                          onChange={(e) => setSettingsIntroText1(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-navy">상세 본문 단락 2 *</label>
                        <textarea
                          required
                          rows={4}
                          value={settingsIntroText2}
                          onChange={(e) => setSettingsIntroText2(e.target.value)}
                          className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy">대표 명언 카피 (인용구) *</label>
                      <textarea
                        required
                        rows={2}
                        value={settingsIntroQuote}
                        onChange={(e) => setSettingsIntroQuote(e.target.value)}
                        className="w-full bg-gray-light border border-line text-navy rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-blue focus:bg-white font-semibold"
                      />
                    </div>

                    {/* Highlights Sub-section */}
                    <div className="space-y-3 pt-3 border-t border-line">
                      <p className="text-xs font-bold text-navy">핵심 강점 서브 타이틀 관리 (2개 핵심 팩트)</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {settingsHighlights.map((hl, idx) => (
                          <div key={idx} className="bg-gray-light/30 border border-line p-4 rounded-2xl space-y-2">
                            <p className="text-[10px] text-brand-orange font-bold">팩트 강점 #{idx + 1}</p>
                            <input
                              type="text"
                              required
                              placeholder="강점 요약 타이틀"
                              value={hl.title}
                              onChange={(e) => handleHighlightChange(idx, 'title', e.target.value)}
                              className="w-full bg-white border border-line text-navy rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-blue font-bold"
                            />
                            <textarea
                              required
                              rows={2}
                              placeholder="세부 사실에 대한 간결한 설명"
                              value={hl.desc}
                              onChange={(e) => handleHighlightChange(idx, 'desc', e.target.value)}
                              className="w-full bg-white border border-line text-navy rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-blue font-semibold"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Client Partners Directory Management */}
                  <div className="bg-white border border-line rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="border-b border-line pb-3">
                      <h3 className="text-sm font-bold text-navy flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-brand-blue" />
                        <span>주요 파트너 및 거래처 디렉토리 관리</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">대기업 파트너십 목록을 관리하고 실시간으로 추가/제거합니다.</p>
                    </div>

                    {/* Form to add partner inline */}
                    <div className="bg-gray-light/40 border border-line p-4 rounded-2xl space-y-3">
                      <p className="text-[10px] font-bold text-brand-blue">신규 주요 거래사 추가 양식</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="거래사 상호명 (예: 주식회사 선일)"
                          value={newPartnerName}
                          onChange={(e) => setNewPartnerName(e.target.value)}
                          className="bg-white border border-line text-navy rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-blue font-bold"
                        />
                        <input
                          type="text"
                          placeholder="주력 제조 분야 (예: 자동차 특수 볼트)"
                          value={newPartnerSector}
                          onChange={(e) => setNewPartnerSector(e.target.value)}
                          className="bg-white border border-line text-navy rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-blue font-bold"
                        />
                        <select
                          value={newPartnerTag}
                          onChange={(e) => setNewPartnerTag(e.target.value)}
                          className="bg-white border border-line text-navy rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-blue font-bold"
                        >
                          <option value="자동차 부품">자동차 부품</option>
                          <option value="정밀 포징">정밀 포징</option>
                          <option value="체결 부품">체결 부품</option>
                          <option value="정밀 베어링">정밀 베어링</option>
                          <option value="글로벌 스탠다드">글로벌 스탠다드</option>
                          <option value="정밀 단조">정밀 단조</option>
                          <option value="방위 산업 / 기어">방위 산업 / 기어</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        placeholder="거래 파트너사에 대한 세부적인 한 줄 부연설명 기술"
                        value={newPartnerDesc}
                        onChange={(e) => setNewPartnerDesc(e.target.value)}
                        className="w-full bg-white border border-line text-navy rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-blue font-medium"
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleAddPartner}
                          className="bg-navy hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                        >
                          거래처 리스트 추가
                        </button>
                      </div>
                    </div>

                    {/* Listing of current partners */}
                    <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">현재 등록된 주요 거래 리스트 ({settingsPartners.length}개)</p>
                      <div className="divide-y divide-line">
                        {settingsPartners.map((partner) => (
                          <div key={partner.id} className="py-2.5 flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="text-xs font-bold text-navy truncate">{partner.name}</h4>
                                <span className="bg-brand-blue/10 text-brand-blue text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                                  {partner.tag}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 truncate">{partner.sector} - {partner.desc}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemovePartner(partner.id)}
                              className="text-red-500 hover:text-red-600 text-xs font-bold shrink-0 p-1 cursor-pointer"
                            >
                              삭제
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Global Save Button bar */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md text-white">
                    <div>
                      <h4 className="text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                        <span>전체 변경 내용 영구 승인</span>
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        위 기입하신 브랜드 정보와 업로드 이미지들은 즉각 적용되어 깃허브 레포지토리 파일로 동기화됩니다.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-brand-orange hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl text-xs font-extrabold transition-all shadow-md cursor-pointer shrink-0"
                    >
                      <Save className="w-4 h-4" />
                      <span>홈페이지 전체 설정 저장 완료</span>
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Export Source Code Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/85 backdrop-blur-md">
          <div className="bg-white border border-line rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-navy cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="bg-brand-blue/10 border border-brand-blue/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-extrabold text-navy tracking-tight">배포용 소스코드 추출</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                업로드하신 실적 데이터와 이미지를 사이트에 완전히 고정하여 배포하고 싶으신가요?<br />
                아래 상자 안의 텍스트 데이터를 복사한 후, <strong>AI 대화창에 "이 데이터로 포트폴리오를 업데이트해줘"라며 붙여넣어 주세요.</strong><br />
                제가 소스코드 파일 자체를 수정해드려 배포 후에도 모든 방문자에게 사진들이 기본으로 보여집니다.
              </p>
            </div>

            <div className="relative">
              <textarea
                readOnly
                value={JSON.stringify(portfolio, null, 2)}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                className="w-full h-64 bg-gray-light border border-line text-navy font-mono text-[10px] rounded-xl p-4 focus:outline-none overflow-y-auto select-all cursor-pointer"
              />
              <div className="absolute bottom-3 right-3">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer ${
                    copied ? 'bg-emerald-500 text-white' : 'bg-brand-blue hover:bg-blue-600 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Clipboard className="w-3.5 h-3.5" />
                      <span>전체 복사하기</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-5 py-2.5 bg-gray-light hover:bg-slate-100 border border-line text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                창 닫기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
