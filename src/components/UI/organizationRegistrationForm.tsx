import React, { useState, useEffect, FC } from "react";
import InputField from "../common/form/inputField";
import ButtonUI from "../common/form/buttonUI";
import { Link, useNavigate } from "react-router-dom";
import {
  IErrors,
  IRegisterOrganizationData,
  ITarget,
} from "../../ts/interfaces/form.interfaces";
import { validator } from "../../utils/validator";
import _ from "lodash";
import useAuth from "../../hooks/useAuth";
import useOrganization from "../../hooks/useOrganization";

const initialState: IRegisterOrganizationData = {
  organizationName: "",
  name: "",
  address: "",
  email: "",
  password: "",
};

const OrganizationRegisterForm: FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { createOrganization } = useOrganization();
  const [data, setData] = useState<IRegisterOrganizationData>(initialState);
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
    organizationName: {
      isRequired: {
        message: "Имя организации обязательно для заполнения",
      },
    },
    address: {
      isRequired: {
        message: "Адрес обязателен для заполнения",
      },
    },
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = data;
    await signUp({ name, email, password });
    await createOrganization(data);
  };

  return (
    <div className=" border-2 border-zinc-200 p-5 rounded-lg  w-80">
      <form onSubmit={handleSubmit}>
        <InputField
          label={"Название организации"}
          name="organizationName"
          value={data.organizationName}
          onChange={handleChange}
          error={errors.organizationName || ""}
          placeholder="Название организации"
        />
        <InputField
          label={"Адрес организации"}
          name="address"
          value={data.address}
          onChange={handleChange}
          error={errors.address || ""}
          placeholder="Адрес организации"
        />
        <InputField
          label={"Имя владельца"}
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
};

export default OrganizationRegisterForm;
