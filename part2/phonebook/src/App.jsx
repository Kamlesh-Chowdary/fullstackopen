import { useEffect, useState } from "react";
import "./index.css";
import Header from "../Components/Header";
import Notification from "../Components/Notification";
import Filter from "../Components/Filter";
import PersonForm from "../Components/PersonForm";
import Persons from "../Components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [filterName, setNewFilter] = useState("");
  useEffect(() => {
    numberService.getALL().then((initialNumbers) => {
      setPersons(initialNumbers);
    });
  }, []);
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
            setMessage(`${checkName.name}'s number has changed`);
          })
          .catch((error) => {
            setMessage(
              `Information of ${checkName.name} has already been removed from the server`
            );
            setTimeout(() => setMessage(null), 3000);
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      setMessage(`Added ${newName}`);
      setTimeout(() => setMessage(null), 3000);
      numberService.create(numberObject).then((returnedNumbers) => {
        setPersons(persons.concat(returnedNumbers));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const handleDelete = (e) => {
    const response = confirm(`Delete ${e.target.name}`);

    if (response)
      numberService.deleteNumber(e.target.id).then((remainingNumbers) => {
        console.log(remainingNumbers);
        setPersons(remainingNumbers);
      });
  };
  const byFilterField = (p) => {
    p.name.toLowerCase().includes(filterName.toLowerCase());
  };

  const personsToShow = filterName ? persons.filter(byFilterField) : persons;
  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={message} />
      <Filter
        text="Filter shown with"
        value={filterName}
        onChange={handleFilterChange}
      />
      <Header text="add a new" />
      <PersonForm
        addNumber={addNumber}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <Header text="Numbers" />
      <Persons persons={personsToShow} handleClick={handleDelete} />
    </div>
  );
};

export default App;
