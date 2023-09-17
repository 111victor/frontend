import { PropertyDescription } from "../../interfaces/property-description.interface";
import { formatAddress, formatCurrency } from "../../transformers/transformers";
import "./property-description.component.css";
import VotingButtonsComponent from "../vote-buttons/voting-buttons.component";
import GoogleMap from "../google-map/google-map.component";
import { Link, useSearchParams } from "react-router-dom";

const PropertyDescriptionComponent = ({
  propertyDescription,
  searchParams,
}: {
  propertyDescription: PropertyDescription;
  searchParams: any;
}) => {
  return (
    <div className="col-sm-3 py-2" key={propertyDescription.id}>
      <div className="card">
        <GoogleMap
          id={propertyDescription.id}
          latitude={propertyDescription.latitude}
          longitude={propertyDescription.longitude}
        />
        <Link
          to={propertyDescription.id.toString()}
          state={{ search: `?${searchParams.toString()}` }}
        >
          <div className="card-body">
            <h5 className="card-title">
              Price: {formatCurrency(propertyDescription.price)}
            </h5>
            <p className="card-text">
              {propertyDescription.beds} Beds {propertyDescription.baths} Baths{" "}
              {propertyDescription.square_feet} Sq.Ft.
            </p>
            <p className="card-text">
              {formatAddress(propertyDescription.address)}
            </p>
          </div>
        </Link>
        <div className="card-footer text-body-secondary">
          <VotingButtonsComponent propertyDetail={propertyDescription} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDescriptionComponent;
