import React, { useState } from 'react';
import HeaderExpanded from './HeaderExpanded';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  

  //TODO: What is the purpose of this entire file?
  return ( 
    <div>
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
