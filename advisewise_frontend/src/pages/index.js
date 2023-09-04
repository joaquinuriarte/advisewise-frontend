import HeaderExpanded from '@/components/HeaderExpanded';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Main from '@/components/Main';
import { fetchAllFourYearPlans, fetchAllClasses, fetchAllSemesters, fetchAllSemesterClasses } from '../lib/backend.js';
import { useState, useEffect } from "react";

export default function Home({ startingPlan, fourYearPlans, classes, semesters, all_semester_classes }) {
  
  const [currentFourYearPlanId, setCurrentFourYearPlanId] = useState(startingPlan);
  const [semClasses, setSemClasses] = useState([]);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [planSemesters, setPlanSemesters] = useState(semesters);

  const handleHeaderExpandClick = () => {
    setIsHeaderExpanded(!isHeaderExpanded);
  }; 

  const handleSemesterClasses = (newSemClasses) => {
    setSemClasses(newSemClasses);
  }

  const updateSemestersAndClasses = (semesterList, allSemClasses) => {
    let currentSemClasses = [];

    semesterList.forEach((semester) => {
      const semesterId = semester.id;
      const semesterClasses = allSemClasses[semesterId] || [];
      currentSemClasses.push([semesterId, semesterClasses]);
    });

    setPlanSemesters(semesterList);
    setSemClasses(currentSemClasses);
  };

  useEffect(() => {
    updateSemestersAndClasses(semesters, all_semester_classes);
  }, [all_semester_classes, semesters]);

  const handleFourYearPlanSelection = (fourYearPlanId) => {
    setCurrentFourYearPlanId(fourYearPlanId);
    handleChangeFourYearPlan(fourYearPlanId);
  };

  const handleChangeFourYearPlan = async (newPlanId) => {
    // Fetch semesters for the new plan
    const newSemesters = await fetchAllSemesters({ fourYearPlan: newPlanId });

    // Fetch classes for each semester of the new plan
    const all_semester_classes = {};
    for (let i = 0; i < newSemesters.length; i++) {
      try {
        all_semester_classes[newSemesters[i].id] = await fetchAllSemesterClasses(newSemesters[i].id);
      } catch (error) {
        console.error('Error fetching semester classes:', error);
      }
    }
  
    // Update semClasses with the new semesters
    updateSemestersAndClasses(newSemesters, all_semester_classes);
    
  }
  

  //TODO: Header is always rendering so that <main /> doesn't shift up when user changes to expanded header. Not sure if this is the best solution.  
  //TODO: Cuando cambias a header expanded hay un color inconsistency arriba en el header area
  //TODO: el V no se cambia a azul cuando clicks


  // Header expanded no esta blurring y esta fucked up
  return ( 
    <div className='app-background'>
      <div className="flex flex-col min-h-screen relative">
        <div className=" flex items-center justify-center">
          <Header onHeaderExpandClick={handleHeaderExpandClick}/> 
        </div> 
        {isHeaderExpanded && (
          <div className="header-expanded-overlay">
          <HeaderExpanded onHeaderExpandClick={handleHeaderExpandClick} onFourYearPlanSelection={handleFourYearPlanSelection} fourYearPlans={fourYearPlans} currentPlan={currentFourYearPlanId}/>
          </div>
        )}
        <Main className={`flex-grow app-background ${isHeaderExpanded ? 'blur' : ''}`}  style={{overflow: 'auto'}}
          classes={classes} semesters={planSemesters} semClasses={semClasses} onSemesterClasses={handleSemesterClasses}/>
        <Footer />
      </div>
    </div>
  );
  

}

export async function getStaticProps() {
  try {
    // SECTION 1: FETCHING DATA
    // Fetch four-year plans and classes data concurrently using Promise.all for better performance.
    const [fourYearPlans, classes] = await Promise.all([
      fetchAllFourYearPlans(1), //TODO: The parameter should be the student_id granted after authentication
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

