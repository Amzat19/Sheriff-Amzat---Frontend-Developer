import {ReactComponent as SpaceX} from '../assets/spacex.svg';
import {ReactComponent as Menu} from '../assets/menu.svg';

const Banner = () => {
    return (
        <div className='bg-banner bg-cover bg-center h-96 p-4 grid'>
            <header className='flex justify-between items-center h-8'>
                <SpaceX width={200} height={100}/>
                <Menu />
            </header>
            <div className='pl-8'>
                <h1 className='text-2xl text-white font-bold'>CAPSULES</h1>
                <p className='text-white '>View capsules data</p>
            </div>
        </div>
    )
}

export default Banner;