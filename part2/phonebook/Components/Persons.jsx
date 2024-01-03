import React from "react";
import Number from "./Number";

const Persons = ({ persons, handleClick }) => {
  return (
    <div>
      {persons.map((person, key) => {
        return (
          <p key={key}>
            {person.name} {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
