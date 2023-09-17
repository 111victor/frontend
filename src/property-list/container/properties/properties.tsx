import { useState, useEffect } from "react";
import { PropertyDescription } from "../../interfaces/property-description.interface";
import PropertyDescriptionComponent from "../../component/property-description/property-description.component";
import { fetchPropertyLists } from "../../services/property.service";
import { Link, useSearchParams } from "react-router-dom";
import TopNav from "../top-nav/top-nav";
import { sortTypes } from "../../property- configs/property-configs";

const deepSearch = (obj, searchTerm) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "object") {
        if (deepSearch(value, searchTerm)) {
          return true;
        }
      } else if (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
  }
  return false;
};

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page")) || 1;
  const [propertyDescriptions, setPropertyDescriptions] = useState([]);
  const [nextPageNumber, setNextPageNumber] = useState(pageNumber);
  const [sortType, setSortType] = useState("Recommended");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    propertyType: [],
    bedrooms: "",
    bathrooms: "",
  });

  const filteredProperties = propertyDescriptions.filter(
    (property: PropertyDescription) => {
      return (
        (!filters.propertyType.length ||
          filters.propertyType.includes(property.property_type)) &&
        (!filters.bedrooms || property.beds >= parseInt(filters.bedrooms)) &&
        (!filters.bathrooms || property.baths >= parseInt(filters.bathrooms)) &&
        deepSearch(property, searchTerm)
      );
    },
  );

  if (sortType === sortTypes.PriceHighToLow) {
    filteredProperties.sort((a, b) => b.price - a.price);
  } else if (sortType === sortTypes.PriceLowToHigh) {
    filteredProperties.sort((a, b) => a.price - b.price);
  } else if (sortType === sortTypes.SquareFeet) {
    filteredProperties.sort((a, b) => a.square_feet - b.square_feet);
  } else if (sortType === sortTypes.Recommended) {
    filteredProperties.sort((a, b) => b.upvote - a.upvote);
  } else if (sortType === sortTypes.NotRecommended) {
    filteredProperties.sort((a, b) => b.downvote - a.downvote);
  }

  const fetchNewProperties = (nextPageNumber) => {
    fetchPropertyLists(nextPageNumber, 10).then((propertyDescriptions) => {
      const newUserInfos = [...propertyDescriptions];
      setPropertyDescriptions(newUserInfos);
      setNextPageNumber(nextPageNumber);
      setSearchParams({ page: nextPageNumber });
    });
  };

  useEffect(() => {
    fetchNewProperties(pageNumber);
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <TopNav
            setFilters={setFilters}
            sortType={sortType}
            setSortType={setSortType}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className="row">
          {filteredProperties.map(
            (propertyDescription: PropertyDescription) => (
              <PropertyDescriptionComponent
                key={propertyDescription.id}
                propertyDescription={propertyDescription}
                searchParams={searchParams}
              />
            ),
          )}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              onClick={() =>
                fetchNewProperties(
                  nextPageNumber === 1 ? 1 : nextPageNumber - 1,
                )
              }
              className={`page-item ${nextPageNumber === 1 ? "disabled" : ""}`}
            >
              <a className="page-link">Previous</a>
            </li>
            <li
              onClick={() => fetchNewProperties(nextPageNumber + 1)}
              className="page-item"
            >
              <a className="page-link">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Properties;
