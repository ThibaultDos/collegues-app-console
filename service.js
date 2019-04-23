var request = require('request');


function rechercherColleguesParNom(nomRecherche) {

    request('URL', { json: true }, function(err, res, body) {

        var tableauColleguesTrouves = body;


    });

}