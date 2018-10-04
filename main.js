// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const utils = require('./utils.js')
const path = require('path')

console.log(utils)

let mainWindow
let day, month, year;
function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadFile('index.html')

  // let writeFile = fs.createWriteStream('tmp/' + filename);
  // console.log(writeFile)
  // let request = https.get(baseURL + fileLocation, function(response){
  //   response.pipe(writeFile)
  // })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  ipcMain.on('fetch', function(event, val){
    day = val.day;
    month = val.month;
    year = val.year;
    utils.createDirIfNotExist('tmp')
    utils.createDirIfNotExist('tmp/data')
    let writeFilePath = utils.createDirIfNotExist('tmp/download')
    let fileName = utils.constructFilename(day, month, year)
    let fileURL = utils.constructFileURL(day, month, year)
    utils.fetchFile(fileURL, path.join(writeFilePath,fileName), function(writeFile){
      console.log("fetched file " + writeFile)
      utils.unzipFiles(writeFile, utils.constructFilename(day, month, year, true), function(){
        console.log("Unzipped the file")
      })
    })
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
