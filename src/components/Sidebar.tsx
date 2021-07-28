import React, { useContext } from "react";
import { NoteTypes } from "../App";
import { NotesContext } from "../contexts/NotesContext";
import { Note } from "./Note";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { notes, onAddNote } = useContext(NotesContext);

  const sortedNotes = notes.sort((a: any, b: any) => b.date - a.date);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note: NoteTypes, key: string) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            preview={note.preview}
            date={note.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
