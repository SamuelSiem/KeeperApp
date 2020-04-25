import React from "react";
import axios from "axios";

function CreateArea(props) {
  const [newNote, addNote] = React.useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;

    addNote(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(newNote);
    
    addNote({ title: "", content: "" });
  }

  return (
    <div>
      <form>
        <input
          value={newNote.title}
          onChange={handleChange}
          name="title"
          placeholder="Title"
        />
        <textarea
          value={newNote.content}
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
