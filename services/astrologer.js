 Astrologer = require('../models/astrologer');
 AstrologerData = require('../models/astrologer')


let astrologerService = {
    saveAstrologer: async (signUpUser) => {
         newAstrologerData = new AstrologerData({ 
          name : signUpUser.name,
          gender: signUpUser.gender,
          dob : signUpUser.dob,
          religion : signUpUser.religion,
          email : signUpUser.email,
          mobile : signUpUser.mobile,
          password : signUpUser.password,
          address : signUpUser.address,
          country_id : signUpUser.country_id,
          city_id : signUpUser.city_id,
          state_id:signUpUser.state_id,
          status : signUpUser.status,
          about_us : signUpUser.about_us,
          featuredStatus : signUpUser.featuredStatus,
          experience : signUpUser.experience,
          rating : signUpUser.rating,
          salutation : signUpUser.salutation,
          image : signUpUser.image,
          image_path: signUpUser.image_path, 
          created_by:signUpUser.created_by
         })
        await newAstrologerData.save();
        return newAstrologerData;
        }
}
module.exports = astrologerService;