import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";

function useAuth() {
  const { refreshToken, idToken, expiresIn, localId } = useSelector(selectUser);
  return {
    isAuth: !!localId,
    refreshToken,
    idToken,
    expiresIn,
    localId,
  };
}

export default useAuth;
