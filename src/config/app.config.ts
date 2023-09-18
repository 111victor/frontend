import { environment } from "../environments/environment";

export const propertyApiUri = `${environment.propertyApiUri}`;
export const commentApiUri = `${environment.commentApiUri}`;

export const AppConfig = {
  paths: {
    appPrivate: {
      updateVote: "update-vote",
    },
  },
};
