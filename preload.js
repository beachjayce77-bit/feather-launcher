const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('launcher', {
  launch: (config) => ipcRenderer.invoke('launch-game', config),
});
