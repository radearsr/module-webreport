const { app, BrowserWindow } = require("electron");
const packageJson = require("../package.json");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    title: `Module Web Reports v${packageJson.version}`,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "./webPreferences/preload.js"),
    },
  })
  win.loadFile(path.join(__dirname, "../public/index.html"));
};

app.whenReady().then(() => {
  createWindow()
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit()
});
