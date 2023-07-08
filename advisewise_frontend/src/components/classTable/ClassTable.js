import React from 'react';
import ClassTableHeader from './classTableHeader';
import ClassTableRows from './classTableRows';

const ClassTable = ({ classes, onClassSelection }) => {
  const handleClassClick = (classItem) => {
    onClassSelection(classItem);
  };

  return (
    <div className="flex flex-col h-max w-80">
      <div className="p-4 flex justify-center">
        <h1 className="elegant-heading-large text-blue pt-1 pb-1">Classes Available</h1>
      </div>
      <div className="class-table-border">
        <table className="w-full">
          <colgroup>
            <col style={{width: '70%'}}/>
            <col style={{width: '30%'}}/>
          </colgroup>
          <thead>
            <ClassTableHeader />
          </thead>
          <tbody>
            <ClassTableRows classes={classes} onClickClass={handleClassClick} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTable;
