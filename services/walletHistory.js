const WalletUser = require('../models/walletHistory');


let walletHistoryUserService = {

    postWalletHistory_user:async(rechargeDetail)=>  {
        const newWalletUser = new WalletUser({
            user_id:rechargeDetail.user_id,
            walletHistoryUser: [
                {
                     callPack:rechargeDetail.callPack,
                     discount:rechargeDetail.discount,
                     Bonus:rechargeDetail.Bonus,
                     amount_credited:rechargeDetail.amount_credited,
                      amount:rechargeDetail.amount,
                      amount_refunded:rechargeDetail.amount_refunded,
                      bank:rechargeDetail.bank,
                      captured:rechargeDetail.captured,
                      card_id:rechargeDetail.card_id,
                      contact:rechargeDetail.contact,
                      created_at:rechargeDetail.created_at,
                      currency:rechargeDetail.currency,
                      description:rechargeDetail.description,
                      email:rechargeDetail.email,
                      entity:rechargeDetail.entity,
                      error_code:rechargeDetail.error_code,
                      error_description:rechargeDetail.error_description,
                      error_reason:rechargeDetail.error_reason,
                      error_source:rechargeDetail.error_source,
                      error_step:rechargeDetail.error_step,
                      fee:rechargeDetail.fee,
                      payment_id:rechargeDetail.payment_id,
                      international:rechargeDetail.international,
                      invoice_id:rechargeDetail.invoice_id,
                      method:rechargeDetail.method,
                     // notes:rechargeDetail.notes,
                      order_id:rechargeDetail.order_id,
                      refund_status:rechargeDetail.refund_status,
                      status:rechargeDetail.status,
                      tax:rechargeDetail.tax,
                      vpa:rechargeDetail.vpa,
                      wallet:rechargeDetail.wallet
                }
             ]


        })
        await newWalletUser.save();
        return newWalletUser;
    },

    add_wallethistory_detail:(rechargeDetail)=>  {
        user_id=rechargeDetail.user_id;
        walletHistoryUser=
                {
                    callPack:rechargeDetail.callPack,
                    discount:rechargeDetail.discount,
                    Bonus:rechargeDetail.Bonus,
                    amount_credited:rechargeDetail.amount_credited,
                    amount:rechargeDetail.amount,
                    amount_refunded:rechargeDetail.amount_refunded,
                    bank:rechargeDetail.bank,
                    captured:rechargeDetail.captured,
                    card_id:rechargeDetail.card_id,
                    contact:rechargeDetail.contact,
                    created_at:rechargeDetail.created_at,
                    currency:rechargeDetail.currency,
                    description:rechargeDetail.description,
                    email:rechargeDetail.email,
                    entity:rechargeDetail.entity,
                    error_code:rechargeDetail.error_code,
                    error_description:rechargeDetail.error_description,
                    error_reason:rechargeDetail.error_reason,
                    error_source:rechargeDetail.error_source,
                    error_step:rechargeDetail.error_step,
                    fee:rechargeDetail.fee,
                    payment_id:rechargeDetail.payment_id,
                    international:rechargeDetail.international,
                    invoice_id:rechargeDetail.invoice_id,
                    method:rechargeDetail.method,
                   // notes:rechargeDetail.notes,
                    order_id:rechargeDetail.order_id,
                    refund_status:rechargeDetail.refund_status,
                    status:rechargeDetail.status,
                    tax:rechargeDetail.tax,
                    vpa:rechargeDetail.vpa,
                    wallet:rechargeDetail.wallet
                };

                WalletUser.findOneAndUpdate(
            { user_id: user_id },
            { $push: { walletHistoryUser: walletHistoryUser } },).exec();    
    },





}
module.exports = walletHistoryUserService;