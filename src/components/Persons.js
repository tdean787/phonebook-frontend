import React from "react";

const Persons = ({ person, deletePerson }) => {
  return (
    <div>
      <p>
        {person.name} - {person.number}{" "}
        <button onClick={() => deletePerson(person.id, person.name)}>
          {" "}
          Delete{" "}
        </button>
      </p>
    </div>
  );
};

export default Persons;
