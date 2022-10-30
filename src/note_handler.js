const electron = require("electron");
const { ipcRenderer } = electron;
const noteContainer = document.querySelector(".container");
const deleteButton = document.querySelector(".delete-btn");

ipcRenderer.on("note:add", function (e, note) {
  const { title, content } = note;
  const section = document.createElement("section");
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const divButton = document.createElement("div");
  const button = `
              <img
                class="button"
                src="static/buttons/see_icon.png"
                alt="see this note"
              />
              <img
                class="button delete-btn"
                src="static/buttons/delete_icon.png"
                alt="delete this note"
              />
  `;

  section.className = "note-display";
  div.className = "note";
  h3.className = "note-title";
  p.className = "note-content";
  divButton.className = "buttons";

  const noteTitle = document.createTextNode(title);
  const noteContent = document.createTextNode(content);
  h3.appendChild(noteTitle);
  p.appendChild(noteContent);
  div.appendChild(h3);
  div.appendChild(p);
  divButton.innerHTML = button;
  div.appendChild(divButton);

  section.appendChild(div);
  noteContainer.appendChild(section);

  divButton.addEventListener("dblclick", removeNote2);
});

ipcRenderer.on("note:clear", function () {
  section.innerHTML = "";
});

deleteButton.addEventListener("dblclick", removeNote);

function removeNote(e) {
  console.log(e.target.parentElement);
  e.target.parentElement.parentElement.parentElement.remove();
}

function removeNote2(e) {
  console.log("REMOVE NOTE 2 Function");
  const noteDisplay = e.target.parentElement.parentElement;
  noteDisplay.remove();

  // If no notes
  const container = document.querySelector(".container");
  if (container.childElementCount == 1) {
    const empty = document.createElement("p");
    empty.className = "note-title";
    const text = document.createTextNode(
      "Try adding new notes by going to File > New Note or pressing CTRL + N"
    );
    empty.appendChild(text);
    container.lastChild.appendChild(empty);
  }
}
