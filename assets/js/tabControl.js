const TabGroup = require("electron-tabs");
const tabGroup = document.querySelector("tab-group");
const { ipcRenderer } = require("electron");
let tabActive;
var webUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)  Chrome/108.0.5359.62 Safari/537.36";

const tab = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/slack.png",
  src: "https://slack.com",
  closable: false,
  active: true,
  webviewAttributes: {
    allowpopups: true,
  },
});
const tab2 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/gmail.png",
  src: "https://www.gmail.com",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
  },
});
const tab3 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/twitter.png",
  src: "https://twitter.com/i/flow/login",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
  },
});
const tab4 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/whatsapp.png",
  src: "https://web.whatsapp.com",
  closable: false,
  webviewAttributes: {
    userAgent: webUserAgent,
    allowpopups: true,
  },
});
const pos = tab.getPosition();
console.log("Tab position is " + pos);
// let webview = tab2.webview;
// webview.addEventListener("dom-ready", (e) => {
//   console.log("kjhkhkh");
//   const url = e.url;
//   webview.openDevTools();
// });

tabGroup.on("tab-active", (tab, tabGroup) => {
  tabActive = tab;
});

ipcRenderer.on("LOAD-WEBVIEW-URL", async (event, url) => {
  console.log("LOAD-WEBVIEW-URL", url);
  let newwebview = tabActive.webview;
  newwebview.loadURL(url).catch((error) => {
    if (error.code === "ERR_ABORTED (-3)") return;
    throw error;
  });
});
