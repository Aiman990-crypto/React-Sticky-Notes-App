import React, { useState } from 'react';

function NoteInput({ addNote }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addNote(input);
    setInput('');
  };

  const startRecording = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your note..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button type="submit">Add Note</button>
        <button type="button" onClick={startRecording}>🎙️ Speak</button>
      </div>
    </form>
  );
}

export default NoteInput;
