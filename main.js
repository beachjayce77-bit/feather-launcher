const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 980,
    minHeight: 620,
    frame: false,
    backgroundColor: '#0d0f14',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('launch-game', async (event, config) => {
  const {
    javaPath = 'java',
    gameDir = '',
    version = '1.20.1',
    profileName = 'Default',
    maxMemory = '2G',
    minMemory = '1G',
    jarPath = ''
  } = config;

  if (!gameDir) {
    throw new Error('Game directory is required.');
  }

  const minecraftJar = jarPath || path.join(gameDir, 'versions', version, `${version}.jar`);

  const args = [
    `-Xmx${maxMemory}`,
    `-Xms${minMemory}`,
    '-Duser.language=en',
    '-cp',
    minecraftJar,
    'net.minecraft.client.main.Main'
  ];

  const child = spawn(javaPath, args, {
    cwd: gameDir,
    stdio: 'inherit',
    shell: false
  });

  return {
    pid: child.pid,
    profileName,
    version
  };
});
