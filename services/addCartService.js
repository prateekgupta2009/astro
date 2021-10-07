const AddCartProduct = require('../models/addCart');


let addCartService = {
    saveAddCartProduct: async (addCartProduct) => {
        const newAddCartProduct = new AddCartProduct({
            product_id: addCartProduct.product_id,
            name: addCartProduct.name,
            regular_price_inr: addCartProduct.regular_price_inr,
            sell_price_inr: addCartProduct.sell_price_inr,
            regular_price_usd: addCartProduct.regular_price_usd,
            sell_price_usd: addCartProduct.sell_price_usd,
            quantity: addCartProduct.quantity,
            sellername: addCartProduct.sellername,
            date: addCartProduct.date,
            image: addCartProduct.image,
        })
        await newAddCartProduct.save();
        return newAddCartProduct;
    },

    getAddCartProductList: () => {
        return new Promise((resolve, reject) => {
            AddCartProduct.find((err, addCartList) => {
                if (err) {
                    reject(err);
                };
                resolve(addCartList);
            });
        })
    },



}
module.exports = addCartService;


