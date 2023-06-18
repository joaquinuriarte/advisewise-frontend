import ClassTable from "@/components/classTable/ClassTable";
import {fetchAllClasses} from '../lib/backend.js';

export default function Home({ classes }) {
  return (
      <div className="flex w-full min-h-screen">
        <div className="column flex flex-col items-center w-1/3">
            <ClassTable classes={classes} />
        </div>
        <div className="column flex flex-col items-center w-2/3"> {/*TODO: w-2/3 no funciona*/}
          <h1 className="column elegant-heading-large">Four-Year Plan</h1>
          {/* Other content goes here */}
          {/* Add your other elements */}
        </div>
      </div>
  );
}


export async function getStaticProps() {
  try {
    const classes = await fetchAllClasses();
    return {
      props: {
        classes: classes || [],
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}