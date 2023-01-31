import React from "react";
import Note from "./Note";

const NotesList = (props) => {
  const keepSearchMatches = (note) => note.doesMatchSearch;
  const searchMatches = props.notes.filter(keepSearchMatches);

  const renderNote = (note) => (
    <Note
      note={note}
      onType={props.onType}
      key={note.id}
      removeNote={props.removeNote}
    />
  );
  const noteElements = searchMatches.map(renderNote);

  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
