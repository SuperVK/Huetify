const {
    app,
    BrowserWindow
} = require('electron')
const handler = require('serve-handler');
const http = require('http');
require('dotenv').config()
const server = http.createServer((request, response) => {
  return handler(request, response, {
      public: process.env.PUBLICFOLDER
  });
})
 
server.listen(process.env.PORT, () => {
  console.log(`Running at http://localhost:${process.env.PORT}`);
});

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 650,
        height: 900,
        resizable: false,
        fullscreenable: false,
        autoHideMenuBar: true,
        backgroundColor: '#212121',
        icon: './logo.ico'
    })


    mainWindow.loadURL(`http://localhost:${process.env.PORT}`)

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}


app.on('ready', createWindow)


app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {

    if (mainWindow === null) createWindow()
})