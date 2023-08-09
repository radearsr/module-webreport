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
  reqNoteLists: () => {
    ipcRenderer.send("req-notes-lists");
  },
  resNoteLists: (callback) => {
    ipcRenderer.on("res-notes-lists", (_, noteLists) => {
      callback(noteLists);
    });
  },
  reqNoteSave: (data) => {
    ipcRenderer.send("req-notes-save", data);
  },
  reqNoteDelete: (id) => {
    ipcRenderer.send("req-notes-delete", id);
  },
  reqSwitchToLastWindow: () => {
    ipcRenderer.send("switch-focus");
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
