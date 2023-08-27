import Banner from './components/Banner';
import DataGrid from './components/DataGrid';
import PopupModal from './components/PopupModal';
import SearchForm from './components/SearchForm';

const App = () => {
  return (
    <main className='relative'>
      <Banner />
      <SearchForm />
      <DataGrid />
      <PopupModal />
    </main>
  );
};

export default App;
