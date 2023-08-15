import { useEffect } from "react";
import useOrganization from "../hooks/useOrganization";

interface IAppLoaderProps {
  children: JSX.Element;
}

function AppLoader({ children }: IAppLoaderProps) {
  const { getOrganizationList } = useOrganization();
  useEffect(() => {
    getOrganizationList();
  }, []);
  return children;
}

export default AppLoader;
