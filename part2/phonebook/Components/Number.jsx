import React from "react";
import numberService from "../src/Services/Numbers";
const Number = ({ num, handleClick }) => {
  return (
    <>
      <p>
        {num.name} {num.number}
      </p>
      <button onClick={handleClick} id={num.id} name={num.name}>
        delete
      </button>
    </>
  );
};

export default Number;
