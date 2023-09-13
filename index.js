const NotesModel = require("./notesModel");
const NotesView = require('./notesView');

const model = new NotesModel();
const view = new NotesView(model);

console.log('The notes app is running');
console.log(model.getNotes());

/* Check that the new method works in the browser,
as well as passing the Jest tests with mocking */
model.addNote('This is an example note')
model.addNote("Here's another note!")
view.displayNotes();