import axios from "axios";
import {
  PropertyDescription,
  PropertyDetails,
} from "../interfaces/property-description.interface";
import { AppConfig, propertyApiUri } from "../../config/app.config";

const cacheProperty: { [key: string]: PropertyDetails } = {};
const cachePropertyLists: { [key: string]: PropertyDescription[] } = {};

export const fetchPropertyLists = (
  pageNumber: number = 1,
  limit: number = 10,
  search?: string,
): Promise<PropertyDescription[]> => {
  const startPage = Math.floor((pageNumber - 1) / 10) + 1;
  const cacheKey = `${startPage}_${limit}_${search || ""}`;
  const startIndex = ((pageNumber - 1) % 10) * limit;
  const endIndex = startIndex + limit;
  if (cachePropertyLists[cacheKey]) {
    const propertyList = cachePropertyLists[cacheKey].slice(
      startIndex,
      endIndex,
    );
    return Promise.resolve(propertyList);
  } else {
    let apiUrl = `${propertyApiUri}?page=${startPage}&limit=${100}`;
    if (search) {
      apiUrl += `&search=${search}`;
    }
    return axios
      .get(apiUrl)
      .then(({ data }) => {
        const propertyList = data.propertyListDescription;
        cachePropertyLists[cacheKey] = propertyList;
        return propertyList.slice(startIndex, endIndex);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
};

export const fetchProperty = (id: number): Promise<PropertyDetails> => {
  const cacheKey = `${id}`;
  if (cacheProperty[cacheKey]) {
    return Promise.resolve(cacheProperty[cacheKey]);
  } else {
    return axios
      .get(`${propertyApiUri}/${id}`)
      .then(({ data }) => {
        const property = data.propertyDetails;
        cacheProperty[cacheKey] = property;
        return property;
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export const updateVote = (id: number, action: string): Promise<void> => {
  return axios
    .patch(`${propertyApiUri}/${id}/${AppConfig.paths.appPrivate.updateVote}`, {
      action,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const cachePropertyListsLength = (pageNumber, limit, search): number => {
  const startPage = Math.floor((pageNumber - 1) / 10) + 1;
  const cacheKey = `${startPage}_${limit}_${search || ""}`;
  return cachePropertyLists[cacheKey]?.length || 0;
};
