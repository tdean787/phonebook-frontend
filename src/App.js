import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import personService from "./services/persons";
import Form from "./components/Form";
import Notification from "./components/Notification";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: "hmmm...?", id: "Taylor", phone: "123-456-7890" },
  ]);
  const [newPerson, setNewName] = useState([]);
  const [errorMessage, setErrorMessage] = useState("some error");
  const [notificationStyle, setNotificationStyle] = useState("null");

  useEffect(() => {
    personService.getAll().then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const checkName = persons.map((person) => person.name);
    const personObj = {
      name: newPerson.name,
      id: Math.floor(Math.random() * 999999),
      phone: newPerson.phone,
    };

    let personResponse = undefined;

    if (checkName.includes(newPerson.name)) {
      if (
        window.confirm(`${newPerson.name} already in phonebook. Update number?`)
      ) {
        console.log(persons);
        let personMatch = persons.find(
          (person) => person.name === newPerson.name
        );
        console.log(personMatch);

        console.log(personMatch[0].id);

        console.log(personObj);
        axios
          .put(`/api/phonebook/${personMatch[0].id}`, personObj)
          .then((response) => {
            personResponse = response.data;
            axios.get("/api/phonebook").then((res) => setPersons(res.data));
          })
          .catch(() => {
            setErrorMessage("The person was already deleted from server");
            setNotificationStyle("confirmed");
            setTimeout(() => {
              setErrorMessage(null);
            }, 2000);
          });
        setErrorMessage("Number was updated");
        setNotificationStyle("confirmed");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }

      return;
      //below condition will run if person does not match
    } else {
      axios.post("/api/phonebook", personObj).then((response) => {
        setPersons(persons.concat(personObj));
        setNewName("");
        setErrorMessage("Person Added");
        setNotificationStyle("confirmed");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
    }
  };

  const personChange = (event) => {
    setNewName({ ...newPerson, name: event.target.value });
  };

  const phoneChange = (event) => {
    setNewName({ ...newPerson, phone: event.target.value });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete?`)) {
      axios.delete(`/api/phonebook/${id}`).then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== id));
      });
      setErrorMessage(`${name} was deleted`);
      setNotificationStyle("confirmed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    } else {
      return;
    }
  };

  return (
    <div>
      <Form
        addPerson={addPerson}
        personChange={personChange}
        phoneChange={phoneChange}
      />
      <Notification
        notificationStyle={notificationStyle}
        message={errorMessage}
      />
      {persons.map((person) => (
        <Persons person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
}

export default App;
