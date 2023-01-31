import React, { Component } from "react";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import noteColors from "./noteColors";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true,
        backgroundColor: "lightyellow"
      }
    ],

    searchText: "search"
  };

  addNote = () => {
    //random color note
    const randomIndex = Math.floor(Math.random() * noteColors.length);
    const randomColor = noteColors[randomIndex];
    //create a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
      backgroundColor: randomColor
    };

    //add the new note to existing notes array in State
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
    //you can also just write
    //this.setSate ({ notes: [newNote,...this.state.notes]})
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    //editMeId == id of the note that is edited
    //updatedKey == title or description field
    //updatedValue == value of title or description
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
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
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  removeNote = (NoteId) => {
    const notIdMatch = (note) => note.id !== NoteId;
    const newNotes = this.state.notes.filter(notIdMatch);
    this.setState({ notes: newNotes });
  };
  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }
  componentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    console.log(stringifiedNotes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  render() {
    return (
      <div>
        <Header
          addNote={this.addNote}
          onSearch={this.onSearch}
          searchText={this.state.searchText}
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
