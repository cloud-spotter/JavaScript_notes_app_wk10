/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');

describe('Page notesView', () => {
    beforeEach(() => {
        /* Establish DOM structure for tests and initialise
        HTML document body to mirror actual HTML file, to
        behave as if interacting with actual HTML page */
        document.body.innerHTML = fs.readFileSync('./index.html');
    });

    it('displays a list of notes, each in their own div element', () => {
        // Establish model and view
        const model = new NotesModel();
        const view = new NotesView(model); // Dependency injection
        // Add notes
        model.addNote('Chocolate frogs');
        model.addNote('Sherbert lemons');
        //Display notes on the page
        view.displayNotes();
        // Assert the page has been modified
        expect(document.querySelectorAll('div.note').length).toBe(2);
    });

    it(`inputs a new note title, clicks the button
    and displays the new note`, () => {
        // Arrange: establish model and view
        const model = new NotesModel();
        const view = new NotesView(model);
        // set up constants for input & add note button elements
        const inputElement = document.querySelector('#note-input');
        const buttonElement = document.querySelector('#add-note-button');
        // Act: take (set) user input & simulate 'add note' button click
        inputElement.value = 'Test note';
        buttonElement.click();
        // Assert: note value appears on page
        expect(document.querySelectorAll('div.note').length).toEqual(1);
        expect(document.querySelectorAll('div.note')[0].textContent).toEqual('Test note');
    });

    it('clears previous notes before display new note', () => {
        // Arrange: establish model and view
        const model = new NotesModel();
        const view = new NotesView(model);
        // Act
        model.addNote('One');
        model.addNote('Two');
        view.displayNotes();
        view.displayNotes();
        // Assert
        expect(document.querySelectorAll('div.note').length).toEqual(2);
    });
});
