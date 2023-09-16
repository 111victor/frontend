import { useState, useEffect } from "react";
import { PropertyDescription } from "../../interfaces/propertyDescription";
import PropertyDescriptionComponent from "../../component/property-description/property-description.component";
import { fetchPropertyLists } from "../../services/property.service";

const Properties = () => {
    const [propertyDescriptions, setPropertyDescriptions] = useState([]);
    const [nextPageNumber, setNextPageNumber] = useState(1);
    const fetchNewProperties = () => {
        fetchPropertyLists(nextPageNumber, 10).then(
            (propertyDescriptions) => {
                const newUserInfos = [
                    ...propertyDescriptions
                ]
                setPropertyDescriptions(newUserInfos);
                setNextPageNumber(nextPageNumber + 1);
            }
        );
    }
    useEffect(() => {  
        fetchNewProperties();
    }, []);
    return (
        <>
            <div className="container">
                <div className="row">
                    {
                        propertyDescriptions.map((propertyDescription: PropertyDescription) => (
                            <PropertyDescriptionComponent 
                                key={propertyDescription.id}
                                propertyDescription={propertyDescription} 
                            />
                        ))
                    }
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li onClick = {() => fetchNewProperties()} className={"page-item" + (nextPageNumber === 1 ? "disabled" : "")}><a className="page-link" href="#">Previous</a></li>
                        <li onClick = {() => fetchNewProperties()} className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Properties;