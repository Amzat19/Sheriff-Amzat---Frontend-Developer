import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedItem } from '../store/slices/selectedItemSlice';

const PopupModal = () => {
  const selectedItem = useSelector((state) => state.selectedItem.item);
  const isOpen = useSelector((state) => state.selectedItem.isOpen);
  const dispatch = useDispatch();

  // Format the original launch date if available
  const formattedOriginalLaunch = selectedItem?.original_launch
    ? new Date(selectedItem.original_launch).toDateString()
    : 'Not available';

  const closeModal = () => {
    dispatch(clearSelectedItem());
  };

  if (!isOpen) {
    return null; // Don't render the modal if it's not open
  }
  return (
    <dialog open={isOpen} className='fixed top-0 w-screen min-h-screen bg-slate-600 bg-opacity-50'>
      <article className='bg-white rounded w-72 max-w-xs h-max mx-auto mt-10 p-4 grid'>
        <h2 className='text-center text-lg font-semibold mb-4'>Capsule Details</h2>
        <span className='text-sm pb-2'>Capsule Serial: {selectedItem.capsule_serial}</span>
        <span className='text-sm pb-2'>Capsule Id: {selectedItem.capsule_id}</span>
        <span className='text-sm pb-2'>Capsule Status: {selectedItem.status}</span>
        <span>Capsule Original Launch Date: {formattedOriginalLaunch}</span>
        {selectedItem.missions.length > 0 ? (
          <div>
            <h2 className='text-center text-lg font-medium'>Missions</h2>
            {selectedItem.missions.map((mission, index) => (
              <div key={index} className='grid pb-2'>
                <p className='text-base font-medium'>Mission {index + 1}</p>
                <span className='text-sm pl-4'>Mission name: {mission.name}</span>
                <span className='text-sm pl-4'>Mission Flight: {mission.flight}</span>
              </div>
            ))}
          </div>
        ) : (
          <span>No Missions</span>
        )}
        <span className='text-sm pb-2'>Capsule Landings: {selectedItem.landings}</span>
        <span className='text-sm pb-2'>Capsule Type: {selectedItem.type}</span>
        <span className='text-sm pb-2'>
          Capsule details: {selectedItem.details || 'No details'}
        </span>
        <span className='text-sm pb-2'>Capsule Reuse Count: {selectedItem.reuse_count}</span>
        <button
          className='px-4 py-2 w-24 mt-4 h-10 bg-blue-500 text-white rounded'
          onClick={() => closeModal()}
          name='Close Button'
          aria-label='Close Button'
        >
          Close
        </button>
      </article>
    </dialog>
  );
};

export default PopupModal;
