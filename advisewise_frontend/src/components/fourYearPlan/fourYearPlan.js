import Semester from './semester/Semester';

//TODO: Only allows for 8 semester schedules. More or less will fuck everything up. 

const FourYearPlan = ({ classes, semesters, semClasses, onSemesterSelection, selectedSemester, onClassSelection}) => {

  const handleClassClick = (classItem) => {
    onClassSelection(classItem);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-center p-4">
        <h1 className="elegant-heading-large text-blue">Four-Year Plan</h1>
      </div>

      <div className="four-year-plan-border" style={{height: '100%', width: '100%'}}>
        <div className="inline-flex whitespace-nowrap" style={{height: '50%'}}>
          {semesters.slice(0, 4).map((semester) => (
            <Semester key={semester.id} classes={classes} semester={semester} semester_classes={(semClasses.find(tuple => tuple[0] === semester.id) || [])[1]} 
              onSemesterSelection={onSemesterSelection} selectedSemester={selectedSemester} onClickClass={handleClassClick} style={{width: '25%'}}/>
          ))}
        </div>

        <div className="inline-flex whitespace-nowrap" style={{height: '50%'}}>
          {semesters.slice(4).map((semester) => (
            <Semester key={semester.id} classes={classes} semester={semester} semester_classes={(semClasses.find(tuple => tuple[0] === semester.id) || [])[1]} 
              onSemesterSelection={onSemesterSelection} selectedSemester={selectedSemester} onClickClass={handleClassClick} style={{width: '25%'}}/>

          ))}
        </div>
      </div>
    </div>
  );
};


export default FourYearPlan;

