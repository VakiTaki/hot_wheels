import {
  IValidatorConfig,
  IErrorForm,
  IErrors,
  IData,
} from "../ts/interfaces/form.interfaces";
export function validator(data: IData, config: IValidatorConfig) {
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
