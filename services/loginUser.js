const SignUpUser = require('../models/signUpUser');


let loginUserService = {

    checkloginuser: async (userDetails) => {
        let loginUser = await SignUpUser.find({ mobileNo: userDetails.mobileNo, signupPassword: userDetails.password })
            return loginUser
    }
}
module.exports = loginUserService;