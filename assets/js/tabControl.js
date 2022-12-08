const TabGroup = require("electron-tabs");
// let tabGroup = new TabGroup({});
const tabGroup = document.querySelector("tab-group");
var webUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)  Chrome/108.0.5359.62 Safari/537.36";

const tab = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/slack.png",
  src: "https://slack.com",
  closable: false,
  active: true,
});
const tab2 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/gmail.png",
  src: "https://www.gmail.com",
  closable: false,
});
const tab3 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/twitter.png",
  src: "https://twitter.com/i/flow/login",
  closable: false,
});
const tab4 = tabGroup.addTab({
  title: "",
  iconURL: "assets/images/whatsapp.png",
  src: "https://web.whatsapp.com",
  closable: false,
  webviewAttributes: {
    userAgent: webUserAgent,
  },
});
const pos = tab.getPosition();
console.log("Tab position is " + pos);
// console.log(window.navigator.userAgent);
