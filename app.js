const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

function createWindow() {
    let win = new BrowserWindow({
        width: 400,
        height: 800,
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/public/ui/index.html'),
        protocol: 'file:',
        slashes: true
    }))
}

app.on('ready', createWindow)