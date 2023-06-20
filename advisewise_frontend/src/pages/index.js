import ClassTable from "@/components/classTable/classTable";
import FourYearPlan from "@/components/fourYearPlan/fourYearPlan";
import { fetchAllClasses, fetchAllSemesters, fetchAllSemesterClasses } from '../lib/backend.js';

export default function Home({ classes, semesters, all_semester_classes }) {
  return (
    <div className="main-content pt-4">
      <div className="flex w-full h-auto pt-0">
        <div className="flex flex-col items-center w-1/4 sm:w-full pt-0 sm:pt-4">
          <ClassTable classes={classes} />
        </div>
        <div className="flex flex-col items-center w-3/4 sm:w-full pt-0 sm:pt-4 overflow-x-auto">
          <FourYearPlan classes={classes} semesters={semesters} all_semester_classes={all_semester_classes} />
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
