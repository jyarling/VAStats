const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs').promises;

const dataFile = path.join(app.getPath('userData'), 'user-data.json');

const isDev = !app.isPackaged;

function createWindow () {
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
}

app.whenReady().then(createWindow);

ipcMain.handle('open-external', (event, url) => {
  if (typeof url === 'string') {
    shell.openExternal(url);
  }
});

ipcMain.handle('save-data', async (event, key, value) => {
  if (!key) return;
  let data = {};
  try {
    const raw = await fs.readFile(dataFile, 'utf8');
    data = JSON.parse(raw);
  } catch (_) {}
  data[key] = value;
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
});

ipcMain.handle('load-data', async (event, key) => {
  try {
    const raw = await fs.readFile(dataFile, 'utf8');
    const data = JSON.parse(raw);
    return key ? data[key] : data;
  } catch (_) {
    return null;
  }
});

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
