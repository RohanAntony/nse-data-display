// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let ipc = require('electron').ipcRenderer;

let month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

document.getElementById('fetch').onclick = function(){
  val = document.getElementById('nsedate').value;
  if(!val){
    document.getElementById('error').innerHTML = 'Please select a valid date'
    return;
  }
  document.getElementById('error').innerHTML = ''
  let date = new Date(val);
  ipc.send('fetch', {
    day: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '',
    month: month[date.getMonth()],
    year: (date.getUTCFullYear()) + ''
  })
}
