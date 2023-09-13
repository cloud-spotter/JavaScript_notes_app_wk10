class NotesView {
    constructor(model) {
        this.model = model;
        this.mainContainerEl = document.querySelector('#main-container');
    }

    displayNotes() {
        const notes = this.model.getNotes()
        notes.forEach(note => {
            const noteDiv = document.createElement('div');
            // Add each note to a new dynamically created element (see task description)
            noteDiv.textContent = note;
            // Set a new HTML class for this element
            noteDiv.className = 'note'; 
            this.mainContainerEl.append(noteDiv);
        })
    }
}

module.exports = NotesView;