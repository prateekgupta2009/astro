const estore_user = require('../models/estoreUseraddress');


let EstoreUserUserService = {

    postEstore_user:async(estoreuserDetail)=>  {
        const newestoreUser = new estore_user({
            user_id:estoreuserDetail.user_id,
            totalproductPrice:estoreuserDetail.totalproductPrice,
            address: [
                {
                  name:estoreuserDetail.name,
                  streetAddress:estoreuserDetail.streetAddress,
                  city:estoreuserDetail.city,
                  landmark:estoreuserDetail.landmark,
                  pincode:estoreuserDetail.pincode,
                  phone:estoreuserDetail.phone,
                  country:estoreuserDetail.country
                }
             ]
        })
        await newestoreUser.save();
        return newestoreUser;
    },

    add_estore_user:(estoreuserDetail)=>  {
        user_id=estoreuserDetail.user_id;
        totalproductPrice=estoreuserDetail.totalproductPrice,

        address=
                {
                     name:estoreuserDetail.name,
                     streetAddress:estoreuserDetail.streetAddress,
                     city:estoreuserDetail.city,
                     landmark:estoreuserDetail.landmark,
                     pincode:estoreuserDetail.pincode,
                     phone:estoreuserDetail.phone,
                     country:estoreuserDetail.country
                };

                estore_user.findOneAndUpdate(
            { user_id: user_id },
            { $push: { address: address} },).exec();    
    },
    getestore_Dispatch_user: () => {
        return new Promise((resolve, reject) => {
            estore_user.find((err, estore_dispatch_user) => {
            if (err) {
              reject(err);
            };
            resolve(estore_dispatch_user);
          });
        })
      },




}
module.exports = EstoreUserUserService;