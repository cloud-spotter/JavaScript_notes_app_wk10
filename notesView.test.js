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
})