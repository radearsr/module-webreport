const { app, BrowserWindow, ipcMain } = require("electron");
const packageJson = require("../package.json");
const path = require("path");
const dbServices = require("./services/database/sqlite.services");

const handleGamaForm = require("./services/login/gamma");
const handlePlusLink = require("./services/login/pluslink");
const handleHotspotReload = require("./services/login/hotspotReload");
const handleMonitoringBsi = require("./services/login/monitoringBsi");
const handleKopnus = require("./services/login/kopnus");
const handleCyrus = require("./services/login/cyrus");

const handleHotspotGetPriceLists = require("./services/priceLists/hotspot");

const logConsoleOutput = (electronMainProc) => {
  const { stdout, stderr } = process;

  const originalStdoutWrite = stdout.write.bind(stdout);
  const originalStderrWrite = stderr.write.bind(stderr);

  stdout.write = (...args) => {
    setTimeout(() => {
      electronMainProc.send("system-logging", args[0]);
    }, 100);
    originalStdoutWrite(...args);
  };

  stderr.write = (...args) => {
    originalStderrWrite(...args);
  };
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: `Module Web Reports v${packageJson.version}`,
    autoHideMenuBar: true,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "./webPreferences/preload.js"),
    },
  });

  logConsoleOutput(mainWindow);

  mainWindow.webContents.openDevTools();

  ipcMain.on("form-data", async (event, data) => {
    const { formId } = data;
    if (formId === "gamma") {
      await handleGamaForm(formId, data, mainWindow);
    } else if (formId === "pluslink") {
      await handlePlusLink(formId, data, mainWindow);
    } else if (formId === "hotspot") {
      await handleHotspotReload(formId, data, mainWindow);
    } else if (formId === "monitoringBsi") {
      await handleMonitoringBsi(formId, data, mainWindow);
    } else if (formId === "kopnus") {
      await handleKopnus(formId, data, mainWindow);
    } else if (formId === "cyrus") {
      await handleCyrus(formId, data, mainWindow);
    }
  });

  ipcMain.on("req-login-status", async () => {
    const resultLists = await dbServices.readAllLists();
    mainWindow.send("res-login-status", resultLists);
  });

  ipcMain.on("req-price-lists", async (event, data) => {
    console.log(data);
    handleHotspotGetPriceLists(data.name);
    const resultPriceLists = [];
    mainWindow.send("res-price-lists", resultPriceLists);
  });

  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
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
