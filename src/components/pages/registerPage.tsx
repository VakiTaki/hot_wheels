import React, { FC, useState } from "react";
import UserRegisterForm from "../UI/userRegisterForm";
import OrganizationRegisterForm from "../UI/organizationRegistrationForm";

type RegistrationType = "user" | "organization";

const RegisterPage: FC = () => {
  const [registrationType, setRegistrationType] =
    useState<RegistrationType>("user");
  return (
    <>
      <section>
        <button
          onClick={() =>
            setRegistrationType((prev) =>
              prev === "organization" ? "user" : "organization"
            )
          }
        >
          {registrationType === "organization"
            ? "Зарегестрироваться как пользователь"
            : "Зарегестрировать организацию"}
        </button>
      </section>
      <section>
        <h1 className="text-center text-2xl">
          {registrationType === "user"
            ? "Регистрация пользователя"
            : "Регистрация организации"}
        </h1>
        <section className=" flex justify-center items-center mt-5  ">
          {registrationType === "user" ? (
            <UserRegisterForm />
          ) : (
            <OrganizationRegisterForm />
          )}
        </section>
      </section>
    </>
  );
};

export default RegisterPage;
