class NotesModel {
    constructor() {
        this.items = [];
    }
    getNotes() {
        return this.items;
    }
    
    addNote(item) {
        this.items.push(item);
    }

    reset() {
        this.items = [];
    }

    setNotes(notes) {
        this.items = notes;
    }
}
module.exports = NotesModel;