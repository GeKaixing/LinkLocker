
import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, History, X, Info, Calculator, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { formatCurrency } from '../utils';
import { Transaction } from '../types';

export const WalletPage: React.FC = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Data
  const availableBalanceValue = 1200.00;
  const balance = "1245.50";
  const transactions: Transaction[] = [
    { id: 'TX-8821', amount: 5.00, date: '2023-10-24', status: 'completed', source: 'Link Unlock: Secret Design' },
    { id: 'TX-8822', amount: 12.50, date: '2023-10-23', status: 'completed', source: 'Link Unlock: Project Files' },
    { id: 'TX-8823', amount: 5.00, date: '2023-10-23', status: 'completed', source: 'Link Unlock: Secret Design' },
    { id: 'TX-8824', amount: -500.00, date: '2023-10-20', status: 'completed', source: 'Withdrawal to PayPal' },
    { id: 'TX-8825', amount: 8.00, date: '2023-10-19', status: 'pending', source: 'Link Unlock: Exclusive Video' },
  ];

  const handleWithdrawClick = () => {
    setIsModalOpen(true);
    setWithdrawAmount('');
  };

  const handleConfirmWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Mock processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsModalOpen(false);
    }, 2000);
  };

  const numericAmount = parseFloat(withdrawAmount) || 0;
  const fee = numericAmount * 0.10;
  const netAmount = numericAmount - fee;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header & Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-emerald-900/40 to-slate-900/50 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Wallet className="w-5 h-5" />
                <span className="font-medium tracking-wide text-sm uppercase">{t('totalBalance')}</span>
              </div>
              <h2 className="text-5xl font-bold text-white tracking-tight">{formatCurrency(balance)}</h2>
            </div>
            
            <div className="mt-8 flex gap-4">
               <button 
                 onClick={handleWithdrawClick}
                 className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
               >
                 <ArrowUpRight className="w-5 h-5" />
                 {t('withdrawBtn')}
               </button>
               <button className="px-4 py-3 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 rounded-xl hover:bg-emerald-900/50 transition-colors">
                 <TrendingUp className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 flex flex-col justify-center gap-4">
           <div className="space-y-1">
             <p className="text-slate-400 text-sm">{t('availableWithdraw')}</p>
             <p className="text-2xl font-bold text-white">{formatCurrency("1200.00")}</p>
           </div>
           <div className="h-px bg-slate-800 w-full"></div>
           <div className="space-y-1">
             <div className="flex items-center gap-2">
               <p className="text-slate-400 text-sm">Pending Clearance</p>
               <Info className="w-3 h-3 text-slate-500" />
             </div>
             <p className="text-2xl font-bold text-slate-500">{formatCurrency("45.50")}</p>
           </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-slate-400" />
            {t('recentTrans')}
          </h3>
          <button className="text-sm text-brand-400 hover:text-brand-300">View All</button>
        </div>
        
        <div className="divide-y divide-slate-800">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {tx.amount > 0 ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{tx.source}</p>
                  <p className="text-xs text-slate-500">{tx.date} • {tx.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount.toString())}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  tx.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {tx.status === 'completed' ? t('statusCompleted') : t('statusPending')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in duration-200 flex flex-col overflow-hidden">
            
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <h3 className="text-xl font-bold text-white">{t('withdrawModalTitle')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmWithdraw} className="p-6 space-y-6">
              <p className="text-slate-400 text-sm">{t('withdrawNote')}</p>
              
              {/* Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">{t('inputAmount')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold">$</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max={availableBalanceValue}
                    step="0.01"
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="block w-full pl-8 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-xs text-slate-500">Max: {availableBalanceValue}</span>
                  </div>
                </div>
              </div>

              {/* Fee Calculation Card */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                 <div className="flex justify-between text-sm text-slate-400">
                   <span>{t('inputAmount')}</span>
                   <span>{formatCurrency(withdrawAmount || '0')}</span>
                 </div>
                 <div className="flex justify-between text-sm text-red-400">
                   <span>{t('feeLabel')}</span>
                   <span>-{formatCurrency(fee.toString())}</span>
                 </div>
                 <div className="h-px bg-slate-800 w-full my-2"></div>
                 <div className="flex justify-between font-bold text-emerald-400">
                   <span>{t('finalAmount')}</span>
                   <span>{formatCurrency(netAmount.toString())}</span>
                 </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-colors"
                >
                  {t('cancelBtn')}
                </button>
                <button
                  type="submit"
                  disabled={isProcessing || numericAmount <= 0 || numericAmount > availableBalanceValue}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : t('confirmWithdraw')}
                </button>
              </div>
              
              <p className="text-xs text-center text-slate-500">{t('feeDisclaimer')}</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
