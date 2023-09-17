import { environment } from "../environments/environment";

export const apiBaseUri = `${environment.apiUri}`;

export const AppConfig = {
  paths: {
    appPrivate: {
      updateVote: "update-vote",
    },
  },
};
