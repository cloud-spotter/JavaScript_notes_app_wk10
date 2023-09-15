class NotesView {
    constructor(model) {
        this.model = model;
        this.mainContainerEl = document.querySelector('#main-container');
        this.addNoteInput = document.querySelector('#note-input');
        // add event listener for new add note button (event: click)
        document.querySelector('#add-note-button').addEventListener('click', () => {
            const newNote = document.querySelector('#note-input').value;
            this.addNewNote(newNote);
            this.addNoteInput.value = "";
        });
    }

    displayNotes() {
        // Remove all previous notes
        document.querySelectorAll('.note').forEach(element => {
            element.remove()});
        
        const notes = this.model.getNotes();
        
        // For each note, create and append a new element on the main container
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            // Add each note to a new dynamically created element (see task description)
            noteElement.textContent = note;
            // Set a new HTML class for this element
            noteElement.className = 'note'; 
            this.mainContainerEl.append(noteElement);
            })
        }
    
    clearView() {
        // Remember, this is just clearing the web browser view, not your actual data
        this.addNoteInput.value = ""; 
    }

    addNewNote(newNote) {
        //this.clearView();
        this.model.addNote(newNote);
        this.displayNotes();
    }
}

module.exports = NotesView;