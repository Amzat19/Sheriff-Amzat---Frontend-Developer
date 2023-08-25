import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearFilters, filterCapsules } from "../store/slices/capsuleSlice";

const SearchForm = () => {
    const dispatch = useDispatch();
    const [filterValues, setFilterValues] = useState({
      status: '',
      original_launch: '',
      type: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFilterValues({ ...filterValues, [name]: value });
    };
  
    const handleSearch = () => {
      // Dispatch the filterCapsules action with filter values
      dispatch(filterCapsules(filterValues));
    };

    const clearFilterValues = () => {
        setFilterValues(
            {
                status: '',
                original_launch: '',
                type: '',
              }
        )
        dispatch(clearFilters());
    }
    console.log(new Date('2010-12-08T15:43:00.000Z'))
    console.log(new Date('2010-12-08'))

    return (
        <section className="p-8">
            <h2 className="mb-4 font-semibold text-lg">Search for Capsules</h2>
            <div className="flex flex-wrap gap-4 items-center">
           <label className="grid">
            Filter By Status
                <input 
                name="status"
                 type="text" 
                 className="border border-black h-12 w-60 rounded-md p-2"
                 value={filterValues.status}
                 onChange={handleInputChange}
                 />
            </label>
            <label className="grid">
                Filter by Original Launch Date
                <input 
                name="original_launch" 
                type="date" 
                className="border border-black h-12 w-60 rounded-md p-2"
                value={filterValues.original_launch}
                onChange={handleInputChange}
                />
            </label>
            <label className="grid">
                Filter by Type
                <input 
                name="type" 
                type='text' 
                className="border border-black h-12 w-60 rounded-md p-2"
                value={filterValues.type}
                onChange={handleInputChange}
                />
            </label>
            </div>
            <div className="grid gap-4 mt-4 md:flex items-center">
                     <button className="h-12 text-white text-lg font-semibold bg-slate-600 w-48 rounded-md" onClick={() => handleSearch()}>Search</button>
            <button className="h-12 text-white text-lg font-semibold bg-slate-600 w-48 rounded-md" onClick={() => clearFilterValues()}>Clear Filters</button>
            </div>     
  
        </section>
    )
}

export default SearchForm;