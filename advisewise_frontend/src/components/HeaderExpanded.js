import React from 'react';

function HeaderExpanded({ onHeaderExpandClick }) {
  return (
    <header className="header-expanded-container">
      <h1 className="font-nunito text-white text-base px-2 pl-2">advisewise</h1>
      <div className="menu-items" onClick={() => onHeaderExpandClick()}>
        <h1 className="font-nunito text-white text-base px-2">V</h1>
      </div>
      <div className="plans-container">
        <h1>PLANS</h1>
      </div>
    </header>
  );
}

export default HeaderExpanded;
