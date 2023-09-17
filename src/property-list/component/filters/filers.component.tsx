import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./filters.component.css"
import { propertyTypes } from "../../property- configs/property-configs";

const FilterComponent = ({setFilters}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [propertyType, setPropertyType] = useState([]);
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const propertyTypesValues = Object.values(propertyTypes);
    const handleFilterApply = (action: string) => {
      if(action === 'Apply') {
        setFilters({
          propertyType,
          bedrooms,
          bathrooms,
        })
      } else {
        setFilters({
          propertyType: [],
          bedrooms: '',
          bathrooms: '',
        });
        setPropertyType([]);
        setBedrooms('');
        setBathrooms('');
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
        <form className="row gy-2 gx-3 align-items-center">
          <div className="col-auto">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Property Type
                    </a>
                    <div className="dropdown-menu checkbox-menu">
                    {
                      propertyTypesValues.map((type, index) => (
                        <a key={index}>
                           <label onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              id={`propertyTypeCheckbox${index}`}
                              value={type}  
                              checked={propertyType.includes(type)}
                              onChange={(e) => handlePropertyTypeChange(e.target.value)}/>
                              {type}
                          </label>
                        </a>
                      ))
                    }
                    </div>
                </li>
            </ul>
          </div>
          <div className="col-auto">
            <label>Bedrooms:</label>
            <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div className="col-auto">
            <label>Bathrooms:</label>
              <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>          
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