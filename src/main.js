const { app, BrowserWindow, ipcMain } = require("electron");
const packageJson = require("../package.json");
const path = require("path");
const handleGamaForm = require("./services/login/gamma");
const handlePlusLink = require("./services/login/pluslink");
const handleHotspotReload = require("./services/login/hotspotReload");
const handleMonitoringBsi = require("./services/login/monitoringBsi");
const handleKopnus = require("./services/login/kopnus");
const handleCyrus = require("./services/login/cyrus");

const createWindow = () => {
  const elecktronMainProccess = new BrowserWindow({
    title: `Module Web Reports v${packageJson.version}`,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "./webPreferences/preload.js"),
    },
  });
  ipcMain.on("form-data", async (event, data) => {
    const { formId } = data;
    if (formId === "gamma") {
      await handleGamaForm(event, data, elecktronMainProccess);
    } else if (formId === "pluslink") {
      await handlePlusLink(event, data, elecktronMainProccess);
    } else if (formId === "hotspot") {
      await handleHotspotReload(event, data, elecktronMainProccess);
    } else if (formId === "monitoringBsi") {
      await handleMonitoringBsi(event, data, elecktronMainProccess);
    } else if (formId === "kopnus") {
      await handleKopnus(event, data, elecktronMainProccess);
    } else if (formId === "cyrus") {
      await handleCyrus(event, data);
    }
  });
  elecktronMainProccess.loadFile(path.join(__dirname, "../public/index.html"));
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
