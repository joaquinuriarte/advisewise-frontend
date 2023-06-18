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