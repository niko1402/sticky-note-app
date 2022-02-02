import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    const addNewNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    // add the new note to the existing notes array in State
    const addNewNotes = [addNewNote, ...this.state.notes];
    this.setState({ notes: addNewNotes });
  };

  removeNote = (noteId) => {
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: newNotes });
  };

  onType = (editId, updatedKey, updatedValue) => {
    // editId == id of the note that's edited
    // updatedKey == title or description field
    // updatedValue == value entered in title or description
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const doesMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = doesMatch;
        // doesMatch using || (meaning OR) which is shorthand for :
        // if (titleMatch) {
        // note.doesMatchSearch = true;
        // } else if (descriptionMatch) {
        // note.doesMatchSearch = true;
        // } else {
        // note.doesMatchSearch = false;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  componentDidUpdate() {
    const savedNotesString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotesString);
  }
  componentDidMount() {
    const savedNotesString = localStorage.getItem("savedNotes");
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      this.setState({ notes: savedNotes });
    }
  }
  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          searchText={this.state.searchText}
          addNote={this.addNote}
        />
        <NotesList
          onType={this.onType}
          notes={this.state.notes}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;
