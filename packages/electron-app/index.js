const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path')
let mainWindow;
let childWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        //16:9 aspect ratio
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, '/www/scripts/preload.js')
        }
    })

    mainWindow.loadFile(path.join(__dirname,'/www/pages/index.html')).then()
}

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.setAppUserModelId(process.execPath);

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
}).then(showNotification)

ipcMain.on('form-submission', function (event, firstname) {
    console.log("this is the firstname from the form ->", firstname)
})

function createChildWindow() {
    childWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        modal: true,
        show: false,
        frame: true,
        parent: mainWindow, // Make sure to add parent window here

        // Make sure to add webPreferences with below configuration
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    // Child window loads settings.html file
    childWindow.loadFile(path.join(__dirname,'/www/pages/message.html')).then()

    childWindow.once("ready-to-show", () => {
        childWindow.show();
    });
}

ipcMain.on("form-submission", (event, arg) => {
    console.log("event: %s , arg: %s", event, arg)
});

ipcMain.on("openChildWindow", (event, arg) => {
    createChildWindow();
});

ipcMain.on("logtoconsole", (event, arg) => {
    console.log("event fired");
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
