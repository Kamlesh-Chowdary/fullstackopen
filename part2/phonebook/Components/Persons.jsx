import React from "react";
import Number from "./Number";

const Persons = ({ persons, deleteNumber }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button
              type="submit"
              onClick={() => {
                deleteNumber(person);
              }}
            >
              delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
