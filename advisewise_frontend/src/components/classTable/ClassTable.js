import React from 'react';
import ClassTableHeader from './classTableHeader';
import ClassTableRows from './classTableRows';

const ClassTable = ({ classes }) => {
  return (
    <div className="w-full">
      <div className="p-4 flex justify-center">
        <h1 className="elegant-heading-large">Classes Available</h1>
      </div>
      <div className="class-table-border max-h-[595px] overflow-y-auto">
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
