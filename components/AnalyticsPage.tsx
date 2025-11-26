import React from 'react';
import { BarChart3, Eye, Unlock, DollarSign, TrendingUp, MousePointerClick } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { AnalyticsMetric } from '../types';
import { formatCurrency } from '../utils';

export const AnalyticsPage: React.FC = () => {
  const { t } = useLanguage();

  const metrics: AnalyticsMetric[] = [
    { label: t('totalViews'), value: '24.5k', change: '+12%', isPositive: true },
    { label: t('totalUnlocks'), value: '8,210', change: '+5%', isPositive: true },
    { label: t('conversionRate'), value: '33.5%', change: '-2%', isPositive: false },
    { label: t('totalEarnings'), value: formatCurrency("1245.50"), change: '+18%', isPositive: true },
  ];

  // Mock Top Links
  const topLinks = [
    { title: "Project Alpha Source Code", views: 5200, earnings: 450, type: 'url' },
    { title: "Exclusive 3D Assets Pack", views: 3100, earnings: 210, type: 'url' },
    { title: "Secret Concert Recording", views: 1200, earnings: 85, type: 'audio' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-white">{t('analyticsTitle')}</h2>
        <div className="flex gap-2">
          <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg p-2.5 focus:ring-brand-500 focus:border-brand-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-800 rounded-lg text-brand-400">
                {idx === 0 && <Eye className="w-5 h-5" />}
                {idx === 1 && <Unlock className="w-5 h-5" />}
                {idx === 2 && <MousePointerClick className="w-5 h-5" />}
                {idx === 3 && <DollarSign className="w-5 h-5" />}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                metric.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
            <p className="text-slate-400 text-sm">{metric.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mock Chart Area */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-slate-400" />
              Traffic Overview
            </h3>
          </div>
          
          {/* Simple CSS Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 pt-4">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="w-full bg-slate-800/50 rounded-t-lg relative group overflow-hidden">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-brand-600 group-hover:bg-brand-500 transition-all duration-500 ease-out"
                  style={{ height: `${h}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h * 10}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 font-mono uppercase">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Top Links */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            {t('topLinks')}
          </h3>
          <div className="space-y-4">
            {topLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm">
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-brand-400 transition-colors">{link.title}</p>
                  <p className="text-xs text-slate-500">{link.views} {t('views')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-400">{formatCurrency(link.earnings.toString())}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};