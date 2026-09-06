import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { BloomLogo } from './BloomLogo';
import { CafeInfo } from '../types';
import { QrCode, Download, Printer, Copy, Check, X, Sparkles, Wifi } from 'lucide-react';

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
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}` 
    : 'https://bloomcafe.app';

  const targetUrl = selectedTable === 'general' 
    ? baseUrl 
    : `${baseUrl}?table=${selectedTable}`;

  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(targetUrl, {
      width: 420,
      margin: 2,
      color: {
        dark: '#0B281B', // Deep Forest Green
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code', err));
  }, [targetUrl, isOpen]);

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
    a.download = `Bloom-Cafe-QR-${selectedTable === 'general' ? 'Menu' : `Table-${selectedTable}`}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0B281B] rounded-3xl shadow-2xl border border-[#16422E] overflow-hidden my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#071E13] border-b border-[#16422E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] border border-[#16422E] flex items-center justify-center text-[#F4B838]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-editorial font-bold text-[#FAF8F5]">Digital Table QR Stand</h2>
              <p className="text-xs text-[#CAD4CD]">Instant contactless ordering for your guests</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8FA597] hover:text-white hover:bg-[#16422E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Table Selector */}
          <div className="bg-[#071E13] p-4 rounded-2xl border border-[#16422E] space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4B838] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Select Table Location:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedTable('general')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedTable === 'general'
                    ? 'bg-[#F4B838] text-black shadow-md'
                    : 'bg-[#0B281B] text-[#CAD4CD] border border-[#16422E] hover:text-white hover:border-[#F4B838]/50'
                }`}
              >
                All Tables / General
              </button>
              {Array.from({ length: cafeInfo.tableCount || 16 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedTable(String(num))}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedTable === String(num)
                      ? 'bg-[#F4B838] text-black shadow-md ring-2 ring-[#F4B838]/40'
                      : 'bg-[#0B281B] text-[#CAD4CD] border border-[#16422E] hover:text-white hover:border-[#F4B838]/50'
                  }`}
                >
                  Table {num}
                </button>
              ))}
            </div>
          </div>

          {/* Printable Stand Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#071E13] p-6 rounded-2xl border border-[#16422E] shadow-inner">
            {/* The QR Table Stand Card */}
            <div className="w-64 bg-[#FBF8F2] text-[#0B281B] p-5 rounded-2xl border-4 border-[#0B281B] ring-2 ring-[#F4B838] flex flex-col items-center text-center shadow-2xl shrink-0">
              <div className="mb-2">
                <BloomLogo size="sm" showSubtitle={false} />
              </div>
              
              <div className="text-[10px] tracking-[0.24em] uppercase font-bold text-[#7E5229] mb-2">
                {selectedTable === 'general' ? 'Scan For Digital Menu' : `Table ${selectedTable} Menu`}
              </div>

              {/* QR Image Box */}
              <div className="p-3 bg-white rounded-xl shadow-md border border-[#E1ECE7] mb-3">
                {qrDataUrl ? (
                  <img 
                    src={qrDataUrl} 
                    alt="Bloom Cafe Menu QR Code" 
                    className="w-36 h-36 object-contain"
                  />
                ) : (
                  <div className="w-36 h-36 flex items-center justify-center text-xs text-gray-400">
                    Generating...
                  </div>
                )}
              </div>

              <p className="text-[11px] font-semibold text-[#0B281B] leading-tight mb-2">
                Scan with camera to browse & order
              </p>

              {/* Guest WiFi on Stand */}
              <div className="w-full bg-[#EAE5DC] p-2 rounded-lg text-[10px] text-[#4A5850] space-y-0.5">
                <div className="font-mono">WiFi: <span className="font-bold text-[#0B281B]">{cafeInfo.wifiName}</span></div>
                <div className="font-mono">Key: <span className="font-bold text-[#0B281B]">{cafeInfo.wifiPassword}</span></div>
              </div>
            </div>

            {/* Actions & Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-base font-editorial font-bold text-white">
                  Table Stand Display
                </h3>
                <p className="text-xs text-[#CAD4CD] mt-1 leading-relaxed">
                  Place this stand on Table {selectedTable === 'general' ? 'counters' : selectedTable}. When customers scan this code on their smartphone, it opens the contactless digital menu with their table number pre-selected.
                </p>
              </div>

              <div className="p-3 bg-[#0B281B] rounded-xl border border-[#16422E] flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-[#A8BAAE] truncate">
                  {targetUrl}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 bg-[#16422E] hover:bg-[#F4B838] text-[#F4B838] hover:text-black rounded-lg text-[11px] font-bold uppercase transition-colors shrink-0 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadQR}
                  className="flex-1 px-4 py-2.5 bg-[#F4B838] hover:bg-[#E4A82B] text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PNG</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 px-4 py-2.5 bg-[#0B281B] hover:bg-[#123827] text-white border border-[#16422E] hover:border-[#F4B838] rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-[#F4B838]" />
                  <span>Print Stand</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
