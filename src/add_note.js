const electron = require("electron");
const { ipcRenderer } = electron;

document.querySelector("form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  console.log(ipcRenderer);
  const note = {
    title: title,
    content: content,
  };
  ipcRenderer.send("note:add", note);
}
