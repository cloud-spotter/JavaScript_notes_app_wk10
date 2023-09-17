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
        setNotes(notes) {
          this.items = notes;
        }
      };
      module.exports = NotesModel2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
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
        // Not actually used/implemented:
        // clearView() {
        //     this.addNoteInput.value = ""; 
        // }           
        addNewNote(newNote) {
          this.model.addNote(newNote);
          this.displayNotes();
        }
        // Fetch notes from API and update view by displaying them
        async displayNotesFromApi() {
          await this.client.loadNotes((notes) => {
            this.model.setNotes(notes);
            this.displayNotes();
          });
        }
      };
      module.exports = NotesView2;
    }
  });

  // notesClient.js
  var require_notesClient = __commonJS({
    "notesClient.js"(exports, module) {
      var NotesClient2 = class {
        loadNotes(callback) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
      };
      module.exports = NotesClient2;
    }
  });

  // index.js
  console.log("The notes app is running");
  var NotesModel = require_notesModel();
  var NotesView = require_notesView();
  var NotesClient = require_notesClient();
  var client = new NotesClient();
  var model = new NotesModel();
  var view = new NotesView(model, client);
  view.displayNotesFromApi();
  console.log("The notes app is working!");
})();
