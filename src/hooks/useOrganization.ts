import { selectUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "axios";
import { toast } from "react-toastify";
import { IRegisterOrganizationData } from "../ts/interfaces/form.interfaces";
import organizationService from "../services/organization.service";
import { IOrganizationListItem } from "../ts/interfaces/data.interfaces";
import {
  organizationListFiled,
  organizationListReceved,
  organizationListRequested,
} from "../store/slices/organizationListSlice";

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
  async function getOrganizationList() {
    dispatch(organizationListRequested());
    try {
      const data = await organizationService.getList();
      dispatch(organizationListReceved(data));
      return data;
    } catch (error) {
      dispatch(organizationListFiled());
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
    getOrganizationList,
    isAuth: !!localId,
    refreshToken,
    idToken,
    expiresIn,
    localId,
  };
};

export default useOrganization;
