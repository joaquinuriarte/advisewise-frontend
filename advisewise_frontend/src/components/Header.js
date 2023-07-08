import React from 'react';

function Header({onHeaderExpandClick}) {
  return (
    <header className="header-container">
      <h1 className="font-nunito text-white text-base px-2 pl-2">advisewise</h1>
      <div className="menu-items" onClick={() => onHeaderExpandClick()}>
        <h1 className="font-nunito text-white text-base px-2">V</h1>
      </div>
    </header>
  );
}

export default Header;
