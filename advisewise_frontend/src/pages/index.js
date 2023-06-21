import ClassTable from "@/components/classTable/classTable";
import FourYearPlan from "@/components/fourYearPlan/fourYearPlan";
import { fetchAllClasses, fetchAllSemesters, fetchAllSemesterClasses } from '../lib/backend.js';
import { useState, useEffect } from "react";

export default function Home({ classes, semesters, all_semester_classes }) {
  
  const [semClasses, setSemClasses] = useState([]);
  

  useEffect(() => {
    let initialSemClasses = [];

    semesters.forEach((semester) => {
      const semesterId = semester.id;
      const semesterClasses = all_semester_classes[semesterId] || [];
      initialSemClasses.push(semesterClasses);
    });

    setSemClasses(initialSemClasses);
    
  }, [all_semester_classes, semesters]);

  // console.log("yes");
  // console.log(semClasses);
  // console.log(semClasses[0]);
  // console.log(all_semester_classes);
  
  return (
    <div className="main-content pt-4">
      <div className="flex w-full h-auto pt-0">
        <div className="flex flex-col items-center w-1/4 sm:w-full pt-0 sm:pt-4">
          <ClassTable classes={classes} />
        </div>
        <div className="flex flex-col items-center w-3/4 sm:w-full pt-0 sm:pt-4 overflow-x-auto">
          <FourYearPlan classes={classes} semesters={semesters} semClasses={semClasses} />
        </div>
      </div>
    </div>
  );
}




// cada element en semesters es un semester. Hay que tener un array holding all classes de ese sem. Cuando all_semester_classes llega, populate those arrays y render
  // un state pa el array que holds estos arrays
  // si el user cambia algo, lo que haces es que añades la clase a este array
    // clase puede ser id y lo fetch con funcion esa
  // despues si le da save, creamos en PUT y table entry mechanism pa que esos new array entries se loggeen en la tabla de all_sem_classes y si vuelves a fetch te salgan todas
  

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
