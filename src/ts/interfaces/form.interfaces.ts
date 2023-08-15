export interface IData
  extends Partial<ILoginData>,
    Partial<IRegisterData>,
    Partial<IRegisterOrganizationData> {}

export type IErrors = {
  [key in keyof IData]?: string;
};

export interface IRegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
}
export interface IRegisterOrganizationData {
  organizationName: string;
  address: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ITarget {
  name: string;
  value: string;
}

export interface IErrorForm {
  message: string;
  value?: number;
}

export interface IValidatorConfig {
  [key: string]: {
    [key: string]: IErrorForm;
  };
}
