import React from "react";

const Input = ({ type, state, setState, placeholder, required, className }) => {
  return (
    <>
      <input
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`${className}`}
      ></input>
    </>
  );
};

export default Input;
