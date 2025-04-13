const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="Search" />
                <input type="text" placeholder="Search favourite movie" value={searchTerm} onChange={(event) => {setSearchTerm(event.target.value)}} />
            </div>
        </div>
    );
};


export default Search;