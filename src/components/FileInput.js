import React from "react";
import { useState } from "react";

const FileInput = ({ accept, id, fileHandleFnc, text }) => {
  const [fileSelected, setFileSelected] = useState(false);

  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
  };

  return (
    <>
      <label
        className={`${
          fileSelected ? "text-white" : "text-[#8f8297]"
        }  hover:text-white hover:border-white cursor-pointer border-2 border-[#8f8297] rounded-md p-4 text-[1rem] w-[50%] font-bold  mb-4`}
        htmlFor={id}
      >
        {fileSelected ? `The File ${fileSelected} was selected` : `${text}`}
      </label>
      <input
        onChange={onChange}
        type="file"
        accept={accept}
        id={id}
        className=" hidden"
      ></input>
    </>
  );
};

export default FileInput;
