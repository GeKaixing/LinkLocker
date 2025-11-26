import React, { useState, useEffect } from 'react';
import { CreateLink } from './components/CreateLink';
import { UnlockLink } from './components/UnlockLink';
import { LoginPage } from './components/LoginPage';
import { WalletPage } from './components/WalletPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { LinksPage } from './components/LinksPage';
import { Sidebar } from './components/Sidebar';
import { decodeLinkData } from './utils';
import { LinkData, AppView } from './types';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [sharedData, setSharedData] = useState<LinkData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      // 1. Check for Shared Link Data (Public Route)
      if (hash.includes('?data=')) {
        const params = new URLSearchParams(hash.replace('#/', ''));
        const dataStr = params.get('data');
        if (dataStr) {
          try {
            const decoded = decodeLinkData(dataStr);
            setSharedData(decoded);
            setCurrentView('unlock');
            return;
          } catch (e) {
            console.error("Failed to decode link", e);
          }
        }
      }

      // 2. Handle Navigation Routes
      if (hash === '#/dashboard' || hash === '#/') {
         if(isLoggedIn) setCurrentView('create');
         else setCurrentView('login');
      } else if (hash === '#/links') {
         if(isLoggedIn) setCurrentView('links');
         else setCurrentView('login');
      } else if (hash === '#/analytics') {
         if(isLoggedIn) setCurrentView('analytics');
         else setCurrentView('login');
      } else if (hash === '#/wallet') {
         if(isLoggedIn) setCurrentView('wallet');
         else setCurrentView('login');
      } else if (hash === '#/login') {
         setCurrentView('login');
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('create');
    window.location.hash = '/dashboard';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    window.location.hash = '/login';
  };

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if(view === 'create') window.location.hash = '/dashboard';
    else window.location.hash = `/${view}`;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // If viewing a locked link, show full screen unlock view
  if (currentView === 'unlock' && sharedData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-0"></div>
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 hover:bg-slate-800 backdrop-blur-md border border-slate-700 rounded-full text-slate-300 hover:text-white transition-all text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'en' ? '中文' : 'English'}</span>
          </button>
        </div>
        <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          <UnlockLink data={sharedData} />
          <footer className="mt-12 text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} {t('footer')}</p>
          </footer>
        </main>
      </div>
    );
  }

  // Authenticated Dashboard Layout or Login Screen
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex relative overflow-hidden">
       {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-brand-900/20 to-transparent pointer-events-none"></div>

      {isLoggedIn && (
        <>
          <Sidebar currentView={currentView} onChangeView={handleViewChange} onLogout={handleLogout} />
          {/* Mobile Header */}
          <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
             <span className="font-bold text-lg text-white">Link<span className="text-brand-500">Locker</span></span>
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300">
               {mobileMenuOpen ? <X /> : <Menu />}
             </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
             <div className="fixed inset-0 z-30 bg-slate-950 pt-16 px-6 pb-6 md:hidden flex flex-col gap-4">
                <button onClick={() => handleViewChange('create')} className="p-4 text-left font-medium text-lg border-b border-slate-800">{t('navCreate')}</button>
                <button onClick={() => handleViewChange('links')} className="p-4 text-left font-medium text-lg border-b border-slate-800">{t('navLinks')}</button>
                <button onClick={() => handleViewChange('analytics')} className="p-4 text-left font-medium text-lg border-b border-slate-800">{t('navAnalytics')}</button>
                <button onClick={() => handleViewChange('wallet')} className="p-4 text-left font-medium text-lg border-b border-slate-800">{t('navWallet')}</button>
                <button onClick={handleLogout} className="p-4 text-left font-medium text-lg text-red-400 mt-auto">{t('navLogout')}</button>
             </div>
          )}
        </>
      )}

      <div className={`flex-1 flex flex-col min-h-screen transition-all ${isLoggedIn ? 'md:ml-64' : ''}`}>
        
        {/* Top Bar for Language (and Login if needed) */}
        <header className="px-6 py-4 flex justify-end items-center gap-4 z-20 mt-14 md:mt-0">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 hover:bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white transition-all text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'en' ? '中文' : 'English'}</span>
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 flex items-start justify-center overflow-y-auto">
          {currentView === 'login' && <LoginPage onLogin={handleLogin} />}
          {currentView === 'create' && (
             <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">{t('navCreate')}</h2>
                  <p className="text-slate-400">{t('subtitleCreate')}</p>
                </div>
                <CreateLink />
             </div>
          )}
          {currentView === 'links' && <LinksPage />}
          {currentView === 'analytics' && <AnalyticsPage />}
          {currentView === 'wallet' && <WalletPage />}
        </main>
      </div>
    </div>
  );
};

export default App;