import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const propertyTypesArray = ['Land', 'Townhouse', 'Multi Family', 'Single Family', 'Condo'];

const FilterComponent = ({setFilters}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [propertyType, setPropertyType] = useState([]);

    const handleFilterApply = (action: string) => {
      if(action === 'Apply') {
        setFilters({propertyType})
      } else {
        setFilters({propertyType: []});
        setPropertyType([]);
      }
    };
    
    const handlePropertyTypeChange = (value) => {
      if (propertyType.includes(value)) {
        setPropertyType(propertyType.filter((type) => type !== value));
      } else {
        setPropertyType([...propertyType, value]);
      }
    };
  
    return (
      <div>
        <h2>Filter Properties</h2>
        <form>
          <div>
          <label>Property Type:</label>
          {
            propertyTypesArray.map((type, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={type}
                    checked={propertyType.includes(type)}
                    onChange={() => handlePropertyTypeChange(type)}
                  />
                  {type}
                </label>
              </div>
            ))
          }
          </div>
          <div>
            <button type="button" onClick={() => handleFilterApply('Apply')}>
              Apply Filters
            </button>
            <button type="button" onClick={() => handleFilterApply('Clear')}>
              Clear Filters
            </button>
          </div>
        </form>
      </div>
    );
}

export default FilterComponent;