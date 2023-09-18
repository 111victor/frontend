import axios from "axios";
import { commentApiUri } from "../../config/app.config";
import { CommentInfo } from "../interfaces/comment.interface";

export const fetchComments = (propertyId: number): Promise<CommentInfo> => {
  return axios
    .get(`${commentApiUri}/${propertyId}`)
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
};

export const updateComment = (
  commentId: number,
  content: string,
): Promise<void> => {
  return axios
    .patch(`${commentApiUri}/${commentId}`, {
      content,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postComment = (
  content: string,
  property_id: number,
): Promise<void> => {
  return axios
    .post(`${commentApiUri}`, {
      content,
      property_id,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};
