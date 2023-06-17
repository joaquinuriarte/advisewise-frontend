import React from 'react';

const ClassTable = ({ children }) => {
  return (
    <div className="w-2/3 max-h-80 border border-gray-600 rounded-md overflow-y-auto">
      <table className="w-full">
        {children}
      </table>
    </div>
  );
};

export default ClassTable;

// TODO: Change style to global styles