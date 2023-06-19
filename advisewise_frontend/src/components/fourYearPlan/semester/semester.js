import React from 'react';

const Semester = ({ classes, semester, semester_classes }) => {
 

  const classInfo = getClassInfo(semester_classes, classes);
  const totalCredits = classInfo.reduce((sum, info) => sum + info[1], 0);


  return (
    <div className="border border-gray-400 rounded-md w-80 p-2 m-2">
      <div className="bg-gray-200 p-2 text-center">
        <h2 className="elegant-heading-small">{semester.name}</h2>
      </div>


      <div className="p-2">
        <div className="flex mb-2 font-semibold">
          <div className="elegant-heading-small w-3/4">Class</div>
          <div className=" elegant-heading-small w-1/4 text-center">Credits</div>
        </div>

        {classInfo.map((info) => (
          <div key={info[0]} className="flex mb-1">
            <div className="elegant-heading-small w-3/4">{info[0]}</div>
            <div className="elegant-heading-small w-1/4 text-center">{info[1]}</div>
          </div>
        ))}
      </div>

      <div className="p-2 bg-gray-100 flex">
        <div className="elegant-heading-small w-1/2">Difficulty</div>
        <div className="elegant-heading-small w-1/2 text-right">Total Credits: {totalCredits}</div>
      </div>
    </div>
  );
};

export default Semester;

function getClassInfo(semesterClasses, classes) {
  const classMap = new Map(classes.map((classItem) => [classItem.id, classItem]));
  return semesterClasses
    .map((semesterClass) => classMap.get(semesterClass.course_id))
    .filter(Boolean)
    .map((classItem) => [classItem.class_name, classItem.number_of_credits]);
}