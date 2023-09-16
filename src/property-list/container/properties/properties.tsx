import { useState, useEffect } from "react";
import { PropertyDescription } from "../../interfaces/propertyDescription";
import PropertyDescriptionComponent from "../../component/property-description/property-description.component";
import { fetchPropertyLists } from "../../services/property.service";
import { useSearchParams } from "react-router-dom";
import TopNav from "../top-nav/top-nav";

const Properties = () => {
    const [propertyDescriptions, setPropertyDescriptions] = useState([]);
    const [nextPageNumber, setNextPageNumber] = useState(1);
    const [filters, setFilters] = useState({
        propertyType: [],
        bedrooms: '',
        bathrooms: '',
      });
    const filteredProperties = propertyDescriptions.filter((property) => {
        return !filters.propertyType.length || filters.propertyType.includes(property.property_type);
      });

    const fetchNewProperties = (nextPageNumber) => {
        fetchPropertyLists(nextPageNumber, 10).then(
            (propertyDescriptions) => {
                const newUserInfos = [
                    ...propertyDescriptions
                ]
                setPropertyDescriptions(newUserInfos);
                setNextPageNumber(nextPageNumber);
            }
        );
    }

    useEffect(() => {  
        fetchNewProperties(1);
    }, []);

    return (
        <> 
            <div className="container">
                <div>
                    <TopNav
                        setFilters={setFilters}
                    />
                </div>
                <div className="row">
                    {
                        filteredProperties.map((propertyDescription: PropertyDescription) => (
                            <PropertyDescriptionComponent 
                                key={propertyDescription.id}
                                propertyDescription={propertyDescription} 
                            />
                        ))
                    }
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li onClick = {() => fetchNewProperties(nextPageNumber === 1 ? 1 : nextPageNumber - 1 )} className={`page-item ${nextPageNumber === 1 ? 'disabled' : ''}` }><a className="page-link" href="#">Previous</a></li>
                        <li onClick = {() => fetchNewProperties(nextPageNumber + 1)} className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Properties;