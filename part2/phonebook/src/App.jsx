import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNumber = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
    };
    const person = persons.find((p) => {
      return p.name === newName;
    });

    if (person) {
      alert(`${person.name} is alreay added to the phonebook.`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
    }
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" onClick={addNumber}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person, key) => {
        return <p key={key}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
