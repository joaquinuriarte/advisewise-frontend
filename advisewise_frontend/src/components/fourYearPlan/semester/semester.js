import React from 'react';

const Semester = () => {
  // Sample data for classes in a semester
  const classes = [
    { className: 'Math 101', credits: 4 },
    { className: 'History 201', credits: 3 },
    { className: 'Chemistry 101', credits: 4 },
    { className: 'English 102', credits: 3 },
  ];

  // Calculating the total credits for the semester
  const totalCredits = classes.reduce((acc, curr) => acc + curr.credits, 0);

  return (
    <div className="border border-gray-400 rounded-md w-80 p-2 m-2">
      {/* Header */}
      <div className="bg-gray-200 p-2 text-center">
        <h2 className="elegant-heading-small">Fall 2023</h2>
      </div>

      {/* Main Content */}
      <div className="p-2">
        {/* Column Headers */}
        <div className="flex mb-2 font-semibold">
          <div className="elegant-heading-small w-3/4">Class</div>
          <div className=" elegant-heading-small w-1/4 text-center">Credits</div>
        </div>

        {/* Rows with class information */}
        {classes.map((classInfo, index) => (
          <div key={index} className="flex mb-1">
            <div className="elegant-heading-small w-3/4">{classInfo.className}</div>
            <div className="elegant-heading-small w-1/4 text-center">{classInfo.credits}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2 bg-gray-100 flex">
        <div className="elegant-heading-small w-1/2">Difficulty</div>
        <div className="elegant-heading-small w-1/2 text-right">Total Credits: {totalCredits}</div>
      </div>
    </div>
  );
};

export default Semester;
