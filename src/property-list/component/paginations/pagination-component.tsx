import { cachePropertyListsLength } from "../../services/property.service";

const PaginationComponent = ({
  nextPageNumber,
  startPage,
  fetchNewProperties,
  searchTerm,
}) => {
  // Calculate for how many pages we need from our cached propertylist.
  const pageNumber = Math.min(
    Math.ceil(cachePropertyListsLength(nextPageNumber, 10, searchTerm) / 10),
    10,
  );
  return (
    <>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li
            onClick={() =>
              nextPageNumber === 1
                ? null
                : fetchNewProperties(
                    nextPageNumber - 1,
                    searchTerm ? searchTerm : null,
                  )
            }
            className={`page-item ${nextPageNumber === 1 ? "disabled" : ""}`}
          >
            <a className="page-link" type="button">
              Previous
            </a>
          </li>
          {[...Array(pageNumber)].map((item, index) => {
            const value = startPage * 10 + index + 1;
            return (
              <li
                key={value}
                className={`page-item ${
                  value === nextPageNumber ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  type="button"
                  onClick={() =>
                    fetchNewProperties(value, searchTerm ? searchTerm : null)
                  }
                >
                  {value}
                </a>
              </li>
            );
          })}
          <li
            onClick={() =>
              nextPageNumber % 10 === pageNumber || pageNumber === 0
                ? null
                : fetchNewProperties(
                    nextPageNumber + 1,
                    searchTerm ? searchTerm : null,
                  )
            }
            className={`page-item ${
              nextPageNumber % 10 === pageNumber || pageNumber === 0
                ? "disabled"
                : ""
            }`}
          >
            <a className="page-link" type="button">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PaginationComponent;
