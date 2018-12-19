const electron = require('electron');
const {ipcMain} = electron;
const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow} = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// receive data from HTML
ipcMain.on('video:submit', (e, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        const duration = metadata.format.duration;
        mainWindow.webContents.send('video:metadata', duration);
    });
});