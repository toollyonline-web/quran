
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InstallPwaPopup from './components/InstallPwaPopup';
import Home from './pages/Home';
import SurahList from './pages/SurahList';
import JuzList from './pages/JuzList';
import Reader from './pages/Reader';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import NamesOfAllah from './pages/NamesOfAllah';
import ZakatCalculator from './pages/ZakatCalculator';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('quran_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('quran_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('quran_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-stone-50 transition-colors duration-300 dark:bg-slate-950">
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="mx-auto w-full max-w-7xl grow px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/surahs" element={<SurahList />} />
            <Route path="/juzs" element={<JuzList />} />
            <Route path="/surah/:id" element={<Reader />} />
            <Route path="/juz/:id" element={<Reader />} />
            <Route path="/about" element={<About />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/99-names" element={<NamesOfAllah />} />
            <Route path="/zakat" element={<ZakatCalculator />} />
          </Routes>
        </main>
        <Footer />
        <InstallPwaPopup />
      </div>
    </Router>
  );
};

export default App;
