import React from 'react';

function HeaderExpanded({ onHeaderExpandClick }) {
  return (
    <header className="header-expanded-container">
      <div className="flex justify-between items-center w-full sticky top-0 z-50">
        <h1 className="font-nunito text-white text-base px-2 pl-2">advisewise</h1>
        <div className="menu-items" onClick={onHeaderExpandClick}>
          <h1 className="font-nunito text-blue text-base px-2">Λ</h1>
        </div>
      </div>

      <hr className="mt-2 mb-2 mx-2 border-t border-white"/>

      <div className="grid grid-cols-2 gap-4 p-4">
        <div>
          <h2 className="pb-4 text-center text-white elegant-heading-medium">Degree Information</h2>
          <div className="text-center">
            <label className="text-white elegant-heading-small block">
              Major
              <select className="w-full mt-1 mb-2 rounded-md">
                {/* your options here */}
              </select>
            </label>
            <label className="text-white elegant-heading-small block">
              Minor
              <select className="w-full mt-1 mb-2 rounded-md">
                {/* your options here */}
              </select>
            </label>
            <label className="text-white elegant-heading-small block">
              Specific Classes
              <select className="w-full mt-1 mb-2 rounded-md">
                {/* your options here */}
              </select>
            </label>
            <p className="text-white elegant-heading-small block">Official</p>
          </div>
          <div className="flex justify-center mt-4">
            <label className="text-white elegant-heading-small px-2 button-style">
              <input type="radio" name="official" value="yes" className="hidden" />
              <span className="px-4 py-2 rounded-full border border-white">Yes</span>
            </label>
            <label className="text-white elegant-heading-small px-2 button-style">
              <input type="radio" name="official" value="no" className="hidden" />
              <span className="px-4 py-2 rounded-full border border-white">No</span>
            </label>
          </div>
        </div>

        <div>
          <h2 className="pb-4 text-center text-white elegant-heading-medium">Your Plans</h2>
          {/* Your list here */}
        </div>
      </div>
      <div><h2 className="pt-10 text-center text-white elegant-heading-medium">GO</h2></div>
    </header>
  );
}

export default HeaderExpanded;
