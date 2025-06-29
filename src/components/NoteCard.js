import React from 'react';

function NoteCard({ note, deleteNote }) {
  return (
    <div className="note">
      <p>{note.text}</p>
      <button onClick={() => deleteNote(note.id)}>❌</button>
    </div>
  );
}

export default NoteCard;
