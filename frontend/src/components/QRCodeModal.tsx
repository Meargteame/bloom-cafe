import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { BloomLogo } from './BloomLogo';
import { CafeInfo } from '../types';
import { QrCode, Download, Printer, Copy, Check, X, Sparkles, Wifi, Sun, Moon } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  cafeInfo: CafeInfo;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  cafeInfo,
}) => {
  const [selectedTable, setSelectedTable] = useState<string>('general');
  const [standTheme, setStandTheme] = useState<'ivory' | 'dark'>('ivory');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}` 
    : 'https://bloom-cafe-bahirdar.vercel.app';

  const targetUrl = selectedTable === 'general' 
    ? baseUrl 
    : `${baseUrl}?table=${selectedTable}`;

  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(targetUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: standTheme === 'ivory' ? '#0B281B' : '#071E13',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code', err));
  }, [targetUrl, isOpen, standTheme]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `Bloom-Cafe-Table-Stand-${selectedTable === 'general' ? 'Menu' : `Table-${selectedTable}`}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Backdrop overlay dismiss */}
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div 
        className="relative w-full max-w-3xl bg-[#071E13] rounded-3xl shadow-2xl border border-[#F4B838]/40 overflow-hidden my-8 text-white z-10 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Ambient Header Glow Line */}
        <div className="h-1.5 bg-gradient-to-r from-[#F4B838] via-[#B0C32E] to-[#F4B838]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#0B281B] border-b border-[#16422E]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#071E13] border border-[#F4B838]/40 flex items-center justify-center text-[#F4B838] shadow-md">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#F4B838] uppercase font-bold tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>IDDO KITCHEN & ARTISAN ROASTERY</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-editorial font-bold text-[#FAF8F5]">Digital Table QR Stand Studio</h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full text-[#8FA597] hover:text-white hover:bg-[#16422E] transition-colors"
            title="Close QR Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6">
          
          {/* Table Location Pills Selector */}
          <div className="bg-[#0B281B] p-4 sm:p-5 rounded-2xl border border-[#16422E] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4B838] flex items-center gap-1.5">
                <span>Select Table Stand Location:</span>
              </label>

              {/* Theme Toggle Buttons */}
              <div className="flex items-center gap-1 bg-[#071E13] p-1 rounded-xl border border-[#16422E]">
                <button
                  type="button"
                  onClick={() => setStandTheme('ivory')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    standTheme === 'ivory'
                      ? 'bg-[#F4B838] text-black shadow-sm'
                      : 'text-[#CAD4CD] hover:text-white'
                  }`}
                >
                  <Sun className="w-3 h-3" />
                  <span>Ivory Stand</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStandTheme('dark')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    standTheme === 'dark'
                      ? 'bg-[#F4B838] text-black shadow-sm'
                      : 'text-[#CAD4CD] hover:text-white'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  <span>Obsidian Stand</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => setSelectedTable('general')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedTable === 'general'
                    ? 'bg-[#F4B838] text-black shadow-lg shadow-[#F4B838]/20 scale-105'
                    : 'bg-[#071E13] text-[#CAD4CD] border border-[#16422E] hover:text-white hover:border-[#F4B838]/50'
                }`}
              >
                All Tables / General Menu
              </button>
              {Array.from({ length: cafeInfo.tableCount || 12 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedTable(String(num))}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedTable === String(num)
                      ? 'bg-[#F4B838] text-black shadow-lg shadow-[#F4B838]/20 scale-105 ring-2 ring-[#F4B838]/40'
                      : 'bg-[#071E13] text-[#CAD4CD] border border-[#16422E] hover:text-white hover:border-[#F4B838]/50'
                  }`}
                >
                  Table {num}
                </button>
              ))}
            </div>
          </div>

          {/* Printable Stand Preview Card Container */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-[#0B281B] p-6 rounded-3xl border border-[#16422E]">
            
            {/* The QR Table Stand Preview Card */}
            <div
              className={`w-72 p-6 rounded-3xl border-4 flex flex-col items-center text-center shadow-2xl transition-all duration-300 relative ${
                standTheme === 'ivory'
                  ? 'bg-[#FBF8F2] text-[#0B281B] border-[#0B281B] ring-4 ring-[#F4B838]/60 shadow-black/80'
                  : 'bg-[#071E13] text-white border-[#F4B838] ring-4 ring-[#16422E] shadow-black/80'
              }`}
            >
              {/* Stand Header Badge */}
              <div className="w-full flex items-center justify-between border-b pb-3 mb-3 border-[#16422E]/30">
                <BloomLogo size="sm" showSubtitle={false} />
                <span className={`px-2.5 py-1 rounded-lg font-mono font-black text-[11px] uppercase tracking-wider border ${
                  standTheme === 'ivory'
                    ? 'bg-[#0B281B] text-[#F4B838] border-[#0B281B]'
                    : 'bg-[#F4B838] text-black border-[#F4B838]'
                }`}>
                  {selectedTable === 'general' ? 'MAIN MENU' : `TABLE ${selectedTable}`}
                </span>
              </div>

              <div className={`text-[10px] tracking-[0.24em] uppercase font-bold mb-3 ${
                standTheme === 'ivory' ? 'text-[#7E5229]' : 'text-[#F4B838]'
              }`}>
                {selectedTable === 'general' ? 'CONTACTLESS ORDERING' : 'TABLE SERVICE QR'}
              </div>

              {/* High Contrast QR Code Frame */}
              <div className="p-3.5 bg-white rounded-2xl shadow-xl border-2 border-[#16422E]/20 mb-3 relative group">
                {qrDataUrl ? (
                  <img 
                    src={qrDataUrl} 
                    alt="Bloom Cafe Menu QR Code" 
                    className="w-40 h-40 object-contain"
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center text-xs text-gray-400">
                    Generating QR Code...
                  </div>
                )}
              </div>

              <p className={`text-xs font-bold leading-snug mb-3 ${
                standTheme === 'ivory' ? 'text-[#0B281B]' : 'text-[#FAF8F5]'
              }`}>
                Point smartphone camera to view menu & place order
              </p>

              {/* Guest WiFi & Passcode Box */}
              <div className={`w-full p-2.5 rounded-xl text-[10px] font-mono space-y-0.5 border ${
                standTheme === 'ivory'
                  ? 'bg-[#EAE5DC] text-[#4A5850] border-[#D6CFC3]'
                  : 'bg-[#0B281B] text-[#CAD4CD] border-[#16422E]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[#F4B838]">
                    <Wifi className="w-3 h-3" /> Guest WiFi:
                  </span>
                  <span className="font-bold font-sans">{cafeInfo.wifiName || 'BloomCafe_Guest'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8FA597]">Passcode:</span>
                  <span className="font-bold font-sans">{cafeInfo.wifiPassword || 'taste_the_bloom'}</span>
                </div>
              </div>
            </div>

            {/* Stand Information & Action Controls */}
            <div className="flex-1 space-y-5 w-full">
              <div>
                <div className="flex items-center gap-2 text-[#F4B838] font-mono text-[10px] uppercase font-bold tracking-wider mb-1">
                  <span>PRINTABLE COUNTER ACRYLIC STAND</span>
                </div>
                <h3 className="text-xl font-editorial font-bold text-white">
                  Table {selectedTable === 'general' ? 'Counter' : selectedTable} Digital Stand
                </h3>
                <p className="text-xs text-[#CAD4CD] mt-1.5 leading-relaxed font-light">
                  Place this QR stand on table counters. When guests scan with their smartphone camera, the digital menu opens instantly with Table {selectedTable === 'general' ? 'selection enabled' : selectedTable} pre-attached to their tray.
                </p>
              </div>

              {/* Direct Table URL Link Box */}
              <div className="p-3 bg-[#071E13] rounded-2xl border border-[#16422E] flex items-center justify-between gap-2 shadow-inner">
                <span className="font-mono text-xs text-[#F4B838] truncate pl-1">
                  {targetUrl}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-[#16422E] hover:bg-[#F4B838] text-[#F4B838] hover:text-black rounded-xl text-xs font-bold uppercase transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy URL'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadQR}
                  className="px-4 py-3 bg-[#F4B838] hover:bg-[#E4A82B] text-black rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F4B838]/20 transform active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Stand Image</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-3 bg-[#071E13] hover:bg-[#16422E] text-white border border-[#16422E] hover:border-[#F4B838] rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Printer className="w-4 h-4 text-[#F4B838]" />
                  <span>Print Physical Stand</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
