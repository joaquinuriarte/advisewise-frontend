import Semester from './semester/Semester';

const FourYearPlan = () => {
  return (
    <div className="w-full">
      <div className="p-4 flex justify-center">
        <h1 className="elegant-heading-large">Four-Year Plan</h1>
      </div>
      <div className="overflow-x-auto py-4">
        {/* First row of semesters */}
        <div className="inline-flex">
          {[...Array(4)].map((_, index) => (
            <Semester key={index} />
          ))}
        </div>
        {/* Second row of semesters */}
        <div className="inline-flex">
          {[...Array(4)].map((_, index) => (
            <Semester key={index + 4} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FourYearPlan;
