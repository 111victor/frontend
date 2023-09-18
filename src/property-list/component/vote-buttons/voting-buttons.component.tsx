import "./voting-buttons.component.css";
import { actionTypes } from "../../property- configs/property-configs";
import { useState } from "react";
import { updateVote } from "../../services/property.service";
import {
  PropertyDescription,
  PropertyDetails,
} from "../../interfaces/property-description.interface";

const VotingButtonsComponent = ({
  propertyDetail,
}: {
  propertyDetail: PropertyDetails | PropertyDescription;
}) => {
  const [votes, setVotes] = useState({
    upvote: propertyDetail.upvote,
    downvote: propertyDetail.downvote,
  });

  const handleUpdateVote = (id: number, action: string) => {
    if (action === actionTypes.upvote) {
      setVotes((prevVotes) => ({
        ...prevVotes,
        upvote: prevVotes.upvote + 1,
      }));
      propertyDetail.upvote = propertyDetail.upvote + 1;
    } else if (action === actionTypes.downvote) {
      setVotes((prevVotes) => ({
        ...prevVotes,
        downvote: prevVotes.downvote + 1,
      }));
      propertyDetail.downvote = propertyDetail.downvote + 1;
    }
    updateVote(id, action).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="voting-buttons">
      <button
        className="upvote-button"
        onClick={() => 
          handleUpdateVote(propertyDetail.id, actionTypes.upvote)
        }
      >
        <i className="fa fa-arrow-up"></i>
      </button>
      <span>{votes.upvote}</span>
      <button
        className="downvote-button"
        onClick={() =>
          handleUpdateVote(propertyDetail.id, actionTypes.downvote)
        }
      >
        <i className="fa fa-arrow-down"></i>
      </button>
      <span>{votes.downvote}</span>
    </div>
  );
};

export default VotingButtonsComponent;
