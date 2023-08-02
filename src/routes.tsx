import MainPage from "./components/layouts/mainPage";
import Finance from "./components/layouts/finance";
import LoginPage from "./components/pages/loginPage";
import RegisterPage from "./components/pages/registerPage";

interface IRoute {
  path: string;
  element: JSX.Element;
  display: boolean;
  title: string;
  params?: string;
}

export const routes: IRoute[] = [
  { path: "/", element: <MainPage />, display: true, title: "Главная" },
  {
    path: "/finance",
    params: "/:id?",
    element: <Finance />,
    display: true,
    title: "Финансы",
  },
  { path: "/login", element: <LoginPage />, display: false, title: "Login" },
  {
    path: "/registration",
    element: <RegisterPage />,
    display: false,
    title: "Регистрация",
  },
];
