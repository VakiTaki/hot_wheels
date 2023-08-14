import { selectUser, setUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ILoginData, IRegisterData } from "../ts/interfaces/form.interfaces";
import { ILocalStorage } from "../ts/interfaces/localStorage.interfaces";
import { httpAuth } from "../services/httpAuth.service";
import { setTokens } from "../services/localStorage.service";
import axios from "axios";
import { toast } from "react-toastify";

function useAuth() {
  const dispatch = useAppDispatch();
  const { refreshToken, idToken, expiresIn, localId } =
    useAppSelector(selectUser);
  async function signIn({ email, password, ...rest }: ILoginData) {
    try {
      const { data } = await httpAuth.post<ILocalStorage>(
        "accounts:signInWithPassword",
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      dispatch(setUser(data));
      setTokens(data);
      return data;
    } catch (error) {
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
    try {
      const { data } = await httpAuth.post<ILocalStorage>("accounts:signUp", {
        email,
        password,
        returnSecureToken: true,
      });
      dispatch(setUser(data));
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
  return {
    signIn,
    signUp,
    isAuth: !!localId,
    refreshToken,
    idToken,
    expiresIn,
    localId,
  };
}

export default useAuth;