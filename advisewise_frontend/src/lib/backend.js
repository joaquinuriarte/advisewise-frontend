export async function fetchAllClasses() {
    try {
        const response = await fetch('http://localhost:4000/schedule/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data from the backend');
        }
        const classes = await response.json();
        return classes || []; // Ensure classes is an array even if it's undefined
      } catch (error) {
        console.error(error);
        throw error;
    }
}