const Estore_addons = require('../models/estore_addons');


let estore_addonsService = {

   getEstore_addonsList: () => {
       return new Promise((resolve, reject) => {
        Estore_addons.find((err, estore_addonsList) => {
           if (err) {
             reject(err);
           };
           resolve(estore_addonsList);
         });
       })
     }
}
module.exports = estore_addonsService;