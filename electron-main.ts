import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.maximize();

  // Determine the correct path to load
  const loadApp = async () => {
    if (!app.isPackaged) {
      // Development mode: try dev server first, fallback to local files
      try {
        const http = await import('node:http');
        await new Promise((resolve, reject) => {
          const req = http.get('http://localhost:5173', (res) => {
            if (res.statusCode === 200) {
              resolve(true);
            } else {
              reject(new Error('Dev server not responding'));
            }
          });
          req.on('error', () => reject(new Error('Dev server not running')));
          req.setTimeout(1000, () => {
            req.destroy();
            reject(new Error('Dev server timeout'));
          });
        });
        // Dev server is running
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
        return;
      } catch {
        // Dev server not available, load from local files
        console.log('Dev server not running, loading from local files...');
      }
    }

    // Production mode or dev server unavailable - load from built files
    // When packaged, electron-builder puts files in the app directory
    // When running locally after build, files are in dist folder
    const appPath = app.getAppPath();
    console.log('App path:', appPath);
    console.log('__dirname:', __dirname);
    console.log('isPackaged:', app.isPackaged);

    // Try different paths
    const possiblePaths = [
      // When running locally after build (not packaged)
      path.join(__dirname, '../dist/index.html'),
      // When packaged (files are in app.asar or app directory)
      path.join(appPath, 'dist/index.html'),
      // Alternative packaged structure
      path.join(appPath, '../dist/index.html'),
    ];

    let foundPath: string | null = null;
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        foundPath = possiblePath;
        console.log('Loading from:', foundPath);
        break;
      }
    }

    if (foundPath) {
      mainWindow.loadFile(foundPath);
    } else {
      console.error('Could not find index.html. Checked paths:', possiblePaths);
      // Last resort: try the first path
      mainWindow.loadFile(possiblePaths[0]);
    }

    // Open dev tools in development or for debugging
    if (!app.isPackaged) {
      mainWindow.webContents.openDevTools();
    }
  };

  loadApp();

  // Helpful diagnostics during white-screen debugging
  mainWindow.webContents.on('did-fail-load', (_e, errorCode, errorDescription, validatedURL) => {
    console.error('did-fail-load:', { errorCode, errorDescription, validatedURL });
  });
  mainWindow.webContents.on('console-message', (_e, level, message) => {
    if (level >= 2) console.error('renderer:', message);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

