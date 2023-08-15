import { selectUser, setUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ILocalStorage } from "../ts/interfaces/localStorage.interfaces";
import { setTokens } from "../services/localStorage.service";
import axios from "axios";
import { toast } from "react-toastify";
import { IRegisterOrganizationData } from "../ts/interfaces/form.interfaces";
import organizationService from "../services/organization.service";

const useOrganization = () => {
  const dispatch = useAppDispatch();
  const { refreshToken, idToken, expiresIn, localId } =
    useAppSelector(selectUser);
  async function createOrganization(content: IRegisterOrganizationData) {
    try {
      const { data } = await organizationService.create(content);
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
    isAuth: !!localId,
    refreshToken,
    idToken,
    expiresIn,
    localId,
  };
};

export default useOrganization;
