let UserSmsOtp = require('../models/userSmsOtp');

let userSmsOtpService = {
    saveUserMessage: async (usersMsgs) => {
        const newUserSmsOtp = new UserSmsOtp({ mobileno: usersMsgs.mobileNo, otp: usersMsgs.otp })
        await newUserSmsOtp.save();
        return newUserSmsOtp;
    },
    checkUserOtp: async (userDetails) => {
        let userSmsOtp = await UserSmsOtp.findOne({ mobileno: userDetails.mobileNo, otp: userDetails.otp });
        return userSmsOtp;
    },

    getUserOtpList: () => {
        return new Promise((resolve, reject) => {
            UserSmsOtp.find((err, userotp) => {
            if (err) {
              reject(err);
            };
            resolve(userotp);
          });
        })
      }
}

module.exports = userSmsOtpService;