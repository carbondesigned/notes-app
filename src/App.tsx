import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { GlobalStyle } from "./app.styles";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

// Contexts
import { NotesContext } from "./contexts/NotesContext";

export interface NoteTypes {
  activeNote?: boolean;
  id?: any;
  title?: any;
  preview?: any;
  key?: string;
  date: number;
}

export interface NotesListType {
  list: NoteTypes;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteTypes[]>(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote: NoteTypes = {
      id: uuid(),
      title: "Untitled",
      preview: "",
      date: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const onDeleteNote = (idToDelete: string) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => notes.find((note) => note.id === activeNote);

  const onUpdateNote = (updatedNote: NoteTypes) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <NotesContext.Provider
          value={{
            notes,
            setNotes,
            onAddNote,
            onDeleteNote,
            activeNote,
            setActiveNote,
          }}
        >
          <Sidebar />
          <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
        </NotesContext.Provider>
      </div>
    </>
  );
};

export default App;
