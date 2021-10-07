const WalletUser = require('../models/walletHistory');
const WalletUserBal = require('../models/user_walletBalence');

let UserWalletService = {
    saveUserWallet: async (walletdetail) => {
        const newWalletUserBal = new WalletUserBal({
             user_id:walletdetail.user_id,
             walletBalence:walletdetail.walletBalence,
            
          
         })
        await newWalletUserBal.save();
        return newWalletUserBal;
    },

    getUserWallet: () => {
        return new Promise((resolve, reject) => {
            WalletUserBal.find((err, userWalletList) => {
            if (err) {
              reject(err);
            };
            resolve(userWalletList);
          });
        })
      },
    

      




}
module.exports = UserWalletService;