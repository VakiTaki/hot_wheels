import { selectUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "axios";
import { toast } from "react-toastify";
import { IRegisterOrganizationData } from "../ts/interfaces/form.interfaces";
import organizationService from "../services/organization.service";
import {
  IOrganizationData,
  IOrganizationListItem,
} from "../ts/interfaces/data.interfaces";

const useOrganization = () => {
  const dispatch = useAppDispatch();
  const { refreshToken, idToken, expiresIn, localId } =
    useAppSelector(selectUser);
  async function createOrganization(content: IRegisterOrganizationData) {
    try {
      const data = await organizationService.create(content);
      return data;
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.error.message === "EMAIL_EXISTS")
          message = "Такой email уже зарегестрирован";
      } else message = String(error);
      toast(message);
    }
  }
  async function addOrganizationToList(content: IOrganizationListItem) {
    try {
      const data = await organizationService.addToList(content);
      return data;
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.error.message === "EMAIL_EXISTS")
          message = "Такой email уже зарегестрирован";
      } else message = String(error);
      toast(message);
    }
  }
  return {
    createOrganization,
    addOrganizationToList,
    isAuth: !!localId,
    refreshToken,
    idToken,
    expiresIn,
    localId,
  };
};

export default useOrganization;
