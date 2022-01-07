var fs = require("fs");
const http = require('http');

let fruits = ["apple","pear","banana","bamboo","ananass","arbuus"]

// http://localhost:8080/?q=pirn
function requestListener(req, res) {
    console.log(req.url)
    let otsingusõna = ""
    let filterResults

    console.log(req.url.includes("otsi"))
    if (req.url.includes("otsi"))
        otsingusõna = req.url.split("=")[1]
    if (otsingusõna == "")
        filterResults = fruits
    else
        filterResults = fruits.filter(fruit => fruit.startsWith(otsingusõna))

    console.log("otsingusõna", otsingusõna, filterResults)

    let html = "<html><head><title>Test</title></head><body>"
    html += "<form><input name='otsi' /><button>Filtreeri</button></form>"
    filterResults.forEach(fruit => html += fruit+"<br>")
    /*
    for (let i=0; i<fruits.length; i++)
        html += fruits[i]
    */
    
    html += "</body></html>"

    res.writeHead(200);
    res.end(html);
}

const server = http.createServer(requestListener);
server.listen(8080);
