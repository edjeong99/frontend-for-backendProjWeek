import DisplayNoteCard from "./DisplayNoteCard";
import React, { Component } from "react";
import SearchNote from "./SearchNote";
import { searchFunc, authenticate } from "../util";
import { serverSearchFunc } from "../actions";

// DisplayNoteList component is presentational component that manage display of list of note
class DisplayNoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    query :"",
      isSearched: false,
     
    };
    this.displayedNotes = [];
  }

  componentDidMount() {

if(authenticate()){
    this.setState ({
      displayedNotes : this.props.notes
    })
  }
  else
    this.props.history.push('/login');
  }
  // to see if "View Your Notes" is clicked.  I use the props.isSearched boolean.
  // Toggle isSearched in redux state to decide whether all notes should be displayed, or
  // notes with search result should be displayed
  // componentDidUpdate checks if isSearched has changed.
  componentDidUpdate(prevProps) {
    if (prevProps.isSearched !== this.props.isSearched) {
      this.setState({
        isSearched: this.props.isSearched,
  
      });
    }

    if(!authenticate()){
        this.props.history.push('/login');
    }
  }

  handleInputChange = e => {

    this.setState({
      [e.target.name]: e.target.value,
      isSearched: true
    });
    this.props.handleSearchBoolean(true);
  }




   render() {
   
    if (this.state.isSearched){

    // using server side search func
    // below has bug.  displayedNotes won't get updated in time so older version of 
    // displayedNotes will be used.
    // either use state to trigger render when update is complete
    // or put render inside of "then"    
    serverSearchFunc(this.state.query).then(notes => {
      console.log('in DisplayNoteList Func  then notes = ', notes);

      this.displayedNotes = notes

    })
    
    console.log('in DisplayNoteList Func  displayNotes = ', this.displayedNotes);
  
    // using client side search func
      // this.displayedNotes = searchFunc(this.state.query, this.props.notes);
  }
    
    else this.displayedNotes = [...this.props.notes];

    return (
      <div className="NoteListContainer">
        <SearchNote
          notes={this.state.notes}
          query={this.state.query}
          handleInputChange={this.handleInputChange}
          onSubmit={this.handleOnSubmit}
        />
        <h3> Your Notes : </h3>
        <div className="noteList">
          {this.displayedNotes.map(note => (
            <DisplayNoteCard key={note.id} note={note} 
            submitAdd={this.props.submitAdd}/>
          ))}
        </div>
      </div>
    );
  }
}

export default DisplayNoteList;
