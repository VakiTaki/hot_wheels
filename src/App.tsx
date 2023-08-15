import Navigation from "./components/navigation/navigation";
import UserHeader from "./components/userHeader/userHeader";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";
import { FC, useEffect } from "react";
import withRedux from "./hoc/withRedux";
import withRouter from "./hoc/withRouter";
import organizationService from "./services/organization.service";
import AppLoader from "./hoc/appLoader";

const App: FC = () => {
  const appRoutes = useRoutes(routes);
  const { isAuth } = useAuth();
  return (
    <>
      <AppLoader>
        <div className="flex justify-center ">
          <div className="flex flex-col h-screen w-full  sm:w-10/12 lg:w-3/4">
            <header className=" flex jus bg-sky-400  h-20 rounded-b-lg">
              <div className="flex justify-between w-full items-center mx-5">
                <Link to="/" className="  font-bold text-3xl uppercase">
                  <span className="text-red-600">Hot</span>
                  <span className="text-white ml-2">Wheels</span>
                </Link>
                <div className=" text-myColor1">
                  <Navigation />
                </div>
                <div className="self-center">
                  {isAuth ? (
                    <UserHeader />
                  ) : (
                    <Link to={"/auth/login"}>Login</Link>
                  )}
                </div>
              </div>
            </header>
            <main className=" bg-slate-100 h-full overflow-scroll p-2 rounded-lg my-2">
              {appRoutes}
            </main>
            <footer className=" bg-sky-400 h-10 rounded-t-lg">
              <p className="mx-2 my-1 text-center text-myColor1">
                2023 год, Родин Андрей
              </p>{" "}
            </footer>
          </div>
          <ToastContainer />
        </div>
      </AppLoader>
    </>
  );
};

const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
