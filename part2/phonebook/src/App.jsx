import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 1001001 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const addNumber = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const person = persons.find((p) => {
      return p.name === newName;
    });

    if (person) {
      alert(`${person.name} is alreay added to the phonebook.`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addNumber}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>

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

export default App;
