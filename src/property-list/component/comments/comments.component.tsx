import { useRef } from "react";
import { CommentInfo } from "../../interfaces/comment.interface";
import { postComment } from "../../services/comment.service";

const CommentsComponent = ({
  commentInfo,
  setCommentInfo,
  propertyId,
}: {
  commentInfo: CommentInfo;
  setCommentInfo: Function;
  propertyId: number;
}) => {
  let commentRef = useRef(null);
  const addComment = (e) => {
    e.preventDefault();
    const newComment = commentRef.current.value;

    if (newComment === "") return;

    const newCommentObj = {
      content: newComment,
    };

    const updatedComments = [...commentInfo.comments, newCommentObj];

    setCommentInfo({
      ...commentInfo,
      comments: updatedComments,
      count: commentInfo.count + 1,
    });

    postComment(newComment, propertyId)
      .then((state) => {
        console.log(state);
      })
      .catch((error) => {
        console.error(error);
      });
    commentRef.current.value = "";
  };

  return (
    <>
      <div className="mx-auto mt-2">
        {commentInfo?.comments?.map((comment, index) => (
          <div className="card mb-2" key={index}>
            <div className="card-body">{comment.content}</div>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-2 mb-2">
        <form className="d-flex" onSubmit={(e) => addComment(e)}>
          <textarea
            ref={commentRef}
            className="form-control me-2"
            placeholder="Leave some comments"
          />
          <button className="btn btn-outline-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CommentsComponent;
