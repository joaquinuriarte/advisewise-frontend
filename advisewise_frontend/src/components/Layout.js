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
    <div className="flex flex-col min-h-screen">
      <div className="app-background flex items-center justify-center">
        {isHeaderExpanded ? (
          <HeaderExpanded onHeaderExpandClick={handleHeaderExpandClick} />
        ) : (
          <Header onHeaderExpandClick={handleHeaderExpandClick} />
        )}
      </div>
      <main className={`flex-grow app-background ${isHeaderExpanded ? 'blur' : ''}`}>
        {children}
      </main>
      <Footer />
      <style jsx>{`
        .blur {
          filter: blur(4px); // Apply desired blur effect
        }
      `}</style>
    </div>
  );
}

export default Layout;
