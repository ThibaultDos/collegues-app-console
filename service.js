const request = require('request-promise-native');

const ruto = "I AM ERROR.";

module.exports = class Service {

    rechercherColleguesParNom(nomRecherche) {
        return request(`https://dosanjos-collegues-api.herokuapp.com/collegues?nom=${nomRecherche}`,
            { json: true })
            .then(tabMatricules => {
                const tabPromesses2 = tabMatricules.map(matricule => request(`https://dosanjos-collegues-api.herokuapp.com/collegues/${matricule}`, {
                    json: true
                }));
                return Promise.all(tabPromesses2);
            }
            );
    }

    rechercherColleguesParMatricule(matricule) {
        return request(`https://dosanjos-collegues-api.herokuapp.com/collegues/${matricule}`,
            { json: true },
        );
    }
}