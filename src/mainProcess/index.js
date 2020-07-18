const { app, BrowserWindow, ipcMain, protocol } = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");

const isDevelopment = process.env.NODE_ENV === "development";

// Register invoke commands for renderer process
const invokeCommandsPath = path.join(__dirname, "./invokeCommands/");
const invokeCommandsMap = fs
  .readdirSync(invokeCommandsPath)
  .map(file => require(path.join(invokeCommandsPath, file)))
  .flat();

invokeCommandsMap.forEach(command => ipcMain.on(command.name, command.callback));

// eslint-disable-line global-require
require("electron-squirrel-startup") && app.quit();

const createWindow = () => {
  const width = isDevelopment ? 1600 : 1200;
  const height = 800;

  const mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenu(null);

  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    const WEB_FOLDER = "../../build/";
    const PROTOCOL = "file";

    protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {
      let url = request.url.substr(PROTOCOL.length + 1);
      url = path.join(__dirname, WEB_FOLDER, url);
      url = path.normalize(url);
      callback({ path: url });
    });

    mainWindow.loadURL(
      url.format({
        pathname: "index.html",
        protocol: PROTOCOL + ":",
        slashes: true,
      }),
    );
  }

  isDevelopment && mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
