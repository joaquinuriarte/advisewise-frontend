import React from 'react';

const ClassTableHeader = () => {
  return (
    <tr className="sticky top-0 z-50" style={{ backgroundColor: 'rgba(235, 246, 255, 1)' }}>
      <th className="p-2 text-center elegant-heading-small" style={{textAlign: 'center', backgroundColor: 'rgba(235, 246, 255, 1)' }}>Name</th>
      <th className="p-2 text-center elegant-heading-small" style={{textAlign: 'center', backgroundColor: 'rgba(235, 246, 255, 1)' }}>Credits</th>
    </tr>
  );
};

export default ClassTableHeader;
