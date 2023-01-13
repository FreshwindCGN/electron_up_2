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
const tab9 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/shopware.png",
  src: "https://www.shopware.com/",
  closable: false,
  webviewAttributes: {
    userAgent: webUserAgent,
    allowpopups: true,
  },
});
const tab10 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/Canva.png",
  src: "https://www.canva.com/",
  closable: false,
  webviewAttributes: {
    userAgent: webUserAgent,
    allowpopups: true,
  },
});
const tab11 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/ewarehouse.png",
  src: "https://www.ewarehouse.com/",
  closable: false,
  webviewAttributes: {
    userAgent: webUserAgent,
    allowpopups: true,
  },
});

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
tabActive = tabGroup.getActiveTab();
setTimeout(() => {
  console.log(tabActive);
}, 7000);
ipcRenderer.on("ZOOMIN-PAGE", async () => {
  console.log("ZOOMIN-PAGE");
  increaseZoom();
});
ipcRenderer.on("ZOOMOUT-PAGE", async () => {
  console.log("ZOOMOUT-PAGE");
  decreaseZoom();
});
ipcRenderer.on("RESET-ZOOM-PAGE", async () => {
  console.log("RESET-ZOOM-PAGE");
  resetZoom();
});
ipcRenderer.on("WEBVIEW-GO-BACK", async () => {
  console.log("WEBVIEW-GO-BACK");
  navGoBack();
});
ipcRenderer.on("WEBVIEW-GO-FORWARD", async () => {
  console.log("WEBVIEW-GO-FORWARD");
  navGoForward();
});
ipcRenderer.on("WEBVIEW-RELOAD", async () => {
  console.log("WEBVIEW-RELOAD");
  navReload();
});
ipcRenderer.on("LOAD-WEBVIEW-URL", async (event, url) => {
  console.log("LOAD-WEBVIEW-URL", url);
  let newwebview = tabActive.webview;
  newwebview.loadURL(url).catch((error) => {
    if (error.code === "ERR_ABORTED (-3)") return;
    throw error;
  });
});
function increaseZoom() {
  var currentZoom = tabActive.webview.getZoomFactor();
  tabActive.webview.setZoomFactor(currentZoom + 0.2);
  document.getElementsByClassName(
    "nav-bar-zoom-percent-text-container"
  )[0].innerText = (tabActive.webview.getZoomFactor() * 100).toFixed(0) + "%";
  console.log(tabActive.webview.getZoomFactor() * 100);
}
function decreaseZoom() {
  var currentZoom = tabActive.webview.getZoomFactor();
  tabActive.webview.setZoomFactor(currentZoom - 0.2);
  document.getElementsByClassName(
    "nav-bar-zoom-percent-text-container"
  )[0].innerText = (tabActive.webview.getZoomFactor() * 100).toFixed(0) + "%";
  console.log(tabActive.webview.getZoomFactor() * 100);
}
function resetZoom() {
  tabActive.webview.setZoomFactor(1.0);
  document.getElementsByClassName(
    "nav-bar-zoom-percent-text-container"
  )[0].innerText = (tabActive.webview.getZoomFactor() * 100).toFixed(0) + "%";
  console.log(tabActive.webview.getZoomFactor() * 100);
}

function navGoBack() {
  tabActive.webview.goBack();
}
function navGoForward() {
  tabActive.webview.goForward();
}
function navReload() {
  tabActive.webview.reloadIgnoringCache();
}
function openZoomMenu() {
  document.getElementsByClassName(
    "nav-bar-zoom-percent-text-container"
  )[0].innerText = (tabActive.webview.getZoomFactor() * 100).toFixed(0) + "%";

  var x = document.getElementsByClassName(
    "nav-bar-zoom-percent-text-plus-minus-reset-container"
  )[0];
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}
