import { FC } from "react";

interface ButtonUIProps {
  disabled?: boolean;
}

const ButtonUI: FC<ButtonUIProps> = ({ disabled }) => {
  return (
    <>
      <button
        className=" disabled:opacity-60 disabled:hover:bg-sky-500 w-full mt-2 rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        disabled={disabled}
      >
        Button
      </button>
    </>
  );
};

export default ButtonUI;
