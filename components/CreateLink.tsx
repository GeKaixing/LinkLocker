import React, { useState, useRef } from 'react';
import { Lock, CreditCard, Wand2, Link as LinkIcon, Copy, Check, AlertCircle, Image as ImageIcon, Video, FileUp, X, Music, FileText } from 'lucide-react';
import { LockType, LinkData, ContentType, StoredLink } from '../types';
import { analyzeUrl, analyzeImage, analyzeAudio, analyzeText } from '../services/geminiService';
import { encodeLinkData } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';

export const CreateLink: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>('url');
  const [url, setUrl] = useState('');
  const [fileData, setFileData] = useState<string>('');
  const [fileName, setFileName] = useState('');
  const [textContent, setTextContent] = useState('');
  
  const [lockType, setLockType] = useState<LockType>(LockType.PASSWORD);
  const [lockValue, setLockValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [meta, setMeta] = useState({ title: '', description: '' });
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { t, language } = useLanguage();

  const handleAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      if (contentType === 'url' && url) {
        const result = await analyzeUrl(url, language);
        setMeta({ title: result.title, description: result.description });
      } else if (contentType === 'text' && textContent) {
        const result = await analyzeText(textContent, language);
        setMeta({ title: result.title, description: result.description });
      } else if ((contentType === 'image' || contentType === 'audio') && fileData) {
        // Extract base64 raw string and mime type
        const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const mimeType = matches[1];
          const rawBase64 = matches[2];
          
          if (contentType === 'image') {
            const result = await analyzeImage(rawBase64, mimeType, language);
            setMeta({ title: result.title, description: result.description });
          } else if (contentType === 'audio') {
            const result = await analyzeAudio(rawBase64, mimeType, language);
            setMeta({ title: result.title, description: result.description });
          }
        }
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB soft limit warning logic could go here
         // For now we just accept it but the link might fail if too big.
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result as string);
        // Reset meta when new file loaded
        setMeta({ title: '', description: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFile = () => {
    setFileData('');
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (contentType === 'url' && !url) return;
    if (contentType === 'text' && !textContent) return;
    if ((contentType === 'image' || contentType === 'video' || contentType === 'audio') && !fileData) return;
    if (!lockValue) return;

    let defaultTitle = t('secretLink');
    if (contentType === 'image') defaultTitle = t('secretImage');
    if (contentType === 'video') defaultTitle = t('secretVideo');
    if (contentType === 'audio') defaultTitle = t('secretAudio');
    if (contentType === 'text') defaultTitle = t('secretArticle');

    let finalContent = url;
    if (contentType === 'text') finalContent = textContent;
    if (['image', 'video', 'audio'].includes(contentType)) finalContent = fileData;

    const data: LinkData = {
      content: finalContent,
      contentType,
      title: meta.title || defaultTitle,
      description: meta.description || t('unlockToView'),
      lockType,
      lockValue,
      createdAt: Date.now()
    };

    // Save to LocalStorage
    const storedLink: StoredLink = {
      ...data,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    try {
      const existing = JSON.parse(localStorage.getItem('linklocker_links') || '[]');
      localStorage.setItem('linklocker_links', JSON.stringify([storedLink, ...existing]));
    } catch (e) {
      console.error("Failed to save link", e);
    }

    const hash = encodeLinkData(data);
    const fullLink = `${window.location.origin}${window.location.pathname}#/?data=${hash}`;
    setGeneratedLink(fullLink);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAcceptType = () => {
    if (contentType === 'image') return "image/*";
    if (contentType === 'video') return "video/*";
    if (contentType === 'audio') return "audio/*";
    return "*/*";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8">
          
          {!generatedLink ? (
            <form onSubmit={handleGenerate} className="space-y-6">
              
              {/* Content Type Tabs */}
              <div className="flex p-1 bg-slate-800 rounded-xl overflow-x-auto">
                {(['url', 'text', 'image', 'video', 'audio'] as ContentType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setContentType(type);
                      setMeta({title: '', description: ''});
                      setGeneratedLink('');
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all min-w-[80px] ${
                      contentType === type
                        ? 'bg-brand-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                    }`}
                  >
                    {type === 'url' && <LinkIcon className="w-4 h-4" />}
                    {type === 'text' && <FileText className="w-4 h-4" />}
                    {type === 'image' && <ImageIcon className="w-4 h-4" />}
                    {type === 'video' && <Video className="w-4 h-4" />}
                    {type === 'audio' && <Music className="w-4 h-4" />}
                    <span>
                      {type === 'url' && t('tabUrl')}
                      {type === 'text' && t('tabArticle')}
                      {type === 'image' && t('tabImage')}
                      {type === 'video' && t('tabVideo')}
                      {type === 'audio' && t('tabAudio')}
                    </span>
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  {contentType === 'url' ? t('urlLabel') : contentType === 'text' ? t('articleLabel') : t('fileLabel')}
                </label>
                
                {contentType === 'url' ? (
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-5 w-5 text-slate-500 group-focus-within:text-brand-500 transition-colors" />
                    </div>
                    <input
                      type="url"
                      required={contentType === 'url'}
                      placeholder="https://example.com/secret-content"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleAiAnalysis}
                      disabled={isAnalyzing || !url}
                      className="absolute inset-y-1 right-1 px-3 flex items-center justify-center bg-slate-700 hover:bg-brand-600 text-slate-300 hover:text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title={t('generateAi')}
                    >
                      {isAnalyzing ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ) : contentType === 'text' ? (
                  <div className="relative group">
                    <textarea
                      required={contentType === 'text'}
                      rows={8}
                      placeholder={t('articlePlaceholder')}
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      className="block w-full p-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                    />
                    <button
                      type="button"
                      onClick={handleAiAnalysis}
                      disabled={isAnalyzing || !textContent}
                      className="absolute top-2 right-2 px-3 py-1.5 flex items-center gap-2 bg-slate-700 hover:bg-brand-600 text-slate-300 hover:text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                    >
                      {isAnalyzing ? (
                        <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <Wand2 className="h-3 w-3" />
                      )}
                      AI
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {!fileData ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="relative border-2 border-dashed border-slate-700 hover:border-brand-500 bg-slate-800/50 hover:bg-slate-800 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group"
                      >
                        <div className="p-4 bg-slate-800 rounded-full mb-3 group-hover:scale-110 transition-transform">
                          <FileUp className="w-8 h-8 text-brand-400" />
                        </div>
                        <p className="text-slate-300 font-medium">{t('dropFile')}</p>
                        <p className="text-xs text-slate-500 mt-2">{t('maxSizeWarning')}</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept={getAcceptType()}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="relative bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {contentType === 'image' && <img src={fileData} alt="Preview" className="w-full h-full object-cover" />}
                          {contentType === 'video' && <Video className="w-6 h-6 text-slate-400" />}
                          {contentType === 'audio' && <Music className="w-6 h-6 text-slate-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{fileName}</p>
                          <p className="text-xs text-slate-500">
                             {(fileData.length * 0.75 / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        
                        {(contentType === 'image' || contentType === 'audio') && (
                          <button
                            type="button"
                            onClick={handleAiAnalysis}
                            disabled={isAnalyzing}
                            className="p-2 bg-slate-700 hover:bg-brand-600 rounded-lg text-slate-300 hover:text-white transition-colors"
                            title={t('generateAi')}
                          >
                            {isAnalyzing ? (
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                              <Wand2 className="h-4 w-4" />
                            )}
                          </button>
                        )}
                        
                        <button
                          type="button"
                          onClick={clearFile}
                          className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-slate-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Meta Inputs */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">{t('titleLabel')}</label>
                  <input
                    type="text"
                    value={meta.title}
                    onChange={(e) => setMeta({...meta, title: e.target.value})}
                    placeholder={t('defaultTitle')}
                    className="block w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">{t('descLabel')}</label>
                  <input
                    type="text"
                    value={meta.description}
                    onChange={(e) => setMeta({...meta, description: e.target.value})}
                    placeholder={t('defaultDescription')}
                    className="block w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Lock Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 ml-1">{t('lockMethod')}</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setLockType(LockType.PASSWORD)}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      lockType === LockType.PASSWORD
                        ? 'border-brand-500 bg-brand-500/10 text-white'
                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    <span className="font-semibold">{t('methodPassword')}</span
>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLockType(LockType.PAYMENT)}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      lockType === LockType.PAYMENT
                        ? 'border-emerald-500 bg-emerald-500/10 text-white'
                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="font-semibold">{t('methodPayment')}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Value Input */}
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  {lockType === LockType.PASSWORD ? t('setPassword') : t('setPrice')}
                </label>
                <input
                  type={lockType === LockType.PASSWORD ? "text" : "number"}
                  required
                  min={lockType === LockType.PAYMENT ? "0.50" : undefined}
                  step={lockType === LockType.PAYMENT ? "0.01" : undefined}
                  value={lockValue}
                  onChange={(e) => setLockValue(e.target.value)}
                  placeholder={lockType === LockType.PASSWORD ? t('passwordPlaceholder') : "5.00"}
                  className="block w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('createButton')}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto ring-1 ring-green-500/50">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('successTitle')}</h3>
                <p className="text-slate-400">
                  {lockType === LockType.PASSWORD ? t('successDescPassword') : t('successDescPayment')}
                </p>
              </div>
              
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                <p className="flex-1 text-slate-300 truncate text-sm font-mono">{generatedLink}</p>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <button
                onClick={() => {
                  setGeneratedLink('');
                  setLockValue('');
                  setUrl('');
                  setFileData('');
                  setTextContent('');
                  setMeta({title: '', description: ''});
                }}
                className="text-brand-400 hover:text-brand-300 text-sm font-medium"
              >
                {t('createAnother')}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Informational Blurb */}
      <div className="mt-6 flex items-start gap-3 p-4 bg-blue-900/20 border border-blue-900/50 rounded-xl">
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-200">
          <strong>{t('privacyTitle')}</strong> {t('privacyText')}
        </p>
      </div>
    </div>
  );
};