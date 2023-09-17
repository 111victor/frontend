import axios from "axios";
import {
  PropertyDescription,
  PropertyDetails,
} from "../interfaces/property-description.interface";
import { AppConfig, apiBaseUri } from "../../config/app.config";

export const fetchPropertyLists = (
  pageNumber: number = 1,
  limit: number = 10,
): Promise<PropertyDescription[]> => {
  return axios
    .get(`${apiBaseUri}?page=${pageNumber}&limit=${limit}`)
    .then(({ data }) => data.propertyListDescription)
    .catch((error) => {
      console.error(error);
    });
};

export const fetchProperty = (id: number): Promise<PropertyDetails> => {
  return axios
    .get(`${apiBaseUri}/${id}`)
    .then(({ data }) => data.propertyDetails)
    .catch((error) => {
      console.error(error);
    });
};

export const updateVote = (id: number, action: string): Promise<void> => {
  return axios
    .patch(`${apiBaseUri}/${id}/${AppConfig.paths.appPrivate.updateVote}`, {
      action,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};
