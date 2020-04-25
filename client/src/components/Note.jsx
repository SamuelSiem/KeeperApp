import React from "react";

function Note(props) {
  function handleDeleteButton() {
    props.onDelete({
      title: props.title,
      content: props.content
    });
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDeleteButton}>DELETE</button>
    </div>
  );
}

export default Note;
