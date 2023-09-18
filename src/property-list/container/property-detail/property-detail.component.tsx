import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchProperty } from "../../services/property.service";
import { formatCurrency, formatAddress } from "../../transformers/transformers";
import VotingButtonsComponent from "../../component/vote-buttons/voting-buttons.component";
import { PropertyDetails } from "../../interfaces/property-description.interface";
import GoogleMap from "../../component/google-map/google-map.component";
import { fetchComments } from "../../services/comment.service";
import { CommentInfo } from "../../interfaces/comment.interface";
import CommentsComponent from "../../component/comments/comments.component";
import LoadingSpinner from "../../component/spinner/loading-spinner.component";

const PropertyDetailComponent = () => {
  const params = useParams();
  const location = useLocation();
  const propertyId = parseInt(params.id);
  const search = location.state?.search || "";
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [commentInfo, setCommentInfo] = useState({
    comments: [],
    count: 0,
  });
  const fetchNewProperty = (id: number) => {
    fetchProperty(id).then((propertyDetail: PropertyDetails) => {
      setPropertyDetail(propertyDetail);
    });
  };

  const fetchAllComments = (id: number) => {
    fetchComments(id).then((commentInfo: CommentInfo) => {
      setCommentInfo(commentInfo);
    });
  };

  useEffect(() => {
    fetchNewProperty(propertyId);
    fetchAllComments(propertyId);
  }, [params.id]);

  return (
    <div className="container mt-5">
      <Link to={`..${search}`} relative="path">
        <button type="button" className="btn">
          Back
        </button>
      </Link>
      <div className="d-flex justify-content-center align-items-center">
        {propertyDetail ? (
          <div className="card mx-auto p-3">
            <GoogleMap
              id={propertyDetail.id}
              latitude={propertyDetail.latitude}
              longitude={propertyDetail.longitude}
            />
            <div className="card-body">
              <p className="card-text">
                {formatAddress(propertyDetail.address)}
              </p>
              <div className="mt-2 card-title d-flex justify-content-between">
                <div>
                  <h5 className="card-title">
                    Price: {formatCurrency(propertyDetail.price)}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Monthly Hoa: {propertyDetail.monthly_hoa}
                  </h6>
                </div>
                <p className="card-text">
                  <b>{propertyDetail.beds}</b> Beds{" "}
                  <b>{propertyDetail.baths}</b> Baths{" "}
                  <b>{propertyDetail.square_feet}</b> Sq.Ft.
                </p>
              </div>
              <h3>About this home: </h3>
              <p className="card-text">{propertyDetail.description}</p>
              <h3>Home Facts: </h3>
              <p className="card-text">
                Year build: {propertyDetail.year_built}
              </p>
              <p className="card-text">
                Lot size: {propertyDetail.lot_size} Sq. Ft.
              </p>
              <p className="card-text">
                Property type: {propertyDetail.property_type}
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-around">
              <VotingButtonsComponent propertyDetail={propertyDetail} />
              <button
                type="button"
                className="btn btn-primary position-relative"
                data-bs-toggle="collapse"
                data-bs-target="#collapseComments"
                aria-expanded="false"
                aria-controls="collapseComments"
              >
                Comments{" "}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                  {commentInfo.count}{" "}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="loading-overlay">
            <h2>Loading...</h2>
            <LoadingSpinner />
          </div>
        )}
      </div>
      <div className="collapse" id="collapseComments">
        {commentInfo && (
          <CommentsComponent
            commentInfo={commentInfo}
            setCommentInfo={setCommentInfo}
            propertyId={propertyId}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyDetailComponent;
