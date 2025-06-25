"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    db: {
        getPilots: () => electron_1.ipcRenderer.invoke('db:getPilots'),
        getAircraft: () => electron_1.ipcRenderer.invoke('db:getAircraft'),
        getFlights: () => electron_1.ipcRenderer.invoke('db:getFlights'),
        getEvents: () => electron_1.ipcRenderer.invoke('db:getEvents'),
        getNotifications: () => electron_1.ipcRenderer.invoke('db:getNotifications'),
        getAcarsLogs: (flightId) => electron_1.ipcRenderer.invoke('db:getAcarsLogs', flightId),
    }
});
