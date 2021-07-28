import React from "react";
import ReactMarkdown from "react-markdown";
import { NoteTypes } from "../App";

interface MainProps {
  activeNote: any;
  onUpdateNote: (updatedNote: NoteTypes) => void;
}

const Main: React.FC<MainProps> = ({ activeNote, onUpdateNote }) => {
  const onEditField = (key: string, value: string) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      date: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No active note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="tittle"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="write your note here"
          value={activeNote.preview}
          onChange={(e) => onEditField("preview", e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h2 className="preview-title"> {activeNote.title} </h2>
        <ReactMarkdown className="markdown-preview">
          {activeNote.preview}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
