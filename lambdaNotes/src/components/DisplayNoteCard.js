import React from "react";
import { Link } from "react-router-dom";



const DisplayNoteCard = props => {


 const handleClone = () => {


   const clonedNote ={
     "title":props.note.title,
     "textBody":props.note.textBody
   }
  
  props.submitAdd(clonedNote);


  }


  return (
    <div className="displayNoteCard">
      <Link to={`/Notes/${props.note.id}`} style={{ textDecoration: "none" }}>
        <h3> {props.note.title} </h3>
        <p> {props.note.textBody}</p>
      </Link>

      <button onClick={handleClone}>Clone</button>

    </div>
  );
};

export default DisplayNoteCard;
