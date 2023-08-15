import React, { FC } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MainPage: FC = () => {
  const { isAuth } = useAuth();
  return (
    <section className=" flex justify-center">
      <section>
        <h1 className=" text-2xl text-center">
          Добро пожаловать в многофункциональный центр автопарка Hot Wheels
        </h1>
        {!isAuth && (
          <section className="flex justify-center">
            <Link
              className=" text-blue-500 text-center"
              to="/auth/registration"
            >
              Зарегестрироваться
            </Link>
            |
            <Link className=" text-blue-500 text-center" to="/auth/login">
              Войти
            </Link>
          </section>
        )}
      </section>
    </section>
  );
};

export default MainPage;
