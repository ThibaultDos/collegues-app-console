var request = require('request');

function rechercherColleguesParNom(nomRecherche, callback) {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, { json: true }, function (err, res, body) {

        var tableauColleguesTrouves = body;
        var tableauCollegue = [];

        tableauColleguesTrouves.forEach(matricule => {

            rechercherColleguesParMatricule(matricule, (collegueTrouve) => {
                tableauCollegue.push(collegueTrouve);

                if (tableauCollegue.length == tableauColleguesTrouves.length) {
                    callback(tableauCollegue);
                }

            });
            
        });

    });
}

function rechercherColleguesParMatricule(matricule, callback) {

    request(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, { json: true }, function (err, res, body) {

        var colleguesTrouve = body;
        callback(colleguesTrouve);

    });
}

function creerUnCollegue(collegue) {
    request({
        url: `https://nicolas-collegues-api.herokuapp.com/collegues`,
        method: 'POST',
        json: true,
        body: collegue,
    });
}

exports.searchByName = rechercherColleguesParNom;
exports.creerCollegue = creerUnCollegue;