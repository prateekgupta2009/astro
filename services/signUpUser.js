 const SignUpUser = require('../models/signUpUser');


 let signUpUserService = {
    saveSignUpUser: async (signUpUser) => {
        const newSignUpUser = new SignUpUser({ 
            first_name: signUpUser.first_name,
            last_name: signUpUser.last_name,
            signupEmail:signUpUser.signupEmail,
            mobileNo: signUpUser.mobileNo,
            signupPassword: signUpUser.signupPassword
         })
        await newSignUpUser.save();
        return newSignUpUser;
    },

    getSignUpUserList: () => {
        return new Promise((resolve, reject) => {
            SignUpUser.find((err, signUpUserList) => {
            if (err) {
              reject(err);
            };
            resolve(signUpUserList);
          });
        })
      },
    

      
}
module.exports = signUpUserService;


