let fs = require('fs')
let path = require('path')
let urljoin = require('url-join')
let https = require('https')

let createDirIfNotExist = (dirname) => {
  let dirPath = path.join( __dirname, 'tmp')
  dirPath = path.join(dirPath, dirname)
  if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
  }
  console.log(dirPath)
  return dirPath
}

let constructFileURL = (day, month, year) => {
  let baseURL = 'https://www.nseindia.com/content/historical/EQUITIES/'
  let filename = constructFilename(day, month, year);
  let fileLocation = year + '/' + month + '/' + filename //format YYYY/MON/cmDDMONYYYYbhav.csv.zip
  //console.log(path.join(baseURL, fileLocation))
  return urljoin(baseURL, fileLocation)
}

let constructFilename = (day, month, year) => {
  return 'cm' + day + month + year + 'bhav.csv.zip'
}

let fetchFile = (url, writeFile, cb) => {
  console.log(url, writeFile)
  let file = fs.createWriteStream(writeFile);
  let request = https.get(url, function(response){
    response.pipe(file)
    cb()
  })
}

let utils = {
    createDirIfNotExist: createDirIfNotExist,
    constructFileURL: constructFileURL,
    constructFilename: constructFilename,
    fetchFile: fetchFile
}

module.exports = utils
