import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCapsules, setCurrentPage } from '../store/slices/capsuleSlice';
import { setSelectedItem } from '../store/slices/selectedItemSlice';

const DataGrid = () => {
  const capsules = useSelector((state) => state.capsules.data);
  const loading = useSelector((state) => state.capsules.loading);
  const currentPage = useSelector((state) => state.capsules.currentPage);
  const itemsPerPage = useSelector((state) => state.capsules.itemsPerPage);

  const dispatch = useDispatch();

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //   Display the current items
  const currentItems = capsules.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages, if the capsules length is empty return 1
  const totalPages = capsules.length > 0 ? Math.ceil(capsules.length / itemsPerPage) : 1;

  const openCapsuleDetails = (item) => {
    dispatch(setSelectedItem(item));
  };

  const openCapsuleDetailsOnKeyDown = (event, item) => {
    if (event.key === 'Enter' || event.key === 'Space') {
      openCapsuleDetails(item);
    }
  };

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchRocketsData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/capsules');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(setCapsules(data)); // Dispatch the action to set capsules in Redux state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRocketsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <li
                role='menuitem'
                key={capsule.capsule_serial}
                className='max-h-80 w-72 rounded-md shadow-md px-4 grid cursor-pointer'
                onClick={() => openCapsuleDetails(capsule)}
                onKeyDown={(e) => openCapsuleDetailsOnKeyDown(e, capsule)}
              >
                <h3 className='uppercase font-bold text-2xl text-center py-2'>{capsule.type}</h3>
                <span className='text-base font-medium py-2'>{capsule.capsule_serial}</span>
                <p className='text-base font-medium py-2'>
                  {capsule.details || 'No details found'}
                </p>
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
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              disabled={currentPage === 1}
              className='mr-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-opacity-50'
              aria-label='Previous Page'
            >
              Previous
            </button>
            <p className='text-center'>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              disabled={indexOfLastItem >= capsules.length}
              className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-opacity-50'
              aria-label='Next Page'
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
