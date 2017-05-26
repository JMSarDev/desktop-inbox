// https://github.com/mikaelbr/node-notifier
const notifier = require('node-notifier')
const shell = require('electron').shell

const webview = document.getElementById('mail-view')

// When everything is ready, trigger the events without problems

webview.addEventListener('new-window', (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url)
  }
})

webview.addEventListener('dom-ready', function () {
  // Show devTools if you want
  // webview.openDevTools()
  console.log('DOM-Ready, triggering events !')
})

// Process the data from the webview
webview.addEventListener('ipc-message', function (event) {
  notifier.notify({
    title: event.channel.sender,
    message: event.channel.title,
    icon: event.channel.image
  })
})
