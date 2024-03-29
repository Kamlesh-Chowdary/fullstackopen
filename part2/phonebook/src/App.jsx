import { useState, useEffect } from "react";
import personService from "./Services/Numbers";
import Header from "../Components/Header";
import Filter from "../Components/Filter";
import PersonForm from "../Components/PersonForm";
import Persons from "../Components/Persons";
import Notification from "../Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setNewFilter] = useState("");
  const [notification, setNotification] = useState({ message: null });
  useEffect(() => {
    personService
      .getAll()
      .then((initialData) => {
        setPersons(initialData);
      })
      .catch((error) => {
        console.log("ERROR");
        return error;
      });
  }, []);

  const notifyWith = (message, type = "info") => {
    setTimeout(() => {
      setNotification({ message, type });
    }, 0);
    setTimeout(() => {
      setNotification({ message: null });
    }, 3000);
  };

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
      updatePerson(person);
    } else {
      personService
        .create(personObject)
        .then((returnedNumber) => {
          setPersons(persons.concat(returnedNumber));
        })
        .catch((error) => {
          notifyWith(error.response.data.error, "error");
        });
      notifyWith(`Added ${newName}`);
    }
    clearForm();
  };

  const deleteNumber = (person) => {
    const id = person.id;
    const confirm = window.confirm(`Delete ${person.name} from phonebook?`);
    if (confirm) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
      notifyWith(`number of ${person.name} is deleted!`);
    }
  };

  const updatePerson = (person) => {
    const ok = window.confirm(
      `${person.name} is alreay added to the phonebook, replace the old number with a new one?`
    );
    const updatedPerson = {
      ...person,
      number: newNumber,
    };
    if (ok) {
      personService
        .update(person.id, updatedPerson)
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : updatedPerson))
          );
          notifyWith(`Phonenumber of ${person.name} has been updated!`);
        })
        .catch((error) => {
          notifyWith(error.response.data.error, "error");
          setPersons(persons.filter((p) => p.id !== person.id));
        });
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
      <Notification message={notification} />
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
      <Header text="Numbers " />
      <Persons persons={personsToShow} deleteNumber={deleteNumber} />
    </div>
  );
};

export default App;
