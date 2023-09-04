import React from 'react';

const ClassTableHeader = () => {
  return (
    <tr className="sticky top-0 z-50">
      <th className="class-table-header elegant-heading-small font-semibold text-dark_gray">Name</th>
      <th className="class-table-header elegant-heading-small font-semibold text-dark_gray">Credits</th>
    </tr>
  );
};

export default ClassTableHeader;
