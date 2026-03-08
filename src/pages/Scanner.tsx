import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Copy, Check, RefreshCw, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const Scanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      /* verbose= */ false
    );

    scanner.render(onScanSuccess, onScanFailure);
    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear scanner", error);
        });
      }
    };
  }, []);

  async function onScanSuccess(decodedText: string) {
    setScanResult(decodedText);
    
    // Log scan to backend
    try {
      await fetch('/api/logs/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: decodedText,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error("Failed to log scan", err);
    }

    // Stop scanning after success
    if (scannerRef.current) {
      // We don't necessarily want to clear it immediately if we want to show the camera, 
      // but usually for UX we stop.
    }
  }

  function onScanFailure(error: any) {
    // console.warn(`Code scan error = ${error}`);
  }

  const copyToClipboard = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
  };

  const isUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="font-display text-5xl font-bold mb-8 uppercase tracking-tighter">
          Scan <span className="text-neo-pink">QR Code</span>
        </h1>

        <Card className="mb-8 overflow-hidden p-0">
          <div id="reader" className="w-full"></div>
          {!scanResult && (
            <div className="p-4 bg-neo-pink/10 border-t-4 border-black text-center font-bold">
              Position the QR code within the frame
            </div>
          )}
        </Card>

        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-neo-green/10">
              <h2 className="font-display text-2xl font-bold mb-4 uppercase">Scan Result</h2>
              <div className="neo-border bg-white p-4 mb-6 break-all font-mono text-sm">
                {scanResult}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button onClick={copyToClipboard} className="flex items-center justify-center gap-2">
                  {isCopied ? <Check size={20} /> : <Copy size={20} />}
                  {isCopied ? 'Copied!' : 'Copy Result'}
                </Button>
                
                {isUrl(scanResult) ? (
                  <a href={scanResult} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                      <ExternalLink size={20} /> Open Link
                    </Button>
                  </a>
                ) : (
                  <Button variant="accent" onClick={resetScanner} className="flex items-center justify-center gap-2">
                    <RefreshCw size={20} /> Scan Again
                  </Button>
                )}
              </div>
              
              {isUrl(scanResult) && (
                <Button variant="accent" onClick={resetScanner} className="w-full mt-4 flex items-center justify-center gap-2">
                  <RefreshCw size={20} /> Scan Another
                </Button>
              )}
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
