import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // fetching data from server
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = { name: newName, number: newNumber };
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        personService.update(existingPerson.id, noteObject).then((returnedPerson) => {
          setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson)));
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      personService.create(noteObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  // fungsi untuk menghapus data person dari server berdasarkan id-nya
  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleFilter={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={addNote} valueName={newName} handleName={handleNameChange} valueNumber={newNumber} handleNumber={handleNumberChange} />
      <h2>Numbers</h2>
      {/* Displaying person */}
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
