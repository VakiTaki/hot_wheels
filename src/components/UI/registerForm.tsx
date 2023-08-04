import React, { useState, useEffect } from "react";
import InputField from "../common/form/inputField";
import ButtonUI from "../common/form/buttonUI";
import { Link } from "react-router-dom";
import {
  IErrors,
  IRegisterData,
  ITarget,
} from "../../ts/interfaces/form.interfaces";
import { validator } from "../../utils/validator";
import _ from "lodash";
import { httpAuth } from "../../services/httpAuth.service";
import { setTokens } from "../../services/localStorage.service";
import { ILocalStorage } from "../../ts/interfaces/localStorage.interfaces";
import { toast } from "react-toastify";
import axios from "axios";
import { error } from "console";

const initialState = {
  email: "",
  password: "",
  name: "",
};

function RegisterForm() {
  const [data, setData] = useState<IRegisterData>(initialState);
  const [errors, setErrors] = useState<IErrors>({});
  //   const history = useHistory();
  //   const { signIn } = useAuth();
  useEffect(() => {
    if (!_.isEqual(data, initialState)) {
      validate();
    } else {
      setErrors({});
    }
  }, [data]);
  const handleChange = (target: ITarget) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      isName: {
        message: "Имя должно быть формата 'Имя Фамилия (Отчество)'",
      },
    },
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

  async function signUp({ email, password, ...rest }: IRegisterData) {
    try {
      const { data } = await httpAuth.post<ILocalStorage>("accounts:signUp", {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      return data;
    } catch (error) {
      let message;
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.error.message === "EMAIL_EXISTS")
          message = "Такой email уже зарегестрирован";
      } else message = String(error);
      toast(message);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(data);
    } catch (error) {}
  };

  return (
    <div className=" border-2 border-zinc-200 p-5 rounded-lg  w-80">
      <form onSubmit={handleSubmit}>
        <InputField
          label={"Имя"}
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name || ""}
          placeholder="Имя"
        />
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
        Есть аккаунт?{" "}
        <Link className=" text-blue-500" to="/login">
          Вход
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
