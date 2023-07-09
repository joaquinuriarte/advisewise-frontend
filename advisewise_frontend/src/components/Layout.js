import React, { useState } from 'react';
import HeaderExpanded from './HeaderExpanded';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  const handleHeaderExpandClick = () => {
    setIsHeaderExpanded(!isHeaderExpanded);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="app-background flex items-center justify-center">
        {!isHeaderExpanded && (
          <Header onHeaderExpandClick={handleHeaderExpandClick} />
        )}
      </div>
      {isHeaderExpanded && (
        <div className="header-expanded-overlay">
        <HeaderExpanded onHeaderExpandClick={handleHeaderExpandClick} />
        </div>
      )}
      <main className={`flex-grow app-background ${isHeaderExpanded ? 'blur' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
