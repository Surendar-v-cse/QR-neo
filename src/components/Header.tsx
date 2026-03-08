import { Link } from 'react-router-dom';
import { QrCode } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b-4 border-black bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-neo-yellow neo-border neo-shadow-sm group-hover:-translate-y-1 transition-transform">
            <QrCode size={32} strokeWidth={3} />
          </div>
          <span className="font-display text-2xl font-bold tracking-tighter uppercase">
            QR Neo
          </span>
        </Link>
        <nav className="flex gap-6">
          <Link to="/generate" className="font-bold hover:underline decoration-4 underline-offset-4">Generate</Link>
          <Link to="/scan" className="font-bold hover:underline decoration-4 underline-offset-4">Scan</Link>
        </nav>
      </div>
    </header>
  );
};
