(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
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
      };
      module.exports = NotesModel2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(model2) {
          this.model = model2;
          this.mainContainerEl = document.querySelector("#main-container");
          this.addNoteInput = document.querySelector("#note-input");
          document.querySelector("#add-note-button").addEventListener("click", () => {
            const newNote = document.querySelector("#note-input").value;
            this.addNewNote(newNote);
            this.addNoteInput.value = "";
          });
        }
        displayNotes() {
          document.querySelectorAll(".note").forEach((element) => {
            element.remove();
          });
          const notes = this.model.getNotes();
          notes.forEach((note) => {
            const noteElement = document.createElement("div");
            noteElement.textContent = note;
            noteElement.className = "note";
            this.mainContainerEl.append(noteElement);
          });
        }
        clearView() {
          this.addNoteInput.value = "";
        }
        addNewNote(newNote) {
          this.model.addNote(newNote);
          this.displayNotes();
        }
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  var NotesModel = require_notesModel();
  var NotesView = require_notesView();
  var model = new NotesModel();
  var view = new NotesView(model);
  console.log("The notes app is running");
  console.log(model.getNotes());
  model.addNote("This is an example note");
  model.addNote("Here's another note!");
  view.displayNotes();
})();
