const NotesModel = require('./notesModel.js');
describe('NotesModel', () => {
    const notesModel = new NotesModel();
    
    it('#getNotes returns an empty list', () => {
        expect(notesModel.getNotes()).toEqual([]);
    });
    
    it('#addNote buy milk and go to the gym displays when #getNotes is called', () => {
        notesModel.addNote('Buy milk');
        notesModel.addNote('Go to the gym');
        expect(notesModel.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
    });

    it('#reset sets this.items back to an empty array', () => {
        notesModel.reset();
        expect(notesModel.getNotes()).toEqual([]);
    })
})