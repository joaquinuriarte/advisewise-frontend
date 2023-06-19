import Semester from './semester/Semester';

//TODO: Only allows for 8 semester schedules. More or less will fuck everything up. 

const FourYearPlan = ({ classes, semesters, all_semester_classes }) => {
  return (
    <div className="w-full">
      <div className="p-4 flex justify-center">
        <h1 className="elegant-heading-large">Four-Year Plan</h1>
      </div>
      <div className="overflow-x-auto py-4">
        {/* First row of semesters */}
        <div className="inline-flex">
          {semesters.slice(0, 4).map((semester) => (
            <Semester key={semester.id} classes={classes} semester={semester} semester_classes={all_semester_classes[semester.id]}/>
          ))}
        </div>
        {/* Second row of semesters */}
        <div className="inline-flex">
          {semesters.slice(4).map((semester) => (
            <Semester key={semester.id} classes={classes} semester={semester} semester_classes={all_semester_classes[semester.id]}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FourYearPlan;
