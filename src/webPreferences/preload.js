const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendFormData: (data) => {
    ipcRenderer.send("form-data", data);
  },
  reqLoginStatus: () => {
    ipcRenderer.send("req-login-status");
  },
  resLoginStatus: (callback) => {
    ipcRenderer.on("res-login-status", (_, loginStatus) => {
      callback(loginStatus)
    });
  },
  onLoginSuccess: (callback) => {
    ipcRenderer.on("login-success", (_, loginIdentity) => {
      callback(loginIdentity);
    });
  },
  onError: (callback) => {
    ipcRenderer.on("error", (_, errorMessage) => {
      callback(errorMessage);
    });
  },
});
