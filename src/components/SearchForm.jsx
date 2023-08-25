const SearchForm = () => {
    
    return (
        <section className="p-8">
            <h2 className="mb-4 font-semibold text-lg">Search for Rockets</h2>
            <div className="flex flex-wrap gap-4">
           <label className="grid">
            Filter By Status
                <input type="text" className="border border-black h-12 w-60 rounded-md"/>
            </label>
            <label className="grid">
                Filter by Original Launch
                <input type="text" className="border border-black h-12 w-60 rounded-md"/>
            </label>
            <label className="grid">
                Filter by Type
                <input type='text' className="border border-black h-12 w-60 rounded-md"/>
            </label>
            <button className="h-12 text-white text-lg font-semibold bg-slate-600 w-48 rounded-md">Search</button>
            </div>
        </section>
    )
}

export default SearchForm;