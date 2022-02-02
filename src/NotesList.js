import React from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  const keepSearchMatches = (note) => note.doesMatchSearch;
  const searchMatch = props.notes.filter(keepSearchMatches);

  const renderNote = (note, index) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      removeNote={props.removeNote}
      index={index}
    />
  );
  const noteElements = searchMatch.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
