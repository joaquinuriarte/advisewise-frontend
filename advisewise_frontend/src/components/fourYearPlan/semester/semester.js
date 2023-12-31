import React from 'react';

const Semester = ({ classes, semester, semester_classes, selectedSemester, onSemesterSelection, onClickClass, style}) => {
  const classInfo = getClassInfo(semester_classes, classes);
  const totalCredits = classInfo.reduce((sum, classItem) => sum + classItem.number_of_credits, 0);

  const handleClassClick = (classItem) => {
    onClickClass(classItem);
  };

  return (
    <div 
      className={`bg-white border rounded-xl p-2 m-2 mb-0 ${semester.id === selectedSemester ? 'border-red' : ''}`} 
      onClick={() => onSemesterSelection(semester.id)} style={{
        ...style,
        width: `calc(${style.width} - 1rem)`,  // subtract 2 * 0.5rem for left and right padding and 2 * 0.5rem for left and right margin
        height: `calc(${style.height} - 1rem)`, // subtract 2 * 0.5rem for top and bottom padding and 2 * 0.5rem for top and bottom margin
      }}

    >
      <div className="flex bg-lighter_gray p-2 rounded-md justify-center" style={{height: '15%'}}>
        <h2 className="font-semibold elegant-heading-small text-dark_gray">{semester.name}</h2>
      </div>
      
      <div className="p-2 pt-0 overflow-x-auto semester-classes" style={{height: '70%'}}>
        <div className="flex mb-2 sticky top-0 z-50 bg-white">
          <div className="font-semibold elegant-heading-small w-3/4 text-dark_gray">Class</div>
          <div className="font-semibold elegant-heading-small w-1/4 text-center text-dark_gray">Credits</div>
        </div>

        {classInfo.map((classItem) => ( //TODO: if you click on a class in a new sem it will fire both onClicks in this script. It should fire the top one first then this one here. 
          <div key={classItem.id} className="flex mb-1 sticky top-[-1] z-10" onClick={() => handleClassClick(classItem)}>
            <div className="elegant-heading-small w-3/4 text-dark_gray">{classItem.class_name}</div>
            <div className="elegant-heading-small w-1/4 text-center text-dark_gray">{classItem.number_of_credits}</div>
          </div>
        ))}
      </div>

      <div className="flex p-2 bg-lighter_gray rounded-md" style={{height: '15%'}}>
        <div className="elegant-heading-small w-1/3 text-dark_gray">Difficulty</div>
        <div className="elegant-heading-small w-2/3 text-right text-dark_gray">Total Credits: {totalCredits}</div>
      </div>
      
    </div>
  );
};

export default Semester;

function getClassInfo(semesterClasses, classes) {
  if (!Array.isArray(semesterClasses)) {
    return [];
  }
  
  const classMap = new Map(classes.map((classItem) => [classItem.id, classItem]));
  return semesterClasses
    .map((semesterClass) => classMap.get(semesterClass.course_id))
    .filter(Boolean);
}

