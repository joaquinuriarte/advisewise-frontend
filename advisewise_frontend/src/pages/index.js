import ClassTable from "@/components/ClassTable";

const numbersArray = Array.from({ length: 35 }, (_, index) => index + 1);


export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="container flex">
        <div className="column column flex flex-col items-center w-1/2">
          <h1 className="elegant-heading-large">Classes Available</h1>
          <div className="flex justify-center w-full">
            <ClassTable>
              <tbody>
                  {numbersArray.map((x) => <tr key={x}><td>{x}</td></tr>)}
              </tbody>
            </ClassTable>
          </div>
        </div>
        <div className="column flex flex-col items-center w-1/2">
          <h1 className="elegant-heading-large">Four-Year Plan</h1>
          {/* Other content goes here */}
          {/* Add your other elements */}
        </div>
      </div>
    </main>
  );
}