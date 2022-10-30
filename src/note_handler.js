const electron = require("electron");
const { ipcRenderer } = electron;
const section = document.querySelector("note-display");

ipcRenderer.on("title:add", function (e, title) {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");

  div.className = "note";
  h3.className = "note_title";

  const noteTitle = document.createTextNode(title);
  h3.appendChild(noteTitle);
  div.appendChild(h3);
  section.appendChild(div);
});

ipcRenderer.on("note:clear", function () {
  section.innerHTML = "";
});

section.addEventListener("dblclick", removeNote);

function removeNote(e) {
  event.target.remove();
}
