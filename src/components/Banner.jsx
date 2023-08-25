import { ReactComponent as SpaceXIcon } from '../assets/spacex.svg';
import { ReactComponent as MenuIcon } from '../assets/menu.svg';

const Banner = () => {
  return (
    <header className='bg-banner bg-cover bg-center h-96 p-4 grid grid-cols-2 gap-8 items-start'>
      <SpaceXIcon className='col-span-1' width={200} height={40} />
      <MenuIcon className='col-span-1 justify-self-end mt-2' />
      <div className='col-span-2 mt-4'>
        <h1 className='text-2xl text-white font-bold'>CAPSULES</h1>
        <p className='text-white '>View capsules data</p>
      </div>
    </header>
  );
};
export default Banner;
