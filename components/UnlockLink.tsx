import React, { useState } from 'react';
import { Lock, Unlock, ArrowRight, DollarSign, ExternalLink, ShieldAlert, Image as ImageIcon, Video, Download, Music, FileText } from 'lucide-react';
import { LinkData, LockType } from '../types';
import { formatCurrency } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';

interface UnlockLinkProps {
  data: LinkData;
}

export const UnlockLink: React.FC<UnlockLinkProps> = ({ data }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useLanguage();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (data.lockType === LockType.PASSWORD) {
      if (inputValue === data.lockValue) {
        setIsUnlocked(true);
      } else {
        setError(t('incorrectPassword'));
      }
    } else {
      // Mock Payment
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsUnlocked(true);
      }, 2000);
    }
  };

  const renderContent = () => {
    switch (data.contentType) {
      case 'image':
        return (
          <div className="space-y-6">
             <div className="rounded-xl overflow-hidden border border-slate-700 bg-black/50">
               <img src={data.content} alt={data.title} className="w-full h-auto max-h-[60vh] object-contain" />
             </div>
             <a 
               href={data.content} 
               download="unlocked-image"
               className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
             >
               <Download className="w-4 h-4" />
               {t('downloadImage')}
             </a>
          </div>
        );
      case 'video':
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-black/50">
              <video controls src={data.content} className="w-full h-auto max-h-[60vh]" />
            </div>
             <a 
               href={data.content} 
               download="unlocked-video"
               className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
             >
               <Download className="w-4 h-4" />
               {t('downloadVideo')}
             </a>
          </div>
        );
      case 'audio':
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-6 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center animate-pulse">
                <Music className="w-8 h-8 text-brand-400" />
              </div>
              <audio controls src={data.content} className="w-full" />
            </div>
             <a 
               href={data.content} 
               download="unlocked-audio"
               className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
             >
               <Download className="w-4 h-4" />
               {t('downloadAudio')}
             </a>
          </div>
        );
      case 'text':
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-700 bg-slate-950 p-6 sm:p-8 text-left max-h-[60vh] overflow-y-auto shadow-inner">
              <article className="prose prose-invert prose-sm sm:prose-base max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed text-slate-300 font-serif">
                  {data.content}
                </p>
              </article>
            </div>
            <div className="text-center text-xs text-slate-500">{t('readArticle')}</div>
          </div>
        );
      case 'url':
      default:
        return (
          <>
            <a 
              href={data.content}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all"
            >
              <span>{t('goToLink')}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="mt-6 pt-6 border-t border-slate-800">
               <div className="text-xs text-slate-500 font-mono break-all">
                 {data.content}
               </div>
            </div>
          </>
        );
    }
  };

  if (isUnlocked) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-in zoom-in duration-300">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-green-500/30 rounded-2xl overflow-hidden shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <Unlock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t('contentUnlocked')}</h2>
          <p className="text-slate-400 mb-8">{t('accessDestination')}</p>
          
          {renderContent()}
          
        </div>
      </div>
    );
  }

  // Header icon based on content type
  let HeaderIcon = ExternalLink;
  if (data.contentType === 'image') HeaderIcon = ImageIcon;
  else if (data.contentType === 'video') HeaderIcon = Video;
  else if (data.contentType === 'audio') HeaderIcon = Music;
  else if (data.contentType === 'text') HeaderIcon = FileText;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Card */}
        <div className="bg-slate-950/50 p-8 text-center border-b border-slate-800">
           <div className="flex justify-center gap-4 mb-4">
             <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-800 rounded-xl text-brand-400">
                <HeaderIcon className="w-6 h-6" />
             </div>
             <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-800 rounded-xl text-slate-300">
                {data.lockType === LockType.PASSWORD ? <Lock className="w-6 h-6" /> : <DollarSign className="w-6 h-6" />}
             </div>
           </div>
           <h2 className="text-xl font-bold text-white mb-1">{data.title}</h2>
           <p className="text-slate-400 text-sm leading-relaxed">{data.description}</p>
        </div>

        {/* Action Area */}
        <div className="p-8">
          <form onSubmit={handleUnlock} className="space-y-4">
            {data.lockType === LockType.PASSWORD ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">{t('passwordRequired')}</label>
                <input
                  type="password"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('enterPassword')}
                  className="block w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                />
              </div>
            ) : (
              <div className="text-center py-2">
                 <p className="text-slate-400 text-sm mb-2">{t('accessCost')}</p>
                 <div className="text-4xl font-bold text-white tracking-tight text-emerald-400 shadow-emerald-500/20 drop-shadow-sm">
                   {formatCurrency(data.lockValue)}
                 </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/10 p-3 rounded-lg border border-red-900/20">
                <ShieldAlert className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 mt-2 flex items-center justify-center gap-2 font-bold rounded-xl shadow-lg transition-all ${
                data.lockType === LockType.PASSWORD 
                  ? 'bg-brand-600 hover:bg-brand-500 shadow-brand-500/20 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20 text-white'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('processing')}</span>
                </>
              ) : (
                <>
                  <span>{data.lockType === LockType.PASSWORD ? t('unlockButton') : t('payButton')}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">
              {t('securedBy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};