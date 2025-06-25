import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import fs from 'fs';
import * as db from './db';
import log from 'electron-log';

log.initialize();

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

  ipcMain.handle('db:getPilots', async () => {
    try {
      return await db.getPilots();
    } catch (error) {
      log.error('db:getPilots', error);
      throw error;
    }
  });

  ipcMain.handle('db:getAircraft', async () => {
    try {
      return await db.getAircraft();
    } catch (error) {
      log.error('db:getAircraft', error);
      throw error;
    }
  });

  ipcMain.handle('db:getFlights', async () => {
    try {
      return await db.getFlights();
    } catch (error) {
      log.error('db:getFlights', error);
      throw error;
    }
  });

  ipcMain.handle('db:getEvents', async () => {
    try {
      return await db.getEvents();
    } catch (error) {
      log.error('db:getEvents', error);
      throw error;
    }
  });

  ipcMain.handle('db:getNotifications', async () => {
    try {
      return await db.getNotifications();
    } catch (error) {
      log.error('db:getNotifications', error);
      throw error;
    }
  });

  ipcMain.handle('db:getAcarsLogs', async (_evt, flightId: number) => {
    try {
      return await db.getAcarsLogs(flightId);
    } catch (error) {
      log.error('db:getAcarsLogs', error);
      throw error;
    }
  });
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
