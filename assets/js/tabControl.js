const TabGroup = require("electron-tabs");
const tabGroup = document.querySelector("tab-group");
const { ipcRenderer } = require("electron");
let tabActive;
const webUserAgentWA = window.navigator.userAgent.replace(
  /(Electron|freshwind)([^\s]+\s)/g,
  ""
);
var webUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) freshwind/1.0.0 Chrome/108.0.5359.62 Safari/537.36";

const tab = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/slack.png",
  src: "https://slack.com",
  closable: false,
  active: true,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab2 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/gmail.png",
  src: "https://www.gmail.com",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab3 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/podio.png",
  src: "https://www.podio.com/",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab4 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/clickup.png",
  src: "https://clickup.com/",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab5 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/sheets.png",
  src: "https://docs.google.com/spreadsheets",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab6 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/docs.png",
  src: "https://docs.google.com/document",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab7 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/zendesk.png",
  src: "https://www.zendesk.com/",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab8 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/whatsapp.png",
  src: "https://web.whatsapp.com",
  closable: false,
  webviewAttributes: {
    userAgent: webUserAgentWA,
    allowpopups: true,
  },
});
const pos = tab.getPosition();
console.log("Tab position is " + pos);
// let webview = tab4.webview;
// webview.addEventListener("dom-ready", (e) => {
//   console.log("kjhkhkh");
//   webview.openDevTools();
// });
console.log(navigator.userAgent);
tabGroup.on("tab-active", (tab, tabGroup) => {
  tabActive = tab;
  // console.log(tabActive, "90909090909");
});

ipcRenderer.on("LOAD-WEBVIEW-URL", async (event, url) => {
  console.log("LOAD-WEBVIEW-URL", url);
  let newwebview = tabActive.webview;
  newwebview.loadURL(url).catch((error) => {
    if (error.code === "ERR_ABORTED (-3)") return;
    throw error;
  });
});
