import React from "react";

const PersonForm = ({
  addNumber,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input id="name" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input id="number" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button id="add" type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
