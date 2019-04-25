const request = require('request-promise-native');

const ruto = "I AM ERROR.";

const rechercherColleguesParNomAssynchrone = (nomRecherche) => {
    return request(`https://dosanjos-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`,
        { json: true })
        .then(tabMatricules => {
            const tabPromesses2 = tabMatricules.map(matricule => request(`https://dosanjos-collegues-api.herokuapp.com/collegues/${matricule}`, {
                json: true
            }));

                return Promise.all(tabPromesses2);
            });







    (err, res, body) => {

        if (err) {
            reject(`${ruto}\nServeur indispo`);
        } else if (res.statusCode >= 400 && res.statusCode <= 499) {
            reject(`${ruto}\nErreur dans les informations de la requête`);
        } else if (res.statusCode >= 500 && res.statusCode <= 599) {
            reject(`${ruto}\nErreur côté serveur`);
        } else {
            const tableauMatricules = body;
            const tableauCollegue = [];
            let nbRequetesATraiter = tableauMatricules.length;
            tableauMatricules.forEach(matricule => {
                rechercherColleguesParMatricule(matricule, (promiseFindByName$) => {
                    nbRequetesATraiter--;
                    tableauCollegue.push(promiseFindByName$);

                    if (nbRequetesATraiter == 0) {
                        resolve(tableauCollegue);
                    }
                });
            });
        }
    }

}

const rechercherColleguesParNomSynchrone = (nomRecherche, callback) => {
    request(`https://dosanjos-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`,
        { json: true },
        (err, res, body) => {
            const tabMatricules = body;
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
        }
    );
}

const rechercherColleguesParMatricule = (matricule, callback) => {
    request(`https://dosanjos-collegues-api.herokuapp.com/collegues/${matricule}`,
        { json: true },
        function (err, res, body) {
            const colleguesTrouve = body;
            callback(colleguesTrouve);
        }
    );
}

exports.rechercherColleguesParNomAssynchrone = rechercherColleguesParNomAssynchrone;
exports.rechercherColleguesParNomSynchrone = rechercherColleguesParNomSynchrone;
exports.rechercherColleguesParMatricule = rechercherColleguesParMatricule;