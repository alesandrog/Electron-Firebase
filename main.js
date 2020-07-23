const { app, BrowserWindow } = require("electron");
const shell = require("electron").shell;


let win = null;

function createWindow() {
  // Crea la ventana del navegador.
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      enableRemoteModule: true
    },
  });

  win.loadFile("index.html");
  // Abre las herramientas de desarrollo (DevTools).
  win.webContents.openDevTools();

}

app.whenReady().then(createWindow);

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

exports.redirectExternal = ( param ) => {
  shell.openExternal(param);
};