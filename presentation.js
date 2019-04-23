var menu = require("./index");
var readline = require("readline");


var userCase = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

start();

function boucle() {
    userCase.question("Choisissez vite mais choisissez bien : \n>>>", function (choice) {
        if (choice == "1") {
            console.log(">> Recherche en cours du nom xxx")
            console.log("j'afficherai le menu...plus tard\n\n");
            menu.afficherMenu();
        }
        else if (choice == "99") {
            console.log("Au revoir \u2639");
            userCase.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
        }
    });
}

function start() {
    console.log("1. Rechercher un collègue par nom\n99. Sortir\n");
    boucle();
}







exports.run = start;










