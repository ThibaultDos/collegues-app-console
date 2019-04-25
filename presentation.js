const menu = require("./index");

//importe TOUTES les fonctions exportées depuis la page service.js
const ServicePresentation = require("./service");
let service = new ServicePresentation();
const readline = require("readline");

const userCase = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const userChoice = () => {
    userCase.question("Choisissez vite mais choisissez bien : \n>>> ", choice => {
        if (choice == "1") {
            userCase.question("Entrez un nom à rechercher (Huasca par exemple) : \n>>> ", nom => {
                console.log(`Recherche en cours pour le nom ${nom} ...`);
                service.rechercherColleguesParNom(nom)
                .then(tableauCollegue => {
                    tableauCollegue.forEach(collegue => {
                        console.log(`${collegue.nom} ${collegue.prenoms} (${collegue.dateDeNaissance})`);

                    });
                    menu.afficherMenu();
                    userChoice();
                }, (messageErr) => {
                    console.log("Ousp : ", messageErr);
                    menu.afficherMenu();
                    userChoice();

                });
            });
        } else if (choice == "2") {
            const collegue = {
                nom: "Fonfec",
                prenoms: "Sophie",
                dateDeNaissance: "666-6-6",
                photoUrl: "http://img.jpg",
            }
        } else if (choice == "99") {
            console.log("Au revoir \u2639");
            userCase.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
        } else {
            const ruto = "I AM ERROR."
            const saisieIncorrecte = "Cette saisie n'est pas valide."
            const nouvelleSaisie = "Pas de panique, vous aurez une nouvelle chance.\nASTUCE : essayez une saisie légale."
            console.log(`${ruto}\n${saisieIncorrecte}\n${nouvelleSaisie}\n`);
            menu.afficherMenu();
            userChoice();
        }
    });
}

const run = () => {
    afficherMenu = "1. Rechercher un collègue par nom\n99. Sortir\n";
    console.log(afficherMenu);
    userChoice();
}

exports.run = run;