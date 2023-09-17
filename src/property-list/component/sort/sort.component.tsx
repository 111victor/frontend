import { sortTypes } from "../../property- configs/property-configs";

const Sort = ({ sortType, setSortType }) => {
  const sortTypeValues = Object.values(sortTypes);
  return (
    <div className="align-items-center">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort: {sortType}
          </a>
          <div className="dropdown-menu">
            {sortTypeValues.map((value, index) => (
              <a
                key={index}
                className="dropdown-item"
                onClick={() => setSortType(value)}
              >
                {value}
              </a>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sort;
