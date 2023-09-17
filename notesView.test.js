/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');

jest.mock('./NotesClient'); // Mock the NotesClient module

beforeEach(() => {
    /* Establish DOM structure for tests and initialise
    HTML document body to mirror actual HTML file, to
    behave as if interacting with actual HTML page */
    document.body.innerHTML = fs.readFileSync('./index.html');
    jest.clearAllMocks(); // Clear all mocks
});

describe('NotesView', () => {
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

describe('displayNotesFromAPI', () => {
    let model, client, view; // Declare here outside beforeEach but inside test suite
    
    // Arrange (now with mock client dependecy injection too)
    beforeEach(() => {
        // Arrange: initialise model, view & client
        model = new NotesModel();
        client = new NotesClient(); 
        view = new NotesView(model, client); // Inject the mocked NotesClient
        NotesClient.mockClear()
    });
    
    it(`fetches the notes list from the client, 
    sets the notes list on the model
    and displays the notes list on the page`, async () => {
        
        /* Arrange: set up fake notes and 
        mock the client's loadNotes method to use them */
        const fakeNotes = ['fakenote1', 'fakenote2', 'fakenote3'];
        client.loadNotes.mockImplementationOnce(callback => {
            callback(fakeNotes);
        });
        // Act: fetch notes from API and update the view
        await view.displayNotesFromApi();

        // Assert: client.loadNotes was called
        expect(client.loadNotes).toHaveBeenCalled();

        // Assert: model now has the fake notes
        const addedNotes = model.getNotes(); // Act
        expect(addedNotes).toEqual(fakeNotes); // Assert

        // Assert: notes are displayed in the DOM
        expect(document.querySelectorAll('div.note').length).toEqual(fakeNotes.length);
        fakeNotes.forEach((note, index) => {
            expect(document.querySelectorAll('div.note')[index].textContent).toEqual(note);
        })
    });
});


