const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on("ready", function () {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "window/main.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // quit application when main window is closed
  mainWindow.on("closed", () => app.quit());

  // main menu bar from menu template list
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Note",
        accelerator: process.platform == "darwin" ? "Command+N" : "Ctrl+N",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Export Note",
        accelerator: process.platform == "darwin" ? "Command+N" : "Ctrl+E",
        click() {
          exportNoteWindow();
        },
      },
      {
        label: "Exit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: "View",
    submenu: [
      {
        label: "Dark Mode",
        click() {
          toggleViewMode();
        },
      },
      {
        label: "About App",
        click() {
          aboutAppWindow();
        },
      },
    ],
  },
];

// mac displays a electron menu, add empty to disable it
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// new note add window
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 600,
    height: 600,
    title: "Add New Note",
  });
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "window/add_note.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // memory optimization, when closed remove the reference
  addWindow.on("close", function () {
    addWindow = null;
  });
}
