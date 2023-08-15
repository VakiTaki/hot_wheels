import { IRegisterOrganizationData } from "./form.interfaces";

export interface IUserData {
  authId: string;
}

export interface IOrganizationData extends IRegisterOrganizationData {
  _id: string;
  role: string;
}

export type IOrganizationListItem = Pick<IOrganizationData, "_id" | "name">;
