import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Download, RefreshCw, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Generator = () => {
  const [text, setText] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const url = await QRCode.toDataURL(text, {
        width: 1024,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="font-display text-5xl font-bold mb-8 uppercase tracking-tighter">
          Generate <span className="text-neo-blue">QR Code</span>
        </h1>

        <Card className="mb-8">
          <div className="space-y-6">
            <div>
              <label className="block font-bold mb-2 uppercase text-sm">Enter Text or URL</label>
              <Input
                placeholder="https://example.com"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateQRCode()}
              />
            </div>
            <Button 
              onClick={generateQRCode} 
              disabled={!text || loading}
              className="w-full flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="animate-spin" /> : 'Generate QR Code'}
            </Button>
          </div>
        </Card>

        {qrDataUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="flex flex-col items-center bg-neo-yellow/5">
              <div className="neo-border p-4 bg-white mb-6 neo-shadow-sm">
                <img src={qrDataUrl} alt="Generated QR Code" className="w-64 h-64" referrerPolicy="no-referrer" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="secondary" onClick={downloadQR} className="flex items-center justify-center gap-2">
                  <Download size={20} /> Download
                </Button>
                <Button variant="accent" onClick={() => navigator.share?.({ url: text })} className="flex items-center justify-center gap-2">
                  <Share2 size={20} /> Share
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
