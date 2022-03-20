const ipcRenderer = require('electron').ipcRenderer;

function sendForm(event) {
    event.preventDefault() // stop the form from submitting
    let firstname = document.getElementById("message").value;
    ipcRenderer.send('form-submission', firstname);
    appendMessage(firstname);
}

function appendMessage(data) {
    document.getElementById("messages").innerHTML += data + "\n";
}