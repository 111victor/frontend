import { useState, useEffect } from "react";
import { PropertyDescription } from "../../interfaces/property-description.interface";
import PropertyDescriptionComponent from "../../component/property-description/property-description.component";
import { fetchPropertyLists } from "../../services/property.service";
import { useSearchParams } from "react-router-dom";
import TopNav from "../top-nav/top-nav";
import { sortTypes } from "../../property- configs/property-configs";
import LoadingSpinner from "../../component/spinner/loading-spinner.component";
import PaginationComponent from "../../component/paginations/pagination-component";

//It is useful for searching proper within the current page. Leave it for future.

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
  const [startPage, setStartPage] = useState(0);
  const [sortType, setSortType] = useState("Recommended");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    propertyType: [],
    bedrooms: "",
    bathrooms: "",
  });

  const fetchNewProperties = (nextPageNumber, search?) => {
    setLoading(true);
    const nextStartPage = Math.floor(nextPageNumber / 10);
    if (startPage !== nextStartPage) {
      if (
        (nextStartPage - 1 === startPage && nextPageNumber % 10 !== 0) ||
        nextStartPage < startPage ||
        nextStartPage - 1 > startPage
      ) {
        setStartPage(
          nextPageNumber % 10 === 0 ? nextStartPage - 1 : nextStartPage,
        );
      }
    } else if (nextStartPage === startPage && nextPageNumber % 10 === 0) {
      setStartPage(nextStartPage - 1);
    }
    fetchPropertyLists(nextPageNumber, 10, search)
      .then((propertyDescriptions) => {
        const newPropertyDescriptions = [...propertyDescriptions];
        setPropertyDescriptions(newPropertyDescriptions);
        setNextPageNumber(nextPageNumber);
        setSearchParams((searchParams) => {
          searchParams.set("page", nextPageNumber);
          return searchParams;
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const filteredProperties = propertyDescriptions.filter(
    (property: PropertyDescription) => {
      return (
        (!filters.propertyType.length ||
          filters.propertyType.includes(property.property_type)) &&
        (!filters.bedrooms || property.beds >= parseInt(filters.bedrooms)) &&
        (!filters.bathrooms || property.baths >= parseInt(filters.bathrooms))
        //  && deepSearch(property, searchTerm)
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

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    setSearchTerm(searchQuery || "");
    fetchNewProperties(pageNumber, searchQuery);
  }, [searchTerm]);

  return (
    <div>
      <TopNav
        setFilters={setFilters}
        sortType={sortType}
        setSortType={setSortType}
        setSearchTerm={setSearchTerm}
        setSearchParams={setSearchParams}
      />
      {!loading ? (
        <div className="container">
          <div className="row">
            {filteredProperties.length ? (
              filteredProperties.map(
                (propertyDescription: PropertyDescription) => (
                  <PropertyDescriptionComponent
                    key={propertyDescription.id}
                    propertyDescription={propertyDescription}
                    searchParams={searchParams}
                  />
                ),
              )
            ) : (
              <div>No results found</div>
            )}
          </div>
          <PaginationComponent
            nextPageNumber={nextPageNumber}
            startPage={startPage}
            fetchNewProperties={fetchNewProperties}
            searchTerm={searchTerm}
          />
        </div>
      ) : (
        <div className="loading-overlay">
          <h2>Loading...</h2>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Properties;
