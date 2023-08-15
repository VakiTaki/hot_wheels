import {
  IOrganizationData,
  IOrganizationListItem,
} from "../ts/interfaces/data.interfaces";
import { IRegisterOrganizationData } from "../ts/interfaces/form.interfaces";
import httpService from "./http.service";
import { nanoid } from "@reduxjs/toolkit";

const organizationEndpoint = "organization/";
const organizationListEndPoint = "organizationList/";

const organizationService = {
  create: async (content: IRegisterOrganizationData) => {
    const id = nanoid();
    const { data } = await httpService.put<IOrganizationData>(
      organizationEndpoint + id + ".json",
      {
        ...content,
        _id: id,
        role: "owner",
      }
    );
    return data;
  },
  addToList: async (content: IOrganizationListItem) => {
    const { data } = await httpService.put(
      organizationListEndPoint + content._id + ".json",
      content
    );
    return data;
  },
};
export default organizationService;
