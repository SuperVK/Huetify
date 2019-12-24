'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 650,
    height: 900,
    resizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    backgroundColor: '#212121',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    },
    icon: isDevelopment ? '../../build/logo.png' : '/logo.ico'
  })

  if (isDevelopment) {
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    // window.loadURL(formatUrl({
    //   pathname: path.join(__dirname, '../renderer/index.html'),
    //   protocol: 'file',
    //   slashes: true
    // }))
  } else {
    mainWindow.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }
  
  mainWindow.toggleDevTools()
  
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.focus()
    setImmediate(() => {
      mainWindow.focus()
    })
  })

  return mainWindow
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
  //handleSpotifyLogin(mainWindow)
})
