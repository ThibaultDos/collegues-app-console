// récupération du module `readline`
var readline = require('readline');
var service = require('./service.js');
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var start = function () {

    console.log("1. Rechercher un collègue par nom");
    console.log("2. Créer un collègue");
    console.log("99. Sortir");
    rl.question('Faites un choix ? : ', function (saisie) {
        if (saisie == 1) {
            rl.question('Donner un nom ! : ', function (saisieNom) {
                console.log(`>> Recherche en cours du nom ${saisieNom}`);
                service.test(saisieNom, (colleguesTrouves) =>{
                    // affichage du tableau des collègues trouvés
                    colleguesTrouves.forEach(element => {
                        console.log(`${element.nom} ${element.prenoms} ${element.dateDeNaissance}`);
                    });
                });
                start();
            });
        }
        else if(saisie == 2){
            function Collegue(nom,prenom,dateDeNaissance,photoUrl,email){
                this.nom = nom;
                this.prenoms = prenom;
                this.dateDeNaissance = dateDeNaissance;
                this.photoUrl = photoUrl;
                this.email = email;
            }

            var collegue1 = new Collegue("Oddet","Rossi","2000-01-01","https://randomuser.me/api/portraits/men/76.jpg","fejfef@gmail.com");
            service.creerCollegue(collegue1);
        }
        else if (saisie == 99) {
            console.log("Au revoir");
            rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
        }
        else {
            console.log("Veulliez taper une réponse valide ! ");
        }
    });
}
exports.run = start;