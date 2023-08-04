import React, { useState, useEffect } from "react";
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

const initialState = {
  email: "",
  password: "",
};

function LoginForm() {
  const navigate = useNavigate();
  function handleRegister() {
    navigate("/register");
  }
  const [data, setData] = useState<ILoginData>(initialState);
  const [errors, setErrors] = useState<IErrors>({});
  console.log(errors);
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();
    console.log(isValid);
    //  if (!isValid) return;
    //  try {
    //    await signIn(data);
    //    history.push(
    //      history.location.state ? history.location.state.from.pathname : "/"
    //    );s
    //  } catch (error) {
    //    setErrors(error);
    //  }
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
        <Link className=" text-blue-500" to="/registration">
          Зарегестрироваться
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
