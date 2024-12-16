const fs = require('fs');
// const chalk = require('chalk');

const getNotes = () => {
  return 'Your notes...'
}

// Add note function
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes);
    console.log('New note added');
  } else {
    console.log('Note title taken');
  }
}

// Remove note function
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
      console.log('Note removed');
      saveNotes(notesToKeep);
    } else {
      console.log('No note found');
    }
}

// List note function
const listNotes = () => {
  const notes = loadNotes();

  console.log('Your notes');

  notes.forEach(note => {
    console.log(note.title);
  })
}

// Save note function
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

// Load note function
const loadNotes = () => {
  try {
      const dataBuffer = fs.readFileSync('notes.json');
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
  } catch (e) {
      return [];
  } 
}

// Read note function
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(note.title);
    console.log(note.body);
  } else {
    console.log('Note not found');
  }
}

// Edit note function
const editNote = (title, newBody) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    removeNote(title);
    addNote(note.title, newBody);
  } else {
    console.log('Note not found');
  }
}

// Exporting 
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
  editNote: editNote
};