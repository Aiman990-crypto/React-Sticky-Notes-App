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
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;       // listen only once
    recognition.interimResults = false;   // only get final result

    console.log('Recognition started...');
    recognition.start();

    // Fires when recognition starts
    recognition.onstart = () => {
      console.log('Microphone is listening...');
    };

    // Fires when recognition gets a result
    recognition.onresult = (event) => {
      console.log('Recognition result event:', event);
      const transcript = event.results[0][0].transcript;
      console.log('Transcript:', transcript);
      setInput(transcript);
    };

    // Fires on error
    recognition.onerror = (event) => {
      console.error('Recognition error:', event.error);
      alert('Error during speech recognition: ' + event.error);
    };

    // Fires when recognition stops
    recognition.onend = () => {
      console.log('Recognition ended.');
    };
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your note or speak..."
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
