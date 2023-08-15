import { IRegisterData } from "../ts/interfaces/form.interfaces";
import httpService from "./http.service";
import { nanoid } from "@reduxjs/toolkit";

const usersEndpoint = "users/";

const usersService = {
  create: async (content: IRegisterData) => {
    const id = nanoid();
    const { data } = await httpService.put(usersEndpoint + id + ".json", {
      ...content,
      _id: id,
      role: "owner",
    });
    console.log(data);
    return data;
  },
};
export default usersService;
