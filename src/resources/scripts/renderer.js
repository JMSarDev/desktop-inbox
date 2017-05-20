// https://github.com/mikaelbr/node-notifier
const notifier = require('node-notifier')

const webview = document.getElementById('mail-view')

// When everything is ready, trigger the events without problems
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
