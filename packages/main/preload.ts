import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  db: {
    getPilots:      () => ipcRenderer.invoke('db:getPilots'),
    getAircraft:    () => ipcRenderer.invoke('db:getAircraft'),
    getFlights:     () => ipcRenderer.invoke('db:getFlights'),
    getEvents:      () => ipcRenderer.invoke('db:getEvents'),
    getNotifications: () => ipcRenderer.invoke('db:getNotifications'),
    getAcarsLogs:   (flightId: number) => ipcRenderer.invoke('db:getAcarsLogs', flightId),
  }
});
