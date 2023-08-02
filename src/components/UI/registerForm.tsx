import React, { useState } from "react";
import InputField from "../common/input/inputField";
import ButtonUI from "../common/button/buttonUI";
import { Link } from "react-router-dom";

interface IErrors {
  email?: string;
  password?: string;
}

interface IData {
  name: string;
  email: string;
  password: string;
}
interface ITarget {
  name: string;
  value: string;
}

const initialState = {
  email: "",
  password: "",
  name: "",
};

function RegisterForm() {
  const [data, setData] = useState<IData>(initialState);
  const [errors, setErrors] = useState<IErrors>({});
  //   const history = useHistory();
  //   const { signIn } = useAuth();
  //   useEffect(() => {
  //       validate();
  //   }, [data]);
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
  //   const validate = () => {
  //     const errors = validator(data, validatorConfig);
  //     setErrors(errors);
  //     return !Object.keys(errors).length;
  //   };
  const isValid = !Object.keys(errors).length;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    //  const isValid = validate();
    //  if (!isValid) return;
    //  try {
    //    await signIn(data);
    //    history.push(
    //      history.location.state ? history.location.state.from.pathname : "/"
    //    );
    //  } catch (error) {
    //    setErrors(error);
    //  }
  };

  return (
    <div className=" border-2 border-zinc-200 p-5 rounded-lg w-1/3">
      <form onSubmit={handleSubmit}>
        <InputField
          label={"Имя"}
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.email || ""}
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
        <ButtonUI />
      </form>
      <div>
        Есть аккаунт? <Link to="/login">Вход</Link>
      </div>
    </div>
  );
}

export default RegisterForm;
