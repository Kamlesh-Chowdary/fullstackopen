import React from "react";
import numberService from "../src/Services/Numbers";
const Number = ({ num, handleClick }) => {
  return (
    <div>
      {num.name} {num.number}
      <button onClick={handleClick} id={num.id} name={num.name}>
        delete
      </button>
    </div>
  );
};

export default Number;
