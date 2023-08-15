import React, { useState, useEffect, FC } from "react";
import InputField from "../common/form/inputField";
import ButtonUI from "../common/form/buttonUI";
import { Link, useNavigate } from "react-router-dom";
import {
  IErrors,
  ILoginData,
  ITarget,
} from "../../ts/interfaces/form.interfaces";
import { validator } from "../../utils/validator";
import _ from "lodash";
import useAuth from "../../hooks/useAuth";

const initialState = {
  email: "",
  password: "",
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [data, setData] = useState<ILoginData>(initialState);
  const [errors, setErrors] = useState<IErrors>({});
  useEffect(() => {
    if (!_.isEqual(data, initialState)) {
      validate();
    } else {
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleChange = (target: ITarget) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Электронная почта введена некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать цифру",
      },
      minLength: {
        value: 8,
        message: `Пароль cодержать минимум 8 символов`,
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const isValid = !Object.keys(errors).length && !_.isEqual(data, initialState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(data).then(() => navigate("/"));
  };

  return (
    <div className=" border-2 border-zinc-200 p-5 rounded-lg  w-80">
      <form onSubmit={handleSubmit}>
        <InputField
          label={"Email"}
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email || ""}
          placeholder="Email"
        />
        <InputField
          label={"Пароль"}
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password || ""}
          placeholder="Пароль"
        />
        <ButtonUI disabled={!isValid} />
      </form>
      <div>
        Нет аккаунта?{" "}
        <Link className=" text-blue-500" to="/auth/registration">
          Зарегестрироваться
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
