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
setTimeout(() => {
  const searchModuleRoot = tabGroup && tabGroup.shadowRoot;
  const tabList = searchModuleRoot.querySelectorAll(".tab");
  for (let i = 0; i < tabList.length; i++) {
    tabList[i].addEventListener("click", function () {
      var rootViews = searchModuleRoot.querySelectorAll("webview");
      console.log(rootViews);
      var tabTitle = tabActive.title;
      document.getElementsByClassName("nav-bar-title-label")[0].innerText =
        tabTitle;
      console.log(tabTitle, "1232");
      rootViews.forEach((element) => {
        element.classList.remove("visible");
      });
      console.log(tabActive.webview, "kjsdkjhsdkfjhsdD");
      console.log(tabActive.webview.classList);
      const isActive = tabActive.webview.classList.contains("visible");
      if (isActive) {
        console.log("active");
      } else {
        tabActive.webview.classList.add("visible");
        console.log("made active");
      }

      // rootViews.classList.add("visible");
    });
  }
  console.log(title);
}, 2000);

const tab = tabGroup.addTab({
  title: "Slack",
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
  title: "Gmail",
  iconURL: "assets/images/gmail.png",
  src: "https://www.gmail.com",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab3 = tabGroup.addTab({
  title: "Podio",
  iconURL: "assets/images/podio.png",
  src: "https://www.podio.com/",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab4 = tabGroup.addTab({
  title: "Clickup",
  iconURL: "assets/images/clickup.png",
  src: "https://clickup.com/",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab5 = tabGroup.addTab({
  title: "Google | Sheets",
  iconURL: "assets/images/sheets.png",
  src: "https://docs.google.com/spreadsheets",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab6 = tabGroup.addTab({
  title: "Google | Docs",
  iconURL: "assets/images/docs.png",
  src: "https://docs.google.com/document",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab7 = tabGroup.addTab({
  title: "Zendesk",
  iconURL: "assets/images/zendesk.png",
  src: "https://www.zendesk.com/",
  closable: false,
  webviewAttributes: {
    allowpopups: true,
    userAgent: webUserAgent,
  },
});
const tab8 = tabGroup.addTab({
  title: "Whatsapp",
  iconURL: "assets/images/whatsapp.png",
  src: "https://web.whatsapp.com",
  closable: false,
  webviewAttributes: {
    userAgent: webUserAgentWA,
    allowpopups: true,
  },
});
const tab9 = tabGroup.addTab({
  title: "Shopware | Windandvibes",
  // title: "Shopware | Etalon-vert",
  // title: "Shopware | Chiwitt-brand",
  iconURL: "assets/images/shopware.png",
  src: "https://windandvibes.com/backend",
  // src: "https://etalon-vert.com/backend/",
  // src: "https://chiwitt-brand.com/backend/",
  closable: false,
  webviewAttributes: {
    userAgent: webUserAgent,
    allowpopups: true,
  },
});
const tab10 = tabGroup.addTab({
  title: "Canva",
  iconURL: "assets/images/Canva.png",
  src: "https://www.canva.com/",
  closable: false,
  webviewAttributes: {
    userAgent: webUserAgent,
    allowpopups: true,
  },
});
const tab11 = tabGroup.addTab({
  title: "e-warehouse",
  iconURL: "assets/images/ewarehouse.png",
  src: "https://www.e-warehouse.eu/",
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
  console.log(tabActive, "90909090909");
});
tabActive = tabGroup.getActiveTab();
setTimeout(() => {
  console.log(tabActive.webview);
}, 5000);
function removeWebviewVisibilty() {
  const searchModuleRoot = tabGroup && tabGroup.shadowRoot;
  var rootViews = searchModuleRoot.querySelectorAll("webview");
  rootViews.forEach((element) => {
    element.classList.remove("visible");
  });
}
var webViewCounter = 1;
function initSubtab(urlParam) {
  removeWebviewVisibilty();
  var rootElement = document.querySelector("tab-group").shadowRoot;
  var rootViews2 = rootElement.querySelector(".views");
  rootViews2.insertAdjacentHTML(
    "beforeend",
    `<div id="webview${webViewCounter}-container" class="tabcontent">
    <webview id="webview${webViewCounter}" class="view visible" allowpopups="true" useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) freshwind/1.0.0 Chrome/108.0.5359.62 Safari/537.36" src=${urlParam}></webview>
  </div>`
  );
  webViewCounter += 1;
}
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

  let domain = new URL(url);

  const pathnameSegments = domain.pathname.split("/");
  const firstPathnameSegment = pathnameSegments[1];
  console.log(firstPathnameSegment);
  domain = domain.hostname.replace("www.", "");
  console.log(domain); //example.com
  console.log(`${domain}/${firstPathnameSegment}`);
  if (
    `${domain}/${firstPathnameSegment}` === "docs.google.com/spreadsheets" ||
    `${domain}/${firstPathnameSegment}` === "docs.google.com/document"
  ) {
    console.log("gooooogle");
    var tabGroupContainer = document.getElementById("tabGroupContainer");
    tabGroupContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="tabs-tabelem active" onclick="selectSubtab(event, 'webview${webViewCounter}')">${domain}</div>`
    );
    initSubtab(url);
  } else {
    let newwebview = tabActive.webview;
    newwebview.loadURL(url).catch((error) => {
      if (error.code === "ERR_ABORTED (-3)") return;
      throw error;
    });
  }
});
function selectSubtab(evt, tabName) {
  removeWebviewVisibilty();
  const searchModuleRoot = tabGroup && tabGroup.shadowRoot;
  var webviewidDiv = searchModuleRoot.querySelector(`#${tabName}-container`);
  var webviewID = searchModuleRoot.querySelector(`#${tabName}`);
  console.log(webviewID, "ljkashd");
  console.log(webviewidDiv, "jahsdk");
  var i, tabcontent, tablinks;
  tabcontent = searchModuleRoot.querySelectorAll(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.querySelectorAll(".tabs-tabelem");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  webviewidDiv.style.display = "block";
  webviewID.classList.add("visible");
  evt.currentTarget.className += " active";
}
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
