// OpenNote: Open Sourced Note Taking
// IN DEVELOPMENT

const electron = require("electron");
const path = require("path");
const url = require("url");

// environment set variable
process.env.NODE_ENV = "development";

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;
let aboutWindow;

app.on("ready", function () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/window/main.html`);

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
    removeMenu: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "window/add_note.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // memory optimization, when closed remove the reference
  addWindow.on("close", () => (addWindow = null));
}

function exportNoteWindow() {}

function aboutAppWindow() {
  aboutWindow = new BrowserWindow({
    width: 400,
    height: 400,
    title: "About - OpenNotes",
  });

  aboutWindow.on("close", () => (aboutWindow = null));
}

// catch title:add
ipcMain.on("note:add", function (e, note) {
  mainWindow.webContents.send("note:add", note);
  addWindow.close();
  addWindow = null;
});

// developer option menu (displayed in the DEV build)
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Tools",
    submenu: [
      {
        role: "reload",
      },
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
