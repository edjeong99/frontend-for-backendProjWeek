import React, { Component } from "react";

import { connect } from "react-redux";
import { Route, withRouter, NavLink } from "react-router-dom";
import { authenticate } from "../util";
import {
  DisplayNoteList,
  DisplayNote,
  AddNoteForm,
  DeleteNote,
  EditNote,
  Register,
  Login,
  Logout
} from "../components/";
import {
  fetchNotes,
  addNote,
  deleteNote,
  editNote,
  setSearchBoolean
} from "../actions";

// this is view component that manage main display area
// it has most of logics and also manage all route component

class DisplayNotesView extends Component {
  componentDidMount() {
    if (authenticate()) {
      this.props.fetchNotes();
    }
  }

  submitAdd = note => {
    this.props.addNote(note);
  };

  submitEdit = editedNote => {
    this.props.editNote(editedNote);
  };

  submitdelete = deleteId => {
    this.props.deleteNote(deleteId);
  };

  handleSearchBoolean = bool => {
    this.props.setSearchBoolean(bool);
  };

  handleLogin = () =>{
    this.props.fetchNotes();
  }

  render() {
    return (
      <div className="displayNotesView">
        <nav>
          <NavLink to="/">Home </NavLink>
          <NavLink to="/login"> Login </NavLink>
          <NavLink to="/register"> Register </NavLink>
          <NavLink to="/logout"> Logout </NavLink>

          {/* <NavLink to="/logout"> Logout </NavLink> */}
        </nav>

        <Route path="/register" component={Register} />
        <Route
          path="/login"
          render={props => <Login {...props} handleLogin={this.handleLogin} />}
        />
        <Route path="/logout" component={Logout} />

        <Route
          exact
          path="/"
          render={props => (
            <DisplayNoteList
              {...props}
              notes={this.props.notes}
              isSearched={this.props.isSearched}
              handleSearchBoolean={this.handleSearchBoolean}
              submitAdd={this.submitAdd}
            />
          )}
        />

        <Route
          exact
          path="/Notes/:id/edit"
          render={props => (
            <EditNote
              {...props}
              notes={this.props.notes}
              submitEdit={this.submitEdit}
            />
          )}
        />

        <Route
          path="/Notes/:id"
          render={props => <DisplayNote {...props} notes={this.props.notes} />}
        />

        <Route
          exact
          path="/Notes/:id/delete"
          render={props => (
            <DeleteNote
              {...props}
              notes={this.props.notes}
              submitdelete={this.submitdelete}
            />
          )}
        />

        <Route
          exact
          path="/addNote"
          render={props => (
            <AddNoteForm {...props} submitAdd={this.submitAdd} />
          )}
        />
      </div>
    );
  }
}

// gets the state and map them to props
const mapStateToProps = ({ fetching, notes, isSearched }) => {
  return { notes, fetching, isSearched };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchNotes, addNote, deleteNote, editNote, setSearchBoolean }
  )(DisplayNotesView)
);
