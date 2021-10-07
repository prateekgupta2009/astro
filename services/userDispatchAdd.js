const UserDispatchAdd = require('../models/userdispathAdd');


let userDispatchAddService = {
   saveuserDispatchAdd: async (data) => {
        newUserDispatchAdd = new UserDispatchAdd(data)
       await newUserDispatchAdd.save();
       return newUserDispatchAdd;
       },

       getuserDispatchAdd: () => {
         return new Promise((resolve, reject) => {
            UserDispatchAdd.find((err, list) => {
             if (err) {
               reject(err);
             };
             resolve(list);
           });
         })
       },
}
module.exports = userDispatchAddService;