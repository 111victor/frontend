import { useRef } from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <form className="d-flex">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
