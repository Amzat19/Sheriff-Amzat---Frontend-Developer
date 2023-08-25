import { useEffect, useState } from 'react';

const DataGrid = () => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   Display the current items
  const currentItems = capsules.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate the total number of pages
  const totalPages = Math.ceil(capsules.length / itemsPerPage);

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchRocketsData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/capsules');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCapsules(data); // Update the state with the fetched data
        setLoading(false); // Set loading to false once data is loaded
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRocketsData(); // Call the function when the component mounts
  }, []);

  return (
    <section className='p-8'>
      <h2 className='py-8 font-bold text-2xl'>All Capsules</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
<ul className='flex flex-wrap justify-between gap-y-4'>
          {currentItems.map((capsule) => (
            <li key={capsule.capsule_serial} className='max-h-80 w-72 rounded-md shadow-md px-4 grid'>
              <h3 className='uppercase font-bold text-2xl text-center py-2'>{capsule.type}</h3>
              <span className='text-base font-medium py-2'>{capsule.capsule_serial}</span>
              <p className='text-base font-medium py-2'>{capsule.details || 'No details found'}</p>
              <div className='flex justify-between py-2'>
                <span>Status: {capsule.status}</span>
                <span>Landings: {capsule.landings}</span>
              </div>
            </li>
          ))}
        </ul>
         <div className='mt-4 flex items-center justify-between py-4'>
         {/* Pagination controls */}
         <button
           onClick={() => setCurrentPage(currentPage - 1)}
           disabled={currentPage === 1}
           className='mr-2 px-4 py-2 bg-blue-500 text-white rounded'
         >
           Previous
         </button>
         <p className='text-center'>
              Page {currentPage} of {totalPages}
            </p>
         <button
           onClick={() => setCurrentPage(currentPage + 1)}
           disabled={indexOfLastItem >= capsules.length}
           className='px-4 py-2 bg-blue-500 text-white rounded'
         >
           Next
         </button>
       </div>
        </div>
        
      )}
    </section>
  );
};

export default DataGrid;