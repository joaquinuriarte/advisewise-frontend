import ClassTable from "@/components/classTable/classTable";
import FourYearPlan from "@/components/fourYearPlan/fourYearPlan";
import ChatBox from "@/components/chatbox/ChatBox";
import { fetchAllClasses, fetchAllSemesters, fetchAllSemesterClasses, updateFourYearPlanAdd, updateFourYearPlanRemove } from '../lib/backend.js';
import { useState, useEffect } from "react";

export default function Home({ classes, semesters, all_semester_classes }) {
  
  const [semClasses, setSemClasses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);


  useEffect(() => {
    let initialSemClasses = [];

    semesters.forEach((semester) => {
      const semesterId = semester.id;
      const semesterClasses = all_semester_classes[semesterId] || [];
      initialSemClasses.push([semesterId, semesterClasses]);
    });

    setSemClasses(initialSemClasses);
    
  }, [all_semester_classes, semesters]);

  const handleSemesterSelection = (semesterId) => {
    setSelectedSemester(semesterId);
  };

  const eliminateClassFromSemester = async (selectedClass) => {
    if (selectedSemester === null) {
      // No semester selected
      return;
    }

    // Capture newSemClasses value immediately after state update
    let newSemClasses = semClasses.map((semClassTuple) => {
      const [semesterId, semClass] = semClassTuple;
  
      if (semesterId === selectedSemester) {
        // This is the selected semester - remove the selected class
        return [
          semesterId,
          semClass.filter((classItem) => classItem.course_id !== selectedClass.id),
        ];
      }
      // Not the selected semester - return it as is
      return semClassTuple;
    });
  
    // Update the state
    setSemClasses(newSemClasses);
  
    // Send a request to the backend to update the four year plan
    const removedClass = { course_id: selectedClass.id, difficulty: 'Medium', semester_id: selectedSemester};
    let update = await updateFourYearPlanRemove(removedClass);
  
    if (!update) {
      // TODO: Warning message
      console.log("Failed to remove class");
    }
  };
  

  const addClassToSemester = async (selectedClass) => {
    if (selectedSemester === null) {
      // No semester selected
      return;
    }
    
    const newClass = {course_id: selectedClass.id, difficulty: 'Medium'}; //TODO: Here you would ideally have selectedClass.difficulty
  
    // Capture newSemClasses value immediately after state update
    let newSemClasses = semClasses.map((semClassTuple) => {
      const [semesterId, semClass] = semClassTuple;
  
      if (semesterId === selectedSemester) {
        // This is the selected semester - append the new class
        return [semesterId, [...semClass, newClass]];
      }
      // Not the selected semester - return it as is
      return semClassTuple;
    });
  
    // Update the state
    setSemClasses(newSemClasses);

    newClass['semester_id'] = selectedSemester;
    let update = await updateFourYearPlanAdd(newClass);
  
    if (!update) {
      //TODO: Warning message
      console.log("Failed to add class");
    }
  };
  

  return (
    <div className="flex flex-col" style={{height: '100vh'}}>
        <div className="flex flex-grow pt-6" style={{height: '80%', width: '100%'}}>
          <div className="pl-2 pr-1" style={{width: '25%'}}>
              <ClassTable classes={classes} onClassSelection={addClassToSemester}/>
          </div>
    
          <div className="overflow-x-auto pl-1 pr-2" style={{width: '75%'}}>
              <FourYearPlan classes={classes} semesters={semesters} semClasses={semClasses} onSemesterSelection={handleSemesterSelection} selectedSemester={selectedSemester} onClassSelection={eliminateClassFromSemester}/>
          </div>
        </div>
  
        <div className="flex pt-10 pl-64" style={{height: '80%'}}>
          <ChatBox />
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
