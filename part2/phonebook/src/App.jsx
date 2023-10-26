import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Filter from "../Components/Filter";
import PersonForm from "../Components/PersonForm";
import Persons from "../Components/Persons";
const App = () => {
  const [persons, setPersons] = useState([]);
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

  useEffect((e) => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
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
      <Persons persons={persons} />
    </div>
  );
};

export default App;
