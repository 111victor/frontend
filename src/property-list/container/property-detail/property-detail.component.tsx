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
              <p className="card-text">{propertyDetail.description}</p>
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
          <h2>Loading...</h2>
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
