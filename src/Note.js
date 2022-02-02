import React from "react";

const Note = (props) => {
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editId = props.note.id;
    props.onType(editId, "title", updatedValue);
  };
  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editId = props.note.id;
    props.onType(editId, "description", updatedValue);
  };

  const deleteNote = () => {
    props.removeNote(props.note.id);
  };

  return (
    <li className="note">
      <input
        type="text"
        placeholder="Title"
        className="note__title"
        value={props.note.title}
        onChange={updateTitle}
      />
      <textarea
        placeholder="Description..."
        className="note__description"
        value={props.note.description}
        onChange={updateDescription}
      />
      <span onClick={deleteNote} className="note__delete">
        X
      </span>
    </li>
  );
};

export default Note;
