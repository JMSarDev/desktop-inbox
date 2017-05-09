const ipc = require('electron').ipcRenderer

// https://github.com/mikaelbr/node-notifier
const notifier = require('node-notifier')

ipc.on('MAIL_STATUS', (event, data) => {
  console.log('There are changes in the mails')

  notifier.notify('Message')
})


