"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var remoteMain = require("@electron/remote/main");
remoteMain.initialize();
var mainWindow;
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 480,
        center: true,
        kiosk: !isDev,
        resizable: true,
        fullscreen: true,
        fullscreenable: true,
        webPreferences: {
            plugins: true,
            nodeIntegration: true,
            contextIsolation: false,
            backgroundThrottling: false,
            webSecurity: false
        }
    });
    remoteMain.enable(mainWindow.webContents);
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : "file://".concat(path.join(__dirname, '../build/index.html')));
    if (isDev) {
        //mainWindow.webContents.openDevTools({mode:'detach'});
    }
    mainWindow.setResizable(true);
    mainWindow.on('closed', function () { return (mainWindow = undefined); });
    mainWindow.focus();
};
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
