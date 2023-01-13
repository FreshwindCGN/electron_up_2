const { app, BrowserWindow, Menu, systemPreferences } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const isMac = process.platform === "darwin";
let mainWindow;
const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ role: "about" }, { role: "quit" }],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  {
    label: "View",
    submenu: [
      {
        label: "Zoom In",
        click: function () {
          console.log("Zoom in");
          mainWindow.webContents.send("ZOOMIN-PAGE");
        },
      },
      {
        label: "Zoom Out",
        click: function () {
          console.log("Zoom out");
          mainWindow.webContents.send("ZOOMOUT-PAGE");
        },
      },
      {
        label: "Reset Zoom",
        click: function () {
          console.log("Reset zoom");
          mainWindow.webContents.send("RESET-ZOOM-PAGE");
        },
      },
      {
        label: "Back",
        click: function () {
          console.log("Back");
          mainWindow.webContents.send("WEBVIEW-GO-BACK");
        },
      },
      {
        label: "Forward",
        click: function () {
          console.log("Forward");
          mainWindow.webContents.send("WEBVIEW-GO-FORWARD");
        },
      },
      {
        label: "Reload Page",
        click: function () {
          console.log("Reload");
          mainWindow.webContents.send("WEBVIEW-RELOAD");
        },
      },
    ],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [{ role: "togglefullscreen" }],
  },
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
isMac
  ? systemPreferences.setUserDefault(
      "NSDisabledDictationMenuItem",
      "boolean",
      true
    )
  : "";

isMac
  ? systemPreferences.setUserDefault(
      "NSDisabledCharacterPaletteMenuItem",
      "boolean",
      true
    )
  : "";

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
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
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
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
