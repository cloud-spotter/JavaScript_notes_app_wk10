console.log('The notes app is running');

const NotesModel = require("./notesModel");
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');

const client = new NotesClient();
const model = new NotesModel();
const view = new NotesView(model, client);

view.displayNotesFromApi();
console.log('The notes app is working!');


//console.log(model.getNotes());

/* Check that the new method works in the browser,
as well as passing the Jest tests with mocking */
// model.addNote('This is an example note')
// model.addNote("Here's another note!")
// view.displayNotes();