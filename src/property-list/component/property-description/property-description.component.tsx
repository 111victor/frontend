import { Link } from "react-router-dom";
import { PropertyDescription } from "../../interfaces/propertyDescription";
import { formatAddress, formatCurrency } from "../../transformers/transformers";
import './property-description.component.css';


const PropertyDescriptionComponent = ({ propertyDescription } : { propertyDescription: PropertyDescription }) => {
    return (
        <>
            <div className="col-sm-3 py-2">
                <Link to={`/${propertyDescription.id}`}>
                    <div className="card">
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Price: {formatCurrency(propertyDescription.price)}</h5>
                            <p className="card-text">{propertyDescription.beds} Beds {propertyDescription.baths} Baths {propertyDescription.square_feet} Sq.Ft.</p>
                            <p className="card-text">{formatAddress(propertyDescription.address)}</p>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default PropertyDescriptionComponent;