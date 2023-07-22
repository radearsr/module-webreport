const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  desktop: true,
});

contextBridge.exposeInMainWorld("electronAPI", {
  sendFormData: (data) => {
    ipcRenderer.send("form-data", data);
  },
  onPriceLists: (callback) => {
    ipcRenderer.on("price-lists", (_, priceListsData) => {
      callback(priceListsData);
    });
  },
  onError: (callback) => {
    ipcRenderer.on("error", (_, errorMessage) => {
      callback(errorMessage);
    });
  },
});
