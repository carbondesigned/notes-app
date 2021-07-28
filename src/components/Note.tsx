import React, { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";

interface NoteProps {
  title: string;
  id: string;
  preview: string;
  date: number;
}

export const Note: React.FC<NoteProps> = ({ title, id, preview, date }) => {
  const { onDeleteNote, activeNote, setActiveNote } = useContext(NotesContext);
  return (
    <div
      id={id}
      onClick={() => setActiveNote(id)}
      className={`app-sidebar-note ${id === activeNote && "active"}`}
    >
      <div className="sidebar-note-title">
        <h4>{title}</h4>
        <button onClick={() => onDeleteNote(id)}>Delete</button>
      </div>
      <p> {preview && preview.substr(0, 100) + "..."} </p>
      <div className="app-sidebar-note-date">
        {new Date(date).toLocaleDateString("en-CA", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};
