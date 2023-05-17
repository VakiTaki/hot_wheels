import React from "react";

function Input() {
  return (
    <div>
      <label
        htmlFor="input"
        className="block text-sm font-medium leading-6 text-gray-900 pl-2"
      >
        Title
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center "></div>
        <input
          type="text"
          name="input"
          id="input"
          className="block w-30 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="value"
        />
      </div>
    </div>
  );
}

export default Input;
