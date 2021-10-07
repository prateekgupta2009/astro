const User_address = require('../models/userAddress');


let EstoreDispatchUserService = {

    postEstore_user: async (addressdata) => {
        const newUser_address = new User_address({
            user_id: addressdata.user_id,
          
            address: [
                {
                  name:addressdata.name,
                  streetAddress:addressdata.streetAddress,
                  city:addressdata.city,
                  landmark:addressdata.landmark,
                  pincode:addressdata.pincode,
                  phone:addressdata.phone,
                  country:addressdata.country
                }
             ]
        })
        await newUser_address.save();
        return newUser_address;
    },

    addUser_Address: async(addressdata) => {
        user_id = addressdata.user_id;
        totalproductPrice = addressdata.totalproductPrice,

            address =
            {
                name: addressdata.name,
                streetAddress: addressdata.streetAddress,
                city: addressdata.city,
                landmark: addressdata.landmark,
                pincode: addressdata.pincode,
                phone: addressdata.phone,
            };

            User_address.findOneAndUpdate(
            { user_id: user_id },
            { $push: { address: address } }).exec();
    },





}
module.exports = EstoreDispatchUserService;