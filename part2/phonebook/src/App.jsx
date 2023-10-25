import { useState } from "react";
import Number from "../Components/Number";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNumber = (e) => {
    e.preventDefault();
    persons.map((ele) => {
      if (ele.name === newName) {
        alert(`${newName} is already added to phonebook`);
      } else {
        const noteObject = {
          name: newName,
          number: newNumber,
        };
        setPersons(persons.concat(noteObject));
        setNewName("");
        setNewNumber("");
      }
    });
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
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
