import React from "react";
import { NavLink } from "react-router-dom";

const DisplayNote = props => {
  let note
  console.log("displayNote init  params.id = ", props.match.params.id);
  if (props.match.params.id) {
   let noteArr = props.notes.filter(item => item.id == props.match.params.id);
    console.log("displayNote  note = ", note);
    note = noteArr[0];
    console.log("displayNote  note = ", note);
  } else {
    alert("wrong note ID");
    props.history.push("/");
  }

  const displayItem = note ? (
    <div>
      <h3> {note.title} </h3>
      <p> {note.id} </p>
      <p> {note.textBody} </p>
    </div>
  ) : (
    <h3> Loading... </h3>
  );

  return (
    <div className="displayNote">
      <nav className="displayNoteNav">
        <NavLink to={`/Notes/${props.match.params.id}/edit`}> Edit </NavLink>
        <NavLink to={`/Notes/${props.match.params.id}/delete`}>Delete</NavLink>
      </nav>

      {displayItem}
    </div>
  );
};

export default DisplayNote;
