const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
Menu.setApplicationMenu(null);
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      devTools: isDev ? true : false,
      preload: path.join(__dirname, "preload.js"),
      webviewTag: true,
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    },
  });
  mainWindow.loadFile("index.html");
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}
app.on("ready", () => {
  const userAgentFallback = app.userAgentFallback;
  app.userAgentFallback = userAgentFallback.replace(
    /(Electron|freshwind)([^\s]+\s)/g,
    ""
  );
});
app.on("web-contents-created", (createEvent, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    console.log("Blocked by 'setWindowOpenHandler'");
    mainWindow.webContents.send("LOAD-WEBVIEW-URL", url);
    return { action: "deny" };
  });
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
