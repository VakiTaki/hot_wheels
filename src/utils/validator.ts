import {
  IValidatorConfig,
  IErrorForm,
  IErrors,
  IData,
} from "../ts/interfaces/form.interfaces";

const config: IValidatorConfig = {
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
  phone: {
    isRequired: {
      message: "Номер телефона обязателен для заполнения",
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

export function validator(data: IData) {
  const errors: IErrors = {};
  const validate = (
    validateMethod: string,
    data: boolean | string | undefined,
    config: IErrorForm
  ) => {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else {
          statusValidate = data?.trim() === "";
        }
        break;
      }

      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        if (typeof data === "string") statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalSymbolRegExp = /[A-Z]+/g;
        if (typeof data === "string")
          statusValidate = !capitalSymbolRegExp.test(data);
        break;
      }
      case "isContainDigit": {
        const containDigitRegExp = /\d+/g;
        if (typeof data === "string")
          statusValidate = !containDigitRegExp.test(data);
        break;
      }
      case "minLength": {
        if (typeof data === "string")
          if (config.value) statusValidate = data.length < config.value;
        break;
      }
      case "isName": {
        const containDigitRegExp =
          /^([^' -][a-zA-ZА-ЯЁа-яё'-]{1,20}([ ])){1,2}[a-zA-ZА-ЯЁа-яё'-]{1,20}[^ ]$/gu;
        if (typeof data === "string")
          statusValidate = !containDigitRegExp.test(data);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  };
  let fieldName: keyof IData;
  for (fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
