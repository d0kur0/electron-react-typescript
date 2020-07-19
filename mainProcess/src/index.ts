import { app, BrowserWindow, ipcMain, protocol } from "electron";
import { EventHandlers } from "./types/eventHandler";
import * as path from "path";
import * as fs from "fs";
import * as url from "url";

const isDevelopment = process.env.NODE_ENV === "development";

// Register events handlers in IPCMain
const eventsHandlersPath = path.join(__dirname, "./eventsHandlers/");
const eventsHandlersMap: EventHandlers = fs
  .readdirSync(eventsHandlersPath)
  .map(file => require(path.join(eventsHandlersPath, file)))
  .flat();

eventsHandlersMap.forEach(event => ipcMain.on(event.name, event.callback));

// eslint-disable-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
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
  isDevelopment && mainWindow.webContents.openDevTools();

  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    const WEB_FOLDER = "../../.dist/rendererProcess";
    const PROTOCOL = "file";

    protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {
      let url = request.url.substr(PROTOCOL.length + 1);
      url = path.join(__dirname, WEB_FOLDER, url);
      url = path.normalize(url);
      callback(url);
    });

    mainWindow.loadURL(
      url.format({
        pathname: "index.html",
        protocol: PROTOCOL + ":",
        slashes: true,
      }),
    );
  }
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
