const askQuestionService = require('../models/askQuestionUser');


let AskQuestionUserService = {

    createAskquestionUser: async (data) => {
        const newaskQuestionService = new askQuestionService({
             user_id:data.user_id,
             first_name:data.first_name,
             last_name:data.last_name,
             email:data.email,
             mobile:data.mobile,
             birthplace:data.birthplace,
             birthstate:data.birthstate,
             birthCountry:data.birthCountry,
             dob:data.dob,
             tob:data.tob,
             language:data.language,
             noofquestion:data.noofquestion,
             question1:data.question1,
             question2:data.question2,
             question3:data.question3,
             replayquestion1:data.replayquestion1,
             replayquestion2:data.replayquestion2,
             replayquestion3: data.replayquestion3,
             status: data.status,
             totalPrice: data.totalPrice,
             perquestionprice: data.perquestionprice,
              currentOrderID:data.currentOrderID,
              paymentID :data.paymentID,
              gender:data.gender

        })


        await newaskQuestionService.save()
        return newaskQuestionService;
    },

    // add_estore_user: (estorDispatchrDetail) :> {
    //     user_id = estoreuserDetail.user_id;
    //     totalproductPrice = estoreuserDetail.totalproductPrice,

    //         address =
    //         {
    //             name: estoreuserDetail.name,
    //             streetAddress: estoreuserDetail.streetAddress,
    //             city: estoreuserDetail.city,
    //             landmark: estoreuserDetail.landmark,
    //             pincode: estoreuserDetail.pincode,
    //             phone: estoreuserDetail.phone,
    //         };

    //     estore_user.findOneAndUpdate(
    //         { user_id: user_id },
    //         { $push: { address: address } }).exec();
    // },





}
module.exports = AskQuestionUserService;