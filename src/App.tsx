import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Generator } from './pages/Generator';
import { Scanner } from './pages/Scanner';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-[#f0f0f0] pattern-dots">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<Generator />} />
            <Route path="/scan" element={<Scanner />} />
          </Routes>
        </main>
        <footer className="border-t-4 border-black bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center font-bold">
            <p className="uppercase tracking-widest text-sm">
              Built with Neo-Brutalism & React © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
