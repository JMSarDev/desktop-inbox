const Electron = require('electron')
const AutoLaunch = require('auto-launch')
const path = require('path')

const app = Electron.app
const BrowserWindow = Electron.BrowserWindow
const Menu = Electron.Menu
const Tray = Electron.Tray

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// My own global variables

// To know when to close it or just move to the tray bar
let realClose = false

let InboxDesktopAutoLauncher = new AutoLaunch({
  name: 'Desktop Inbox',
  isHidden: true
})

const createWindow = () => {
    // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'Desktop Inbox',
    icon: path.join(__dirname, '/resources/images/icon.png')
  })

    //  Activate in production
  mainWindow.setMenuBarVisibility(false)

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  let tray = new Tray(path.join(__dirname, '/resources/images/icon.png'))
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })

  const contextMenu = Menu.buildFromTemplate([{
    label: 'Abrir Inbox',
    click: function () {
      mainWindow.show()
    }
  },
  {
    visible: (InboxDesktopAutoLauncher.isEnabled() !== true),
    label: 'Ejecutar al arrancar',
    click: function () {
      InboxDesktopAutoLauncher.enable()
      contextMenu.items[1].visible = false
      contextMenu.items[2].visible = true
      tray.setContextMenu(contextMenu)
    }
  },
  {
    visible: (InboxDesktopAutoLauncher.isEnabled() === true),
    label: 'Ejecutar al arrancar ✓',
    click: function () {
      InboxDesktopAutoLauncher.disable()
      contextMenu.items[1].visible = true
      contextMenu.items[2].visible = false
      tray.setContextMenu(contextMenu)
    }
  },
  {
    label: 'Cerrar inbox',
    click: function () {
      realClose = true
      mainWindow.close()
    }
  }
  ])

  tray.setToolTip('Inbox by Google')
  tray.setContextMenu(contextMenu)

  mainWindow.on('minimize', function (event) {})

  mainWindow.on('close', (event) => {
    if (!realClose) {
      event.preventDefault()
      mainWindow.hide()
    }
  })

    // Emitted when the window is closed.
  mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
