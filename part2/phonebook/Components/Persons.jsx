import React from "react";
import Number from "./Number";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((ele) => (
        <Number key={ele.name} num={ele} />
      ))}
    </div>
  );
};

export default Persons;
