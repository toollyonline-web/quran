
import React, { useState, useEffect } from 'react';

const InstallPwaPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already in standalone mode
    const isAppStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                           (window.navigator as any).standalone === true;
    setIsStandalone(isAppStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Handle Chrome/Android prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show popup if not already standalone and not on iOS (which needs manual guide)
      if (!isAppStandalone) {
        setTimeout(() => setShowPopup(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // If it's iOS and not standalone, show the guide
    if (isIosDevice && !isAppStandalone) {
      setTimeout(() => setShowPopup(true), 4000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPopup(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPopup || isStandalone) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[100] sm:left-auto sm:right-6 sm:w-96 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl"></div>
        
        <button 
          onClick={() => setShowPopup(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="flex-1 pr-6">
            <h3 className="font-bold text-slate-900 dark:text-white">Install Quran Kareem</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Read and listen offline for a better experience.</p>
          </div>
        </div>

        <div className="mt-6">
          {isIos ? (
            <div className="rounded-2xl bg-stone-50 p-4 text-xs dark:bg-slate-800">
              <p className="font-semibold text-slate-700 dark:text-slate-300">To install on iOS:</p>
              <ol className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">1</span>
                  Tap the <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> Share icon
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">2</span>
                  Scroll down and select <span className="font-bold">"Add to Home Screen"</span>
                </li>
              </ol>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              disabled={!deferredPrompt}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 disabled:opacity-50 dark:shadow-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Install App
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallPwaPopup;
