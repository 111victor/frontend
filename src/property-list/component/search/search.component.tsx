import { useRef } from "react";

const Search = ({ setSearchTerm, setSearchParams }) => {
  let searchRef = useRef(null);
  const submitSearch = (e) => {
    e.preventDefault();
    const newSearchTerm = searchRef.current.value;
    setSearchTerm(newSearchTerm);
    // Save the searchTerm in the url
    setSearchParams((searchParams) => {
      searchParams.set("search", newSearchTerm);
      searchParams.set("page", 1);
      return searchParams;
    });
  };
  return (
    <form className="d-flex" onSubmit={submitSearch}>
      <input
        ref={searchRef}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
