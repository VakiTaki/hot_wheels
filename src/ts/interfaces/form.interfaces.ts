export interface IData extends Partial<ILoginData>, Partial<IRegisterData> {}

export type IErrors = {
  [key in keyof IData]?: string;
};

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
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
