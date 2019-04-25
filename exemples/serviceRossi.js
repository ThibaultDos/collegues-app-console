var request = require('request');



function rechercherColleguesParNom(nomRecherche, callbackOK, callbackKO) {



  request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, {

    json: true

  }, (err, res, body) => {



    if (err) {

      callbackKO('Serveur indispo');

    } else if (res.statusCode >= 400 && res.statusCode <= 499) {

      callbackKO('Erreur dans les informations de la requête');

    } else if (res.statusCode >= 500 && res.statusCode <= 599) {

      callbackKO('Erreur côté serveur');

    } else {



      var tabMatricules = body;

      var tableauCollegue = [];

      var nbRequetesATraiter = tabMatricules.length;



      tabMatricules.forEach(matricule => {



        rechercherColleguesParMatricule(matricule, (collegueTrouve) => {

          nbRequetesATraiter--; // ?

          tableauCollegue.push(collegueTrouve);



          if (nbRequetesATraiter === 0) {

            callbackOK(tableauCollegue);

          }



        });



      });

    }





  });

}



function rechercherColleguesParNom2(nomRecherche, callback) {



  request(`https://nicolas-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`, {

    json: true

  }, (err, res, body) => {



    var tabMatricules = body;



    function trouverCollegues(tabMats, tabResultats) {



      if (tabMats.length === 0) {

        callback([]);

      }



      var matricule = tabMats.pop();



      rechercherColleguesParMatricule(matricule, (collegueTrouve) => {

        tabResultats.push(collegueTrouve);



        if (tabMats.length > 0) {

          trouverCollegues(tabMats, tabResultats);

        } else {

          callback(tabResultats);

        }

      });





    }



    trouverCollegues(tabMatricules, []);



  });

}











function rechercherColleguesParMatricule(matricule, callback) {



  request(`https://nicolas-collegues-api.herokuapp.com/collegues/${matricule}`, {

    json: true

  }, function (err, res, body) {



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