import ClassTable from "@/components/classTable/classTable";
import FourYearPlan from "@/components/fourYearPlan/fourYearPlan";
import { fetchAllClasses, fetchAllSemesters, fetchAllSemesterClasses } from '../lib/backend.js';
import { useState, useEffect } from "react";

export default function Home({ classes, semesters, all_semester_classes }) {
  
  const [semClasses, setSemClasses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);

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
  
  
  

  useEffect(() => {
    let initialSemClasses = [];

    semesters.forEach((semester) => {
      const semesterId = semester.id;
      const semesterClasses = all_semester_classes[semesterId] || [];
      initialSemClasses.push(semesterClasses);
    });

    setSemClasses(initialSemClasses);
    
  }, [all_semester_classes, semesters]);
  
  return (
    <div className="pt-6">
      <div className="flex w-full h-full overflow-x-hidden overflow-y-hidden">
        <div className="pl-4 flex-none">
          <ClassTable classes={classes} onClassSelection={addClassToSemester}/>
        </div>
        <div className="flex-grow overflow-x-auto">
          <FourYearPlan classes={classes} semesters={semesters} semClasses={semClasses} onSemesterSelection={handleSemesterSelection} selectedSemester={selectedSemester}/>
        </div>
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
// cada element en semesters es un semester. Hay que tener un array holding all classes de ese sem. Cuando all_semester_classes llega, populate those arrays y render
  // un state pa el array que holds estos arrays
  // si el user cambia algo, lo que haces es que añades la clase a este array
    // clase puede ser id y lo fetch con funcion esa
  // despues si le da save, creamos en PUT y table entry mechanism pa que esos new array entries se loggeen en la tabla de all_sem_classes y si vuelves a fetch te salgan todas
  