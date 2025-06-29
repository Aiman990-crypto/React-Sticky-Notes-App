import React, { useState, useEffect } from 'react';
import NoteInput from './components/NoteInput';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Save notes to localStorage on change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="App">
      <h1>🗒️ Sticky Notes</h1>
      <NoteInput addNote={addNote} />
      <NotesList notes={notes} deleteNote={deleteNote} />
    </div>
  );
}

export default App;
