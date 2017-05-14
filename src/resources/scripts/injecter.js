// inyector.js// Get the ipcRenderer of electron
const { ipcRenderer } = require('electron')

var getNewInboxElement = function (mailNode) {
  // var mailNode = document.getElementsByClassName("scroll-list-item top-level-item")[0];
  var sender = mailNode.getElementsByClassName('ss')[0].firstChild.nodeValue
  var title = mailNode.getElementsByClassName('bg qG')[0].firstChild.firstChild.nodeValue
  var image = mailNode.getElementsByClassName('wWSE6 gi ej')[0].getAttribute('src')

  return {
    sender: sender,
    title: title,
    image: image
  }
}

const observer = new MutationObserver(function (mutations) {
  if (mutations.length > 0) {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        console.log(getNewInboxElement(mutation.addedNodes[0]))
        ipcRenderer.sendToHost(getNewInboxElement(mutation.addedNodes[0]))
      }
    })
  }
})

document.addEventListener('DOMContentLoaded', () => {
  observer.observe(document.getElementsByClassName('ai-cA scroll-list-section-body')[0], {
    childList: true,
    characterData: false,
    attributes: false,
    subtree: false
  })
})
