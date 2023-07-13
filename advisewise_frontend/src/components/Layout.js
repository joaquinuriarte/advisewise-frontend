import React, { useState } from 'react';
import HeaderExpanded from './HeaderExpanded';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  const handleHeaderExpandClick = () => {
    setIsHeaderExpanded(!isHeaderExpanded);
  }; 

  //TODO: Header is always rendering so that <main /> doesn't shift up when user changes to expanded header. Not sure if this is the best solution.  
  //TODO: Cuando cambias a header expanded hay un color inconsistency arriba en el header area
  //TODO: el V no se cambia a azul cuando clicks
  return ( 
    <div className="flex flex-col min-h-screen relative">
      <div className="app-background flex items-center justify-center">
        <Header onHeaderExpandClick={handleHeaderExpandClick} /> 
      </div> 
      {isHeaderExpanded && (
        <div className="header-expanded-overlay">
        <HeaderExpanded onHeaderExpandClick={handleHeaderExpandClick} />
        </div>
      )}
      <main className={`flex-grow app-background ${isHeaderExpanded ? 'blur' : ''}`}  style={{overflow: 'auto'}}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
