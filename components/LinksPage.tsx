import React, { useState, useEffect } from 'react';
import { Trash2, Copy, Link as LinkIcon, Image as ImageIcon, Video, Music, FileText, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { StoredLink, LinkData } from '../types';
import { encodeLinkData } from '../utils';

export const LinksPage: React.FC = () => {
  const [links, setLinks] = useState<StoredLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('linklocker_links');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sort by newest first
        setLinks(parsed.sort((a: StoredLink, b: StoredLink) => b.createdAt - a.createdAt));
      } catch (e) {
        console.error("Failed to parse links", e);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    if (confirm(t('delete') + '?')) {
      const updated = links.filter(l => l.id !== id);
      setLinks(updated);
      localStorage.setItem('linklocker_links', JSON.stringify(updated));
    }
  };

  const handleCopy = (link: StoredLink) => {
    const data: LinkData = {
      content: link.content,
      contentType: link.contentType,
      title: link.title,
      description: link.description,
      lockType: link.lockType,
      lockValue: link.lockValue,
      createdAt: link.createdAt
    };
    const hash = encodeLinkData(data);
    const fullLink = `${window.location.origin}${window.location.pathname}#/?data=${hash}`;
    
    navigator.clipboard.writeText(fullLink);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-5 h-5 text-purple-400" />;
      case 'video': return <Video className="w-5 h-5 text-red-400" />;
      case 'audio': return <Music className="w-5 h-5 text-pink-400" />;
      case 'text': return <FileText className="w-5 h-5 text-yellow-400" />;
      default: return <LinkIcon className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{t('linksTitle')}</h2>
      </div>

      {links.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
           <div className="inline-flex items-center justify-center p-4 bg-slate-800 rounded-full mb-4">
             <LinkIcon className="w-8 h-8 text-slate-500" />
           </div>
           <p className="text-slate-400 text-lg">{t('noLinks')}</p>
        </div>
      ) : (
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-sm border-b border-slate-800">
                  <th className="p-4 font-medium">{t('linkType')}</th>
                  <th className="p-4 font-medium">{t('linkTitle')}</th>
                  <th className="p-4 font-medium">{t('lockMethod')}</th>
                  <th className="p-4 font-medium">{t('createdDate')}</th>
                  <th className="p-4 font-medium text-right">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-slate-800 rounded-lg">
                          {getIcon(link.contentType)}
                        </div>
                        <span className="capitalize text-slate-300 text-sm">{link.contentType}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="max-w-xs">
                         <p className="text-white font-medium truncate">{link.title}</p>
                         <p className="text-slate-500 text-xs truncate">{link.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        link.lockType === 'PASSWORD' 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {link.lockType === 'PASSWORD' ? t('methodPassword') : t('methodPayment')}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCopy(link)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors flex items-center gap-2 text-xs font-medium"
                          title={t('copyLink')}
                        >
                          {copiedId === link.id ? (
                            <>
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="hidden sm:inline text-green-500">{t('copied')}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="hidden sm:inline">{t('copyLink')}</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="p-2 bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                          title={t('delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};