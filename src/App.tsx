import Navigation from "./components/navigation/navigation";
import UserHeader from "./components/userHeader/userHeader";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";
import { FC } from "react";

const App: FC = () => {
  const { isAuth } = useAuth();
  return (
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
              {isAuth ? <UserHeader /> : <Link to={"/login"}>Login</Link>}
            </div>
          </div>
        </header>
        <main className=" bg-slate-100 h-full overflow-scroll p-2 rounded-lg my-2">
          <Routes>
            {routes.map((route, ind) => {
              return (
                <Route
                  path={route.path + (route.params ? route.params : "")}
                  element={route.element}
                  key={ind}
                />
              );
            })}
          </Routes>
        </main>
        <footer className=" bg-sky-400 h-10 rounded-t-lg">
          <p className="mx-2 my-1 text-center text-myColor1">
            2023 год, Родин Андрей
          </p>{" "}
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
