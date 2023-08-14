import { IRegisterOrganizationData } from "../ts/interfaces/form.interfaces";
import httpService from "./http.service";
import { nanoid } from "@reduxjs/toolkit";

const organizationEndpoint = "organization/";
const organizationListEndPoint = "organizationList";

const organizationService = {
  //   get: async () => {
  //     const { data } = await httpService.get(organizationEndpoint);
  //     return data;
  //   },

  create: async (content: IRegisterOrganizationData) => {
    const id = nanoid();
    const { data } = await httpService.put(
      organizationEndpoint + id + ".json",
      {
        ...content,
        _id: id,
        role: "owner",
      }
    );
    console.log(data);
    await httpService.put(organizationListEndPoint + ".json", data);
    return data;
  },
  //   getCurrentUser: async () => {
  //     const { data } = await httpService.get(
  //       organizationEndpoint + localStorageServise.getUserId()
  //     );
  //     return data;
  //   },
  //   editUser: async (content) => {
  //     const { data } = await httpService.patch(
  //       organizationEndpoint + localStorageServise.getUserId(),
  //       content
  //     );
  //     return data;
  //   },
};
export default organizationService;
