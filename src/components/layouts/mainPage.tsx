import React from "react";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <section className=" flex justify-center">
      <section>
        <h1 className=" text-2xl text-center">
          Добро пожаловать в многофункциональный центр автопарка Hot Wheels
        </h1>
        <section className="flex justify-center">
          <Link className=" text-blue-500 text-center" to="/registration">
            Зарегестрироваться
          </Link>
          |
          <Link className=" text-blue-500 text-center" to="/login">
            Войти
          </Link>
        </section>
      </section>
    </section>
  );
};

export default MainPage;
