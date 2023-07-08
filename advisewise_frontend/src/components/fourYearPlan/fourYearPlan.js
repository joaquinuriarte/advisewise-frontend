import Semester from './semester/Semester';

//TODO: Only allows for 8 semester schedules. More or less will fuck everything up. 

const FourYearPlan = ({ classes, semesters, semClasses, onSemesterSelection, selectedSemester}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="p-4">
        <h1 className="elegant-heading-large text-blue text-center">Four-Year Plan</h1>
      </div>

      <div className="four-year-plan-border">
        <div className="inline-flex whitespace-nowrap overflow-x-auto">
          {semesters.slice(0, 4).map((semester) => (
            <Semester key={semester.id} classes={classes} semester={semester} semester_classes={semClasses[semester.id-1]} onSemesterSelection={onSemesterSelection} selectedSemester={selectedSemester}/>
          ))}
        </div>

        <div className="inline-flex whitespace-nowrap overflow-x-auto">
          {semesters.slice(4).map((semester) => (
            <Semester key={semester.id} classes={classes} semester={semester} semester_classes={semClasses[semester.id-1]} onSemesterSelection={onSemesterSelection} selectedSemester={selectedSemester}/>
          ))}
        </div>
      </div>
    </div>
  );
};


export default FourYearPlan;

