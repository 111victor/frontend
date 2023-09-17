import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchProperty, updateVote } from "../../services/property.service";
import { formatCurrency, formatAddress } from "../../transformers/transformers";
import VotingButtonsComponent from "../vote-buttons/voting-buttons.component";
import { PropertyDetails } from "../../interfaces/property-description.interface";
import GoogleMap from "../google-map/google-map.component";

const PropertyDetailComponent = () => {
  const params = useParams();
  const location = useLocation();
  const search = location.state?.search || "";
  const [propertyDetail, setPropertyDetail] = useState(null);
  const fetchNewProperty = (id) => {
    fetchProperty(id).then((propertyDetail: PropertyDetails) => {
      setPropertyDetail(propertyDetail);
    });
  };

  useEffect(() => {
    fetchNewProperty(parseInt(params.id));
  }, [params.id]);

  return (
    <div className="container">
      <Link to={`..${search}`} relative="path">
        <button>Back</button>
      </Link>
      <div className="col-sm-3 py-2">
        {propertyDetail ? (
          <div>
            <div className="card">
              <GoogleMap
                id={propertyDetail.id}
                latitude={propertyDetail.latitude}
                longitude={propertyDetail.longitude}
              />
              <div className="card-body">
                <h5 className="card-title">
                  Price: {formatCurrency(propertyDetail.price)}
                </h5>
                <p className="card-text">
                  {propertyDetail.beds} Beds {propertyDetail.baths} Baths{" "}
                  {propertyDetail.square_feet} Sq.Ft.
                </p>
                <p className="card-text">
                  {formatAddress(propertyDetail.address)}
                </p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
              </div>
              <div>
                <VotingButtonsComponent propertyDetail={propertyDetail} />
                <button
                  type="button"
                  className="btn btn-primary position-relative"
                >
                  Mails{" "}
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                    +99 <span className="visually-hidden">unread messages</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailComponent;
