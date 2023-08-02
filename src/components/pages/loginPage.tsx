import React from "react";
import LoginForm from "../UI/loginForm";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className=" flex justify-center items-center mt-5  ">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
