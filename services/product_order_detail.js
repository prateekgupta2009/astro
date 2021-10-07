const Product_Order_Detail = require('../models/product_order_detail');


let User_cart_Service = {

    CreateProductOrderDetail: async (productorderdetail) => {
        console.log(productorderdetail)
        const newProduct_Order_Detail = new Product_Order_Detail({
            user_id: productorderdetail.user_id,
            userAddress_id:productorderdetail.userAddress_id,
            user_order_product:productorderdetail.item,
            totalproductPrice:productorderdetail.totalproductPrice,
            orderID:productorderdetail.orderID,
            paymentid:productorderdetail.paymentid
           
        })
        await newProduct_Order_Detail.save();
        return newProduct_Order_Detail;
    },

    addProductOrderDetail: async(usercartdata) => {
        user_id = usercartdata.user_id;

        productOrderDetails =
        
            {
                product_id : productorderdetail.product_id,
                order_id : productorderdetail.order_id,
                product_quantity : productorderdetail.product_quantity,
                product_total_amount : productorderdetail.product_total_amount,
                total_save : productorderdetail.total_save,
                tax_type : productorderdetail.tax_type,
                tax_rate : productorderdetail.tax_rate,
                is_deleted : productorderdetail.is_deleted,
                is_active : productorderdetail.is_active,
                edit_total_amount: productorderdetail.edit_total_amount,         
                edit_subtotal_amount : productorderdetail.edit_subtotal_amount,
                edit_taxable : productorderdetail.edit_taxable,
                edit_note : productorderdetail.edit_qty,
                edit_product_price : productorderdetail.edit_product_price,
                shipping_id : productorderdetail.shipping_id,
                delivery_charge : productorderdetail.delivery_charge,
                promo_amount : productorderdetail.promo_amount,
           
                promocode : productorderdetail.promocode,
                is_complete : productorderdetail.is_complete,
                delivery_status : productorderdetail.delivery_status,
                payment_mode : productorderdetail.payment_mode,
              
                payment_date : productorderdetail.payment_date,
                is_cancel : productorderdetail.is_cancel,
                delivery_date : productorderdetail.delivery_date,
                is_new : productorderdetail.is_new,
                completed_on : productorderdetail.completed_on,
           
                resion : productorderdetail.resion,
                delivery_boy_id : productorderdetail.delivery_boy_id,
                sale_type : productorderdetail.sale_type,
                edit_total_amount : productorderdetail.edit_total_amount,
                edit_subtotal : productorderdetail.edit_subtotal,
                subcategory_id : productorderdetail.subcategory_id,
                warn_quantity : productorderdetail.warn_quantity,
           
                sku : productorderdetail.sku,
                warn_quantity : productorderdetail.warn_quantity,
                weight_carat : productorderdetail.weight_carat,
                weight_ratti : productorderdetail.weight_ratti,
                name : productorderdetail.name,
                regular_price_inr : productorderdetail.regular_price_inr,
                regular_price_usd : productorderdetail.regular_price_usd,
                sell_price_inr : productorderdetail.sell_price_inr,
                sell_price_usd : productorderdetail.sell_price_usd,
                key_feature : productorderdetail.key_feature,
                description : productorderdetail.description,
                disclaimer : productorderdetail.disclaimer,
                stock_quantity : productorderdetail.stock_quantity,
                quantity : productorderdetail.quantity,
                date : productorderdetail.date,
                image : productorderdetail.image,
            }
        

            User_Cart.findOneAndUpdate(
            { user_id: user_id },
            { $push: { productOrderDetails: productOrderDetails } }).exec();
    },
    getOrderProductDetail: () => {
        return new Promise((resolve, reject) => {
            Product_Order_Detail.find((err, productorderdetaillist) => {
                if (err) {
                    reject(err);
                };
                resolve(productorderdetaillist);
            });
        })
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