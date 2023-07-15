import ClassTable from "@/components/classTable/classTable";
import FourYearPlan from "@/components/fourYearPlan/fourYearPlan";
import ChatBox from "@/components/chatbox/ChatBox";
import { fetchAllFourYearPlans, fetchAllClasses, fetchAllSemesters, fetchAllSemesterClasses, updateFourYearPlanAdd, updateFourYearPlanRemove } from '../lib/backend.js';
import { useState, useEffect } from "react";

export default function Home({ startingPlan, fourYearPlans, classes, semesters, all_semester_classes }) {
  
  const [semClasses, setSemClasses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(startingPlan);
  
  //Test: make this work
  console.log(fourYearPlans);

  const updateSemestersAndClasses = (semesterList, allSemClasses) => {
    let currentSemClasses = [];

    semesterList.forEach((semester) => {
      const semesterId = semester.id;
      const semesterClasses = allSemClasses[semesterId] || [];
      currentSemClasses.push([semesterId, semesterClasses]);
    });

    setSemClasses(currentSemClasses);
  };

  useEffect(() => {
    updateSemestersAndClasses(semesters, all_semester_classes);
  }, [all_semester_classes, semesters]);

  const handleSemesterSelection = (semesterId) => {
    setSelectedSemester(semesterId);
  };

  const handleFourYearPlanSelection = (fourYearPlanId) => {
    setCurrentPlan(fourYearPlanId);
    handleChangeFourYearPlan(fourYearPlanId);
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

  const handleChangeFourYearPlan = async (newPlanId) => {
    // Fetch semesters for the new plan
    const newSemesters = await fetchAllSemesters({ fourYearPlan: newPlanId });

    // Fetch classes for each semester of the new plan
    const all_semester_classes = {};
    for (let i = 0; i < semesters.length; i++) {
      try {
        all_semester_classes[semesters[i].id] = await fetchAllSemesterClasses(semesters[i].id);
      } catch (error) {
        console.error('Error fetching semester classes:', error);
      }
    }
  
    // Update semClasses with the new semesters
    updateSemestersAndClasses(newSemesters, all_semester_classes);
    
  }
  

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
    // SECTION 1: FETCHING DATA
    // Fetch four-year plans and classes data concurrently using Promise.all for better performance.
    const [fourYearPlans, classes] = await Promise.all([
      fetchAllFourYearPlans(1),
      fetchAllClasses(),
    ]);

    // SECTION 2: DETERMINING THE OFFICIAL PLAN
    // Start with the assumption that the first plan in the array is the official plan.
    let officialPlanId = fourYearPlans[0]['id']; 

    // Iterate over the four-year plans to find if there is a plan marked as 'official'.
    for (let i = 0; i < fourYearPlans.length; i++) {
      if (fourYearPlans[i]['official'] === true) {
        // If an 'official' plan is found, update officialPlanId and break out of the loop.
        officialPlanId = fourYearPlans[i]['id']; 
        break; 
      }
    }

    // SECTION 3: FETCHING SEMESTERS
    // Fetch semesters associated with the determined official plan.
    const semesters = await fetchAllSemesters({ fourYearPlan: officialPlanId }); 

    // SECTION 4: FETCHING SEMESTER CLASSES
    // Prepare a container to hold the fetched semester classes.
    const all_semester_classes = {};

    // Iterate over the fetched semesters to fetch classes for each semester.
    for (let i = 0; i < semesters.length; i++) {
      try {
        all_semester_classes[semesters[i].id] = await fetchAllSemesterClasses(semesters[i].id);
      } catch (error) {
        console.error('Error fetching semester classes:', error);
      }
    }

    // SECTION 5: RETURNING PROPS
    // Return all fetched data as props for the component.
    return {
      props: {
        startingPlan: officialPlanId, 
        fourYearPlans: fourYearPlans || [], 
        classes: classes || [],
        semesters: semesters || [],
        all_semester_classes: all_semester_classes,
      },
    };
  } catch (error) {
    // In case of any error during the fetching process, log the error and re-throw to handle it upstream.
    console.error('Error fetching classes and semesters:', error);
    throw error;
  }
}

