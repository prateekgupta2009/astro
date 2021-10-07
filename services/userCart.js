const User_Cart = require('../models/userCart');


let User_cart_Service = {

    postusercartProduct: async (usercartdata) => {
        console.log(usercartdata.addone)
        const newUser_Cart = new User_Cart({
            user_id: usercartdata.user_id,
            addone:usercartdata.addone,
          
            usercart: [
                {
                     subcategory_id :usercartdata.subcategory_id,
                     warn_quantity :usercartdata.warn_quantity,
                     sku :usercartdata.sku,
                     weight_carat :usercartdata.weight_carat,
                     weight_ratti :usercartdata.weight_ratti,
                     product_id :usercartdata.product_id,
                     name :usercartdata.name,
                     regular_price_inr :usercartdata.regular_price_inr,
                     sell_price_inr :usercartdata.sell_price_inr,
                     sell_price_usd:usercartdata.sell_price_usd,
                     regular_price_usd :usercartdata.regular_price_usd,
                     key_feature :usercartdata.key_feature,
                     description :usercartdata.description,
                     disclaimer :usercartdata.disclaimer,
                     stock_quantity :usercartdata.stock_quantity,
                     image :usercartdata.image,
                     date :usercartdata.date,
                     quantity:usercartdata.quantity,

                     certificationPrice : usercartdata.certificationPrice,
                     EnergizationPrice: usercartdata.EnergizationPrice,         
                     certificationId : usercartdata.certificationId,
                     EnergizationId : usercartdata.EnergizationId,
                     energyWearer : usercartdata.energyWearer,
                     energyBirthPlace : usercartdata.energyBirthPlace,
                     energyDob : usercartdata.energyDob,
                     energytob : usercartdata.energytob,
                     energygotra : usercartdata.energygotra,

                }
             ]
        })
        await newUser_Cart.save();
        return newUser_Cart;
    },

    addusercartProduct: async(usercartdata) => {
        user_id = usercartdata.user_id;

        usercart =
        
            {
                subcategory_id :usercartdata.subcategory_id,
                warn_quantity :usercartdata.warn_quantity,
                sku :usercartdata.sku,
                weight_carat :usercartdata.weight_carat,
                weight_ratti :usercartdata.weight_ratti,
                product_id :usercartdata.product_id,
                name :usercartdata.name,
                regular_price_inr :usercartdata.regular_price_inr,
                sell_price_inr :usercartdata.sell_price_inr,
                sell_price_usd:usercartdata.sell_price_usd,
                regular_price_usd :usercartdata.regular_price_usd,
                key_feature :usercartdata.key_feature,
                description :usercartdata.description,
                disclaimer :usercartdata.disclaimer,
                stock_quantity :usercartdata.stock_quantity,
                image :usercartdata.image,
                date :usercartdata.date,
                quantity:usercartdata.quantity
            }
        

            User_Cart.findOneAndUpdate(
            { user_id: user_id },
            { $push: { usercart: usercart } }).exec();
    },
    
    deleteusercartProduct: async(usercartdata) => {
        user_id = usercartdata.user_id;

        usercart =
        
            {
                subcategory_id :usercartdata.subcategory_id,
                warn_quantity :usercartdata.warn_quantity,
                sku :usercartdata.sku,
                weight_carat :usercartdata.weight_carat,
                weight_ratti :usercartdata.weight_ratti,
                product_id :usercartdata.product_id,
                name :usercartdata.name,
                regular_price_inr :usercartdata.regular_price_inr,
                sell_price_inr :usercartdata.sell_price_inr,
                sell_price_usd:usercartdata.sell_price_usd,
                regular_price_usd :usercartdata.regular_price_usd,
                key_feature :usercartdata.key_feature,
                description :usercartdata.description,
                disclaimer :usercartdata.disclaimer,
                stock_quantity :usercartdata.stock_quantity,
                image :usercartdata.image,
                date :usercartdata.date,
                quantity:usercartdata.quantity
            }
        

            User_Cart.findOneAndUpdate(
            { user_id: user_id },
            { $pull: { usercart: usercart } }).exec();
    },





}
module.exports = User_cart_Service;