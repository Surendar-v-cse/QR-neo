import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { QrCode, Camera, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Home = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 uppercase tracking-tighter leading-none">
          QR Code <br />
          <span className="bg-neo-yellow px-4 neo-border inline-block -rotate-2">Utility</span>
        </h1>
        <p className="text-xl font-bold max-w-xl mx-auto">
          Generate and scan QR codes with a bold, neo-brutalist interface. 
          Fast, secure, and purely functional.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col items-center text-center p-8 bg-neo-blue/10">
          <div className="w-20 h-20 bg-neo-blue neo-border neo-shadow flex items-center justify-center mb-6 -rotate-3">
            <QrCode size={40} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="font-display text-3xl font-bold mb-4 uppercase">Generate QR</h2>
          <p className="mb-8 font-medium">Create custom QR codes from any text or URL in seconds.</p>
          <Link to="/generate" className="w-full">
            <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
              Start Generating <ArrowRight size={20} />
            </Button>
          </Link>
        </Card>

        <Card className="flex flex-col items-center text-center p-8 bg-neo-pink/10">
          <div className="w-20 h-20 bg-neo-pink neo-border neo-shadow flex items-center justify-center mb-6 rotate-3">
            <Camera size={40} strokeWidth={3} />
          </div>
          <h2 className="font-display text-3xl font-bold mb-4 uppercase">Scan QR</h2>
          <p className="mb-8 font-medium">Use your device camera to instantly decode any QR code.</p>
          <Link to="/scan" className="w-full">
            <Button variant="accent" className="w-full flex items-center justify-center gap-2">
              Open Scanner <ArrowRight size={20} />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};
