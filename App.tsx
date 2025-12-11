import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CTASection from './components/CTASection';
import Programs from './components/Programs';
import Scholarship from './components/Scholarship';
import SecondaryCTA from './components/SecondaryCTA';
import Accreditation from './components/Accreditation';
import Footer from './components/Footer';
import AIChatAgent from './components/AIChatAgent';
import NewsFeed from './components/NewsFeed';
import Admin from './components/Admin';
import PuppeteerSelfTest from './components/PuppeteerSelfTest';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'test'>('home');

  // Handle hash-based routing for simple state persistence
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setCurrentView('admin');
      } else if (hash === '#test') {
        setCurrentView('test');
      } else {
        setCurrentView('home');
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: 'home' | 'admin' | 'test') => {
    if (view === 'admin') {
      window.location.hash = 'admin';
    } else if (view === 'test') {
      window.location.hash = 'test';
    } else {
      window.location.hash = '';
      if (window.history.pushState) {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }
  };

  const toggleChat = () => setIsChatOpen(prev => !prev);
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  const skipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 flex flex-col relative font-sans text-gray-900 dark:text-gray-100">
        
        <a 
          href="#main-content"
          onClick={skipToContent}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-aucdt-maroon text-white px-4 py-2 rounded font-bold shadow-lg"
        >
          Skip to main content
        </a>

        {currentView === 'admin' ? (
          <Admin onBack={() => navigateTo('home')} />
        ) : currentView === 'test' ? (
          <PuppeteerSelfTest onBack={() => navigateTo('home')} />
        ) : (
          <>
            <Header onChatToggle={toggleChat} />
            <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
              <HeroSlider />
              <CTASection />
              <Programs />
              <Scholarship />
              <NewsFeed />
              <SecondaryCTA />
              <Accreditation />
            </main>
            <Footer 
              onAdminClick={() => navigateTo('admin')} 
              onTestClick={() => navigateTo('test')}
            />
            <AIChatAgent 
              isOpen={isChatOpen} 
              onClose={closeChat} 
              onOpen={openChat}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;