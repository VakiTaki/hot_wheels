import React from "react";
import { IOptionsArray, ITarget } from "../../../ts/interfaces/form.interfaces";

interface ISelectFieldProps {
  label: string;
  value: string;
  name: string;
  options: IOptionsArray[];
  error: string;
  defaultOption: string;
  onChange: (target: ITarget) => void;
}

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
  name,
}: ISelectFieldProps) => {
  const isInvalidClass = () => {
    return "form-select " + (error ? "is-invalid" : "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ name, value: e.target.value });
  };

  return (
    <div className="mb-2">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={isInvalidClass()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {options.length > 0 &&
          options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
