import { useState } from "react";
import Number from "../Components/Number";
const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNumber = (e) => {
    e.preventDefault();
    const noteObject = {
      name: newName,
    };
    setPersons(persons.concat(noteObject));
    setNewName("");
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((ele) => (
          <Number key={ele.name} num={ele} />
        ))}
      </div>
    </div>
  );
};

export default App;
