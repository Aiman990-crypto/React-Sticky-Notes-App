import React from 'react';
import NoteCard from './NoteCard';

function NotesList({ notes, deleteNote }) {
  return (
    <div className="notes-grid">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} deleteNote={deleteNote} />
      ))}
    </div>
  );
}

export default NotesList;
