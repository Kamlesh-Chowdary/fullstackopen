import { useState, useEffect } from "react";
import Numbers from "./Services/Numbers";
import Header from "../Components/Header";
import Filter from "../Components/Filter";
import PersonForm from "../Components/PersonForm";
import Persons from "../Components/Persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setNewFilter] = useState("");

  useEffect(() => {
    Numbers.getAll()
      .then((initialData) => {
        setPersons(initialData);
      })
      .catch((error) => {
        console.log("ERROR");
        return error;
      });
  });

  const clearForm = () => {
    setNewName("");
    setNewNumber("");
  };

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
      Numbers.create(personObject)
        .then((returnedNumber) => {
          setPersons(persons.concat(returnedNumber));
        })
        .catch((error) => {
          return error;
        });
      clearForm();
    }
  };
  const byFilterField = (p) =>
    p.name.toLowerCase().includes(filterName.toLowerCase());

  const personsToShow = filterName ? persons.filter(byFilterField) : persons;

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };
  return (
    <div>
      <Header text="Phonebook" />
      <Filter
        text="Filter shown with"
        value={filterName}
        onChange={handleFilterChange}
      />
      <PersonForm
        addNumber={addNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Header text="Numbers" />
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
