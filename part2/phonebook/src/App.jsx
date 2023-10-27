import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Filter from "../Components/Filter";
import PersonForm from "../Components/PersonForm";
import Persons from "../Components/Persons";
import numberService from "./Services/Numbers";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addNumber = (e) => {
    e.preventDefault();
    persons.map((ele) => {
      if (ele.name === newName) {
        alert(`${newName} is already added to phonebook`);
      }
    });
    const numberObject = {
      name: newName,
      number: newNumber,
    };
    numberService.create(numberObject).then((returnedNumbers) => {
      setPersons(persons.concat(returnedNumbers));
      setNewName("");
      setNewNumber("");
    });
  };

  useEffect((e) => {
    numberService.getALL().then((initialNumbers) => {
      setPersons(initialNumbers);
    });
  }, []);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleDelete = (e) => {
    confirm(`Delete ${e.target.name}`);
    numberService.deleteNumber(e.target.id);
  };
  useEffect(() => {
    numberService.getALL().then((remainingNumbers) => {
      setPersons(remainingNumbers);
    });
  });
  return (
    <div>
      <Header text="Phonebook" />
      <Filter />
      <Header text="add a new" />
      <PersonForm
        addNumber={addNumber}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <Header text="Numbers" />
      <Persons persons={persons} handleClick={handleDelete} />
    </div>
  );
};

export default App;
