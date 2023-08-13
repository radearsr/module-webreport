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
const handleLoginKepooH2h = require("./services/login/kepooH2h");

const handleHotspotGetPriceLists = require("./services/priceLists/hotspotReload");
const handleKopnusGetPriceLists = require("./services/priceLists/kopnus");
const handleGammaGetPriceLists = require("./services/priceLists/gamma");
const handlePluslinkGetPriceLists = require("./services/priceLists/pluslink");
const handleMonitoringBsiGetPriceLists = require("./services/priceLists/monitoringBsi");
const handleCyrusPriceLists = require("./services/priceLists/cyrus");
const handleKepooH2hPriceLists = require("./services/priceLists/kepooH2h");

const {
  createOrUpdateNote,
  deleteNotes,
  getAllNotes,
} = require("./services/notes/notes.services");

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

const switchFocusToLastWindow = () => {
  const windows = BrowserWindow.getAllWindows();
  const lastWindow = windows[windows.length - 1];
  if (lastWindow) {
    lastWindow.focus();
  }
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: `Module Web Reports v${packageJson.version}`,
    autoHideMenuBar: true,
    width: 1300,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "./webPreferences/preload.js"),
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#FFFFFF",
      symbolColor: "#000000",
      height: 30,
    },
    icon: path.join(__dirname, "./assets/report.ico"),
  });

  logConsoleOutput(mainWindow);
  // mainWindow.webContents.openDevTools();
  ipcMain.on("req-login-auth", async (_, data) => {
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
    } else if (formId === "kepooH2h") {
      console.log(formId, data);
      await handleLoginKepooH2h(formId, data, mainWindow);
    }
  });

  ipcMain.on("req-login-status", async () => {
    const resultLists = await dbServices.readAllLists();
    mainWindow.send("res-login-status", resultLists);
  });

  ipcMain.on("req-price-lists", async (_, data) => {
    const gammaPrice = await handleGammaGetPriceLists(data);
    const hotspotPrice = await handleHotspotGetPriceLists(data);
    const kopnusPrice = await handleKopnusGetPriceLists(data);
    const pluslinkPrice = await handlePluslinkGetPriceLists(data);
    const monitoringBsiPrice = await handleMonitoringBsiGetPriceLists(data);
    const cyrusPrice = await handleCyrusPriceLists(data);
    const kepoH2hPrice = await handleKepooH2hPriceLists(data);
    const resultPriceLists = {
      hotspotPrice,
      kopnusPrice,
      gammaPrice,
      pluslinkPrice,
      monitoringBsiPrice,
      cyrusPrice,
      kepoH2hPrice,
    };
    mainWindow.send("res-price-lists", resultPriceLists);
  });

  ipcMain.on("req-logout-auth", async (_, data) => {
    const { formId } = data;
    await dbServices.updateListStatusByTitle(formId, false);
    mainWindow.send("res-logout-auth", { formId });
  });

  ipcMain.on("req-notes-save", async (_, data) => {
    createOrUpdateNote(data);
  });

  ipcMain.on("req-notes-delete", async (_, id) => {
    deleteNotes(id);
  });

  ipcMain.on("req-notes-lists", async () => {
    getAllNotes(mainWindow);
  });

  ipcMain.on("switch-focus", switchFocusToLastWindow);

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
