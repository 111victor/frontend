import FilterComponent from "../../component/filters/filers.component";
import Search from "../../component/search/search.component";
import Sort from "../../component/sort/sort.component";

const TopNav = ({
  setFilters,
  sortType,
  setSortType,
  setSearchTerm,
  setSearchParams,
}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Red(it)fin</a>
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
        <div
          className="collapse navbar-collapse justify-content-evenly"
          id="navbarSupportedContent"
        >
          <FilterComponent setFilters={setFilters} />
          <Sort sortType={sortType} setSortType={setSortType} />
          <Search
            setSearchTerm={setSearchTerm}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
