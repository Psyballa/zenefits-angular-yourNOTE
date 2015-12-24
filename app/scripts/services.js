'use strict';

angular.module('justintelmoNoteApp')
  .service('noteFactory', function() {
    this.notes = JSON.parse(localStorage.getItem('telmoapp.notes'));

    this.getNotes = function getNotes() {
      var notes = JSON.parse(localStorage.getItem('telmoapp.notes'));
      return (notes) ? notes : [];
    };

    this.getNote = function getNote(id) {
      return this.getNotes()[id];
    };

    this.setNotes = function setNotes(notes) {
      this.notes = notes;
      localStorage.setItem('telmoapp.notes', JSON.stringify(notes));
    };

    this.addNote = function addNote(note) {
      // Add a date and id to whatever note is passed in
      if (!this.notes) {
        this.setNotes([]);
      }
      if (!note.title) {
        note.title = "Untitled";
      }
      note.date = Date.now();
      note.id = this.notes.length;
      this.notes.push(note);

      // Save off a copy of our notes once we have pushed a new note
      this.setNotes(this.notes);
    }

    this.updateNote = function updateNote(note) {
      if (!note.title) {
        note.title = "Untitled";
      }
      note.date = Date.now();
      // O(1) to access entry in array
      this.notes[note.id] = note;
      this.setNotes(this.notes);
    }

  });
