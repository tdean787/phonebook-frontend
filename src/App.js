import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import personService from "./services/persons";
import Form from "./components/Form";
import Notification from "./components/Notification";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: "missing api", id: "Taylor", phone: "123-456-7890" },
  ]);
  const [newPerson, setNewName] = useState({
    name: undefined,
    number: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState("error");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const checkName = persons.map((person) => person.name);
    const personObj = {
      name: newPerson.name,
      number: newPerson.phone,
    };

    if (!newPerson.name) {
      console.log("no name");
      alert("You need to enter a name");
      return;
    }
    if (checkName.includes(newPerson.name)) {
      if (
        window.confirm(`${newPerson.name} already in phonebook. Update number?`)
      ) {
        let personMatch = persons.find(
          (person) => person.name === newPerson.name
        );
        // console.log(personMatch);
        axios
          .put(`/api/phonebook/${personMatch.id}`, personObj)
          .then((response) => {
            console.log(response.data);
            axios.get("/api/phonebook").then((res) => setPersons(res.data));
          })
          .catch(() => {
            setErrorMessage(`${personObj.name} had their number updated`);
            setNotificationStyle("confirmed");
            setTimeout(() => {
              setErrorMessage(null);
            }, 2000);
          });
        setErrorMessage(
          `Number of ${personObj.name} was updated to ${personObj.number}`
        );
        setNotificationStyle("confirmed");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }

      return;
      //below condition will run if no match and add person to database
    } else {
      axios.post("/api/phonebook", personObj).then((response) => {
        setPersons(persons.concat(personObj));

        setNewName({
          name: "",
          number: "",
        });
        setErrorMessage("Person Added");
        setNotificationStyle("confirmed");
        // debugger;
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
    setNewName({ ...newPerson, number: event.target.value });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete?`)) {
      axios
        .delete(`/api/phonebook/${id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      personService.getAll().then((response) => setPersons(response.data));

      setErrorMessage(`${name} was deleted. See ya, ${name}!`);
      setNotificationStyle("deleted");

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
        newPerson={newPerson}
        setNewName={setNewName}
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
