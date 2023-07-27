const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  reqLoginAuth: (data) => {
    ipcRenderer.send("req-login-auth", data);
  },
  resLoginAuth: (callback) => {
    ipcRenderer.on("res-login-auth", (_, loginIdentity) => {
      callback(loginIdentity);
    });
  },
  reqLogoutAuth: (data) => {
    ipcRenderer.send("req-logout-auth", data);
  },
  resLogoutAuth: (callback) => {
    ipcRenderer.on("res-logout-auth", (_, logoutAuth) => {
      callback(logoutAuth);
    });
  },
  reqLoginStatus: () => {
    ipcRenderer.send("req-login-status");
  },
  resLoginStatus: (callback) => {
    ipcRenderer.on("res-login-status", (_, loginStatus) => {
      callback(loginStatus)
    });
  },
  reqPriceLists: (name) => {
    ipcRenderer.send("req-price-lists", name);
  },
  resPriceLists: (callback) => {
    ipcRenderer.on("res-price-lists", (_, priceLists) => {
      callback(priceLists);
    });
  },
  onSystemLogging: (callback) => {
    ipcRenderer.on("system-logging", (_, systemLogging) => {
      callback(systemLogging);
    });
  }, 
  onError: (callback) => {
    ipcRenderer.on("error", (_, errorMessage) => {
      callback(errorMessage);
    });
  },
});
