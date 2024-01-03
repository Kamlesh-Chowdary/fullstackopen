import React from "react";

const Filter = ({ text, value, onChange }) => {
  return (
    <>
      {text}
      <input value={value} onChange={onChange} />
    </>
  );
};

export default Filter;
