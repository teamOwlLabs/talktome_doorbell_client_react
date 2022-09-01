import { app, BrowserWindow } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';
import * as remoteMain from '@electron/remote/main';
remoteMain.initialize();
let mainWindow: BrowserWindow;
const createWindow =()=>{
	mainWindow = new BrowserWindow({
		width:800,
		height:480,
		center:true,
		kiosk:!isDev,
		resizable:true,
		fullscreen:true,
		fullscreenable:true,
		webPreferences:{
			plugins:true,
			nodeIntegration:true,
			contextIsolation:false,
			backgroundThrottling:false,
			webSecurity:false
		}
	});
	remoteMain.enable(mainWindow.webContents);

	mainWindow.loadURL(isDev?'http://localhost:3000':`file://${path.join(__dirname,'../build/index.html')}`);

	if (isDev){
		//mainWindow.webContents.openDevTools({mode:'detach'});
	}

	mainWindow.setResizable(true);
	mainWindow.on('closed',()=>(mainWindow=undefined!));
	mainWindow.focus();
}

app.on('ready',createWindow);

app.on('window-all-closed',()=>{
	if(process.platform!=='darwin'){
		app.quit();
	}
});

app.on('activate',()=>{
	if(mainWindow===null){
		createWindow();
	}
});


