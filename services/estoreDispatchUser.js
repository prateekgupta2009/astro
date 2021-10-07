const estore_user = require('../models/estoreDispatch_user');


let EstoreDispatchUserService = {

    postEstore_user: async (estorDispatchrDetail) => {
        const newestoreUser = new estore_user({
            user_id: estorDispatchrDetail.user_id,
            totalproductPrice: estorDispatchrDetail.totalproductPrice,
            cartProduct: estorDispatchrDetail.cartProduct,
            name: estorDispatchrDetail.name,
            streetAddress: estorDispatchrDetail.streetAddress,
            city: estorDispatchrDetail.city,
            landmark: estorDispatchrDetail.landmark,
            pincode: estorDispatchrDetail.pincode,
            phone:estorDispatchrDetail.phone,
            status:estorDispatchrDetail.status,
            currentOrderID:estorDispatchrDetail.currentOrderID
        })
        await newestoreUser.save();
        return newestoreUser;
    },

    // add_estore_user: (estorDispatchrDetail) => {
    //     user_id = estoreuserDetail.user_id;
    //     totalproductPrice = estoreuserDetail.totalproductPrice,

    //         address =
    //         {
    //             name: estoreuserDetail.name,
    //             streetAddress: estoreuserDetail.streetAddress,
    //             city: estoreuserDetail.city,
    //             landmark: estoreuserDetail.landmark,
    //             pincode: estoreuserDetail.pincode,
    //             phone: estoreuserDetail.phone,
    //         };

    //     estore_user.findOneAndUpdate(
    //         { user_id: user_id },
    //         { $push: { address: address } }).exec();
    // },





}
module.exports = EstoreDispatchUserService;