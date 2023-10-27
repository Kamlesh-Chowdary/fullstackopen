import React from "react";
import Number from "./Number";

const Persons = ({ persons, handleClick }) => {
  return (
    <div>
      {persons.map((ele) => (
        <Number key={ele.name} num={ele} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default Persons;
