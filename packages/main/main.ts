import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import * as db from './db';

const isDev = !app.isPackaged;

const stateFile = path.join(app.getPath('userData'), 'state.json');

ipcMain.on('save-state', (_, state) => {
  try {
    fs.writeFileSync(stateFile, JSON.stringify(state));
  } catch {}
});

ipcMain.on('load-state', (event) => {
  try {
    const raw = fs.readFileSync(stateFile, 'utf8');
    event.returnValue = JSON.parse(raw);
  } catch {
    event.returnValue = undefined;
  }
});

ipcMain.handle('open-external', (_, url) => shell.openExternal(url));

function createWindow(): void {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../app/dist/index.html'));
  }

  ipcMain.handle('db:getPilots', () => db.getPilots());
  ipcMain.handle('db:getAircraft', () => db.getAircraft());
  ipcMain.handle('db:getFlights', () => db.getFlights());
  ipcMain.handle('db:getEvents', () => db.getEvents());
  ipcMain.handle('db:getNotifications', () => db.getNotifications());
  ipcMain.handle('db:getAcarsLogs', (_evt, flightId: number) => db.getAcarsLogs(flightId));
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
