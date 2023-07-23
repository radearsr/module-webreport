const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendFormData: (data) => {
    ipcRenderer.send("form-data", data);
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
