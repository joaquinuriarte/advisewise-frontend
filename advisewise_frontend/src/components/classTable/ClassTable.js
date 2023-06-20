import React from 'react';
import ClassTableHeader from './classTableHeader';
import ClassTableRows from './classTableRows';

const ClassTable = ({ classes }) => {
  return (
    <div className="w-[450px]">
      <div className="p-4 flex justify-center">
        <h1 className="elegant-heading-large text-blue pt-1 pb-1">Classes Available</h1>
      </div>
      <div className="class-table-border max-h-[476px]">
        <table className="w-full">
          <colgroup>
            <col style={{width: '70%'}}/>
            <col style={{width: '30%'}}/>
          </colgroup>
          <thead>
            <ClassTableHeader />
          </thead>
          <tbody>
            <ClassTableRows classes={classes} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTable;
