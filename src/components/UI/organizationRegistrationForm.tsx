import React, { useState, useEffect, FC } from "react";
import InputField from "../common/form/inputField";
import ButtonUI from "../common/form/buttonUI";
import { Link } from "react-router-dom";
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
  phone: "+7",
};

const OrganizationRegisterForm: FC = () => {
  const { signUp, createUser } = useAuth();
  const { createOrganization, addOrganizationToList } = useOrganization();
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
  const validate = () => {
    const errors = validator(data);
    setErrors(errors);
    return !Object.keys(errors).length;
  };
  const isValid = !Object.keys(errors).length && !_.isEqual(data, initialState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, phone } = data;
    // signUp({ name, email, password, phone }).then((content) => {
    //   if (content) createUser(data);
    // });
    createOrganization(data).then((content) => {
      if (content)
        addOrganizationToList({
          name: content?.organizationName,
          _id: content?._id,
        });
    });
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
          label={"Номер телефона"}
          name="phone"
          value={data.phone}
          onChange={handleChange}
          error={errors.phone || ""}
          placeholder="Номер телефона"
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
