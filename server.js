var fs = require("fs");         // Impordib node file-system library
const http = require('http');   // require abil saab koodi lisada ka enda teisi JS faile require("./minufail.js")

// Olek (state) või andmebaas
let fruits = ["apple","pear","banana","bamboo","ananass","arbuus"]

function addFruit(name) {
    fruits.push(name)
}

function removeFruit(name) {
    let position = fruits.indexOf(name)
    if (position !== -1)
        fruits.splice(position, 1)
}

/**
 * See funktsioon käivitub iga kord kui keegi kodulehte külastab
 * @param {*} req Request sees on kirjeldatud kasutaja soove
 * @param {*} res Response sellega saab saata kasutajale tagasi vastuse
 */
function requestListener(req, res) {
    console.log(req.url) // Prindib käsurea aknasse mis aadressi kasutaja brauseris avas
    let otsingusõna = ""
    let filterResults

    // Kas aadressi peal on kirjas käsklus lisada uus kanne
    if (req.url.includes("lisa")) {
        let nimiMidaLisada = req.url.split("=")[1]
        addFruit(nimiMidaLisada)
    }

    // Kas aadressi peal on kirjas kustutamise käsklus
    if (req.url.includes("kustuta")) {
        removeFruit( req.url.split("=")[1] )
    }

    // Kui meil on aadressi peal otsing siis proovime otsingusõna aadressist eraldada
    if (req.url.includes("otsi"))
        otsingusõna = req.url.split("=")[1]
    
    // Kui otsingusõna ei leitud siis näitame kasutajale kõiki tulemusi
    if (otsingusõna == "") {
        filterResults = fruits
    } else {
        // Teeme fruits arrayst koopia milles on ainult puuviljad mis algavad otsingusõnaga
        filterResults = fruits.filter(fruit => fruit.startsWith(otsingusõna))
    }

    // Paneme kokku HTML vastuse
    let html = "<html><head><title>Test</title></head><body>"
    html += "<form><input name='otsi' /><button>Filtreeri</button></form>"
    html += "<form><input name='lisa' /><button>Lisa uus</button></form>"
    html += "<form><input name='kustuta' /><button>Kustuta</button></form>"
    filterResults.forEach(fruit => html += fruit+"<br>")
    /*
    for (let i=0; i<fruits.length; i++) {
        let fruit = fruits[i]
        html += fruit+"<br>"
    }
    */
    
    html += "</body></html>"

    // Saadame HTMLi tagasi kasutajale
    res.writeHead(200); // Ütleb brauserile, et päringu täitmine läks plaanipäraselt
    res.end(html); // Saadab kirja teele
}

const server = http.createServer(requestListener);
server.listen(8080);
