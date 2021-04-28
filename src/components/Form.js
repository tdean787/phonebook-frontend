import React from "react";

const Form = (props) => {
  return (
    <div>
      <h3>Add Person Form</h3>
      <form onSubmit={props.addPerson}>
        <div>
          Name: <input onChange={props.personChange} />
        </div>
        <div>
          Phone: <input onChange={props.phoneChange} />
        </div>
        <div>
          <button type="submit"> Add Person </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
