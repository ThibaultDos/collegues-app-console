const menuPresentation = require("./presentation");

const afficherMenu = () => {

    console.log("** Administration Collegues **");
    menuPresentation.run();
}

afficherMenu();

exports.afficherMenu = afficherMenu;