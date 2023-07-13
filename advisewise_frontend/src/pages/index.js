import ClassTable from "@/components/classTable/classTable";
import FourYearPlan from "@/components/fourYearPlan/fourYearPlan";
import { fetchAllClasses, fetchAllSemesters, fetchAllSemesterClasses } from '../lib/backend.js';
import { useState, useEffect } from "react";

export default function Home({ classes, semesters, all_semester_classes }) {
  
  const [semClasses, setSemClasses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);

  useEffect(() => {
    let initialSemClasses = [];

    semesters.forEach((semester) => {
      const semesterId = semester.id;
      const semesterClasses = all_semester_classes[semesterId] || [];
      initialSemClasses.push(semesterClasses);
    });

    setSemClasses(initialSemClasses);
    
  }, [all_semester_classes, semesters]);

  const handleSemesterSelection = (semesterId) => {
    setSelectedSemester(semesterId);
  };

  const addClassToSemester = (selectedClass) => {
    if (selectedSemester === null) {
      // No semester selected
      return;
    }
    const new_class = {course_id: selectedClass.id, difficulty: 'Medium'}; //TODO: Here you would idealy have selectedClass.difficulty
   
    setSemClasses((prevSemClasses) => {
      const semesterIndex = semesters.findIndex((sem) => sem.id === selectedSemester);
      if (semesterIndex !== -1) {
        const newSemClasses = [...prevSemClasses]; // Create a new array reference
        newSemClasses[semesterIndex] = [...newSemClasses[semesterIndex], new_class];
        console.log(newSemClasses);
        return newSemClasses;
      }
  
      return prevSemClasses; // No changes made
    });
  };

 
  
  return (
    <div className="flex flex-col" style={{height: '100vh'}}>
        <div className="flex flex-grow pt-6" style={{height: '80%', width: '100%'}}>
          <div className="pl-2 pr-1" style={{width: '25%'}}>
              <ClassTable classes={classes} onClassSelection={addClassToSemester}/>
          </div>
    
          <div className="overflow-x-auto pl-1 pr-2" style={{width: '75%'}}>
              <FourYearPlan classes={classes} semesters={semesters} semClasses={semClasses} onSemesterSelection={handleSemesterSelection} selectedSemester={selectedSemester}/>
          </div>
        </div>
  
        <div className="flex pt-10 pl-64" style={{height: '20%'}}>
          <h1>A WHOLE ROW</h1>
        </div>
  
    </div>
  );
  

}

export async function getStaticProps() {
  try {
    const [classes, semesters] = await Promise.all([
      fetchAllClasses(),
      fetchAllSemesters({ fourYearPlan: 1 }),
    ]);
    const all_semester_classes = {};
    for (let i = 0; i < semesters.length; i++) {
      try {
        all_semester_classes[semesters[i].id] = await fetchAllSemesterClasses(semesters[i].id);
      } catch (error) {
        console.error('Error fetching semester classes:', error);
      }
    }
    return {
      props: {
        classes: classes || [],
        semesters: semesters || [],
        all_semester_classes: all_semester_classes,
      },
    };
  } catch (error) {
    console.error('Error fetching classes and semesters:', error);
    throw error;
  }
}
