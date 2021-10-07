const onlinePujaBookUser = require('../models/onlinePujaBookUser');


let OnlineBookPujaUserService = {

    postonlinePujaBookUser: async (onlinepujabookdetail) => {
        const newonlinePujaBookUser = new onlinePujaBookUser({
            paymentid:onlinepujabookdetail.paymentid,
             user_id:onlinepujabookdetail.user_id,
             pujaprice:onlinepujabookdetail.pujaprice,
             category_id:onlinepujabookdetail.category_id,
             online_puja_id:onlinepujabookdetail._id,
             details:onlinepujabookdetail.details,
             duration_number:onlinepujabookdetail.duration_number,
             duration_type:onlinepujabookdetail.duration_type,
             Puja_name:onlinepujabookdetail.Puja_name,
             regular_price_inr:onlinepujabookdetail.regular_price_inr,
             regular_price_usd:onlinepujabookdetail.regular_price_usd,
             sell_price_inr:onlinepujabookdetail.sell_price_inr,
             sell_price_usd:onlinepujabookdetail.sell_price_usd,
             sku:onlinepujabookdetail.sku,
             status:onlinepujabookdetail.status,
             benifit:onlinepujabookdetail.benifit,
             order_status:onlinepujabookdetail.order_status,
              currentOrderID:onlinepujabookdetail.currentOrderID, 

             BhojanAddonePrice : onlinepujabookdetail.BhojanAddonePrice,
             DakshinaAddonePrice : onlinepujabookdetail.DakshinaAddonePrice,
             BhojanAddoneId : onlinepujabookdetail.BhojanAddoneId,
             DakshinaAddoneId : onlinepujabookdetail.DakshinaAddoneId,
            addonlinePujaaddress: [
                {
                    name: onlinepujabookdetail.name,
                    dob: onlinepujabookdetail.dob,
                    gotr: onlinepujabookdetail.gotr,
                    phoneno: onlinepujabookdetail.phoneno,
                }
            ]
        })
        await newonlinePujaBookUser.save();
        return newonlinePujaBookUser;
    },

    // add_estore_user: (estorDispatchrDetail) :> {
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
module.exports = OnlineBookPujaUserService;