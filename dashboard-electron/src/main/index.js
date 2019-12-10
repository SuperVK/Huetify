'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import handleSpotifyLogin from './spotifyLogin.js'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const window = new BrowserWindow({
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
    icon: '/logo.ico'
  })

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }
  
  
  
  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
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
  handleSpotifyLogin(mainWindow)
})
