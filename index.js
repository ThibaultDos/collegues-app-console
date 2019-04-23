var menu = require("./presentation");


function afficherMenu() {

    console.log("** Administration Collegues **");
    menu.run();
}

afficherMenu();


exports.afficherMenu = afficherMenu;