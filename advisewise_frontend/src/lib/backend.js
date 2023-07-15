export async function fetchAllClasses() {
  try {
    const response = await fetch('http://localhost:4000/schedule/all');
    if (!response.ok) {
      console.error('Failed to fetch data from the backend');
      return []; // Return an empty array if the response is not ok
    }
    const classes = await response.json();
    return classes || []; // Ensure classes is an array even if it's undefined
  } catch (error) {
    console.error('An error occurred while fetching the data:', error);
    return []; // Return an empty array in case of an error
  }
}


export async function fetchAllSemesters({ fourYearPlan }) {
  try {
    const url = `http://localhost:4000/schedule/${fourYearPlan}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        console.error('fetchAllSemesters: Failed to fetch data from the backend');
        return [];
    }

    const classes = await response.json();
    return classes || [];
  } catch (error) {
      console.error('An error occurred while fetching the data:', error);
      return [];
  }
}

export async function fetchAllSemesterClasses(semester) {
  try {
    const url = `http://localhost:4000/schedule/semester/${semester}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        console.error('fetchAllSemesterClasses: Failed to fetch data from the backend');
        return [];
    }

    const classes = await response.json();
    return classes || [];
    } catch (error) {
        console.error('An error occurred while fetching the data:', error);
        return [];
    }
}

export async function updateFourYearPlan( newFourYearPlan ) {
  try {
    const response = await fetch('http://localhost:4000/schedule/updateEntirePlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFourYearPlan),
    });
    if (!response.ok) {
      console.error('Failed to send data to the backend');
      return false; // Return false if the response is not ok
    }
    return true; // Return true if the data was successfully sent
  } catch (error) {
    console.error('An error occurred while sending the data:', error);
    return false; // Return false in case of an error
  }
}
