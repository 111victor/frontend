import { PropertyDescription } from "../../interfaces/property-description.interface";
import { formatAddress, formatCurrency } from "../../transformers/transformers";
import './property-description.component.css';
import VotingButtonsComponent from "../vote-buttons/voting-buttons.component";


const PropertyDescriptionComponent = ({ propertyDescription } : { propertyDescription: PropertyDescription }) => {
    return (
        <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Price: {formatCurrency(propertyDescription.price)}</h5>
                <p className="card-text">{propertyDescription.beds} Beds {propertyDescription.baths} Baths {propertyDescription.square_feet} Sq.Ft.</p>
                <p className="card-text">{formatAddress(propertyDescription.address)}</p>
                <VotingButtonsComponent
                    propertyDetail= {propertyDescription}
                />
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
}

export default PropertyDescriptionComponent;