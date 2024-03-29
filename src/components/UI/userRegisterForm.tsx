import React, { useState, useEffect, FC } from "react";
import InputField from "../common/form/inputField";
import ButtonUI from "../common/form/buttonUI";
import { Link, useNavigate } from "react-router-dom";
import {
  IErrors,
  IOptionsArray,
  IRegisterData,
  ITarget,
} from "../../ts/interfaces/form.interfaces";
import { validator } from "../../utils/validator";
import _ from "lodash";
import useAuth from "../../hooks/useAuth";
import SelectField from "../common/form/selectField";
import { useAppSelector } from "../../store/hooks";
import { getOrganizationList } from "../../store/slices/organizationListSlice";
import MyListbox from "../common/form/costumSelect";

const initialState = {
  email: "",
  password: "",
  name: "",
  phone: "+7",
  organization: "",
};

const UserRegisterForm: FC = () => {
  const navigate = useNavigate();
  const { signUp, createUser } = useAuth();
  const [data, setData] = useState<IRegisterData>(initialState);
  const [errors, setErrors] = useState<IErrors>({});
  const organizationList = useAppSelector(getOrganizationList());
  const arrayOptions: IOptionsArray[] = organizationList.map((option) => ({
    label: option.name,
    value: option._id,
  }));
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
    signUp(data).then((content) => {
      if (content) createUser(data).then(() => navigate("/"));
    });
  };

  return (
    <div className=" border-2 border-zinc-200 p-5 rounded-lg  w-80">
      <form onSubmit={handleSubmit}>
        <InputField
          label={"Фамилия и имя"}
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name || ""}
          placeholder="Фамилия и имя"
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
        <SelectField
          label="Организация"
          name="organization"
          value={data.organization}
          options={arrayOptions}
          defaultOption="Выбрать..."
          error={errors.organization || ""}
          onChange={handleChange}
        />
        <MyListbox />
        <ButtonUI disabled={!isValid} />
      </form>
      <div>
        Есть аккаунт?{" "}
        <Link className=" text-blue-500" to="/auth/login">
          Вход
        </Link>
      </div>
    </div>
  );
};

export default UserRegisterForm;
