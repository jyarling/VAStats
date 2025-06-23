const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  loadState: () => ipcRenderer.sendSync('load-state'),
  saveState: (data) => ipcRenderer.send('save-state', data),
});
