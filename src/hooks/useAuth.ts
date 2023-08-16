import { useAppDispatch } from "../store/hooks";
import { ILoginData, IRegisterData } from "../ts/interfaces/form.interfaces";
import { ILocalStorage } from "../ts/interfaces/localStorage.interfaces";
import { httpAuth } from "../services/httpAuth.service";
import { setTokens } from "../services/localStorage.service";
import axios from "axios";
import { toast } from "react-toastify";
import usersService from "../services/user.service";
import {
  authRequestFiled,
  authRequestSuccess,
  authRequested,
  getIsLoogedIn,
} from "../store/slices/userSlice";
import { useSelector } from "react-redux";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(getIsLoogedIn());
  async function signIn({ email, password, ...rest }: ILoginData) {
    dispatch(authRequested());
    try {
      const { data } = await httpAuth.post<ILocalStorage>(
        "accounts:signInWithPassword",
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      dispatch(authRequestSuccess(data.localId));
      setTokens(data);
      return data;
    } catch (error) {
      dispatch(authRequestFiled());
      console.log(error);
      let message;
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.error.message === "EMAIL_EXISTS")
          message = "Такой email уже зарегестрирован";
      } else message = String(error);
      toast(message);
    }
  }
  async function signUp({ email, password, ...rest }: IRegisterData) {
    dispatch(authRequested());
    try {
      const { data } = await httpAuth.post<ILocalStorage>("accounts:signUp", {
        email,
        password,
        returnSecureToken: true,
      });
      dispatch(authRequestSuccess(data.localId));
      setTokens(data);
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
  const createUser = async (data: IRegisterData) => {
    try {
      const { content } = await usersService.create(data);
      return content;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    signIn,
    signUp,
    createUser,
    isAuth,
  };
};

export default useAuth;
