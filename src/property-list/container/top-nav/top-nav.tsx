import FilterComponent from "../../component/filters/filers.component";
import Search from "../../component/search/search.component";
import Sort from "../../component/sort/sort.component";

const TopNav = ({
  setFilters,
  sortType,
  setSortType,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <FilterComponent setFilters={setFilters} />
          <Sort sortType={sortType} setSortType={setSortType} />
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
