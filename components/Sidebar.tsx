import React from 'react';
import { LayoutDashboard, Wallet, BarChart3, LogOut, ShieldCheck, Link } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onLogout }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'create', label: t('navCreate'), icon: LayoutDashboard },
    { id: 'links', label: t('navLinks'), icon: Link },
    { id: 'analytics', label: t('navAnalytics'), icon: BarChart3 },
    { id: 'wallet', label: t('navWallet'), icon: Wallet },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-full fixed left-0 top-0 bg-slate-950 border-r border-slate-800/50 z-30">
      <div className="p-6">
        <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
          <ShieldCheck className="w-8 h-8 text-brand-500" />
          <span>Link<span className="text-brand-500">Locker</span></span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id as AppView)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              currentView === item.id
                ? 'bg-brand-600/10 text-brand-500 border border-brand-500/20 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-900">
        <div className="flex items-center gap-3 mb-4 px-4">
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500"></div>
           <div>
             <p className="text-sm font-medium text-white">Demo User</p>
             <p className="text-xs text-slate-500">Free Plan</p>
           </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {t('navLogout')}
        </button>
      </div>
    </div>
  );
};