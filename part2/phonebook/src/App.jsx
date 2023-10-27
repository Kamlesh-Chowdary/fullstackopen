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
    const numberObject = {
      name: newName,
      number: newNumber,
    };

    const checkName = persons.find(
      (props) => props.name.toLowerCase() === numberObject.name.toLowerCase()
    );
    const changedPerson = { ...checkName, number: newNumber };

    if (checkName && checkName.number === numberObject.number) {
      window.alert(`${newName} is already added to phonebook`);
    } else if (checkName && checkName.number !== numberObject.number) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        numberService
          .update(checkName.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((n) => (n.id !== checkName.id ? n : returnedPerson))
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      numberService.create(numberObject).then((returnedNumbers) => {
        setPersons(persons.concat(returnedNumbers));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  useEffect(() => {
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
    const response = confirm(`Delete ${e.target.name}`);
    if (response) numberService.deleteNumber(e.target.id);
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
