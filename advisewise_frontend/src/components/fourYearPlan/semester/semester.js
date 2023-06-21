import React from 'react';

const Semester = ({ classes, semester, semester_classes }) => {
 
  console.log("hey")
  console.log(semester_classes);
  const classInfo = getClassInfo(semester_classes, classes);
  const totalCredits = classInfo.reduce((sum, info) => sum + info[1], 0);


  return (
    <div className="bg-white border rounded-xl w-80 p-2 m-2">
      <div className="bg-lighter_gray p-2 rounded-md text-center">
        <h2 className="font-semibold elegant-heading-small text-dark_gray">{semester.name}</h2>
      </div>

      <div className="p-2">
        <div className="flex mb-2">
          <div className="font-semibold elegant-heading-small w-3/4 text-dark_gray">Class</div>
          <div className="font-semibold elegant-heading-small w-1/4 text-center text-dark_gray">Credits</div>
        </div>

        {classInfo.map((info) => (
          <div key={info[0]} className="flex mb-1">
            <div className="elegant-heading-small w-3/4 text-dark_gray">{info[0]}</div>
            <div className="elegant-heading-small w-1/4 text-center text-dark_gray">{info[1]}</div>
          </div>
        ))}
      </div>

      <div className="p-2 bg-lighter_gray rounded-md flex">
        <div className="elegant-heading-small w-1/2 text-dark_gray">Difficulty</div>
        <div className="elegant-heading-small w-1/2 text-right text-dark_gray">Total Credits: {totalCredits}</div>
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
    .filter(Boolean)
    .map((classItem) => [classItem.class_name, classItem.number_of_credits]);
}
