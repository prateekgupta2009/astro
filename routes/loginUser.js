const express = require('express');
const router = express.Router();
const loginUserService = require('../services/loginUser');
const SignUpUser = require('../models/signUpUser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');





// router.post('/loginuser',async (req, res, next) =>{
//     try {
//         const email =req.body.email;
//         const mobileNo = req.body.mobileNo;
//         const passowrd = req.body.password;
//         // await loginUserService.getSignUpUserList({ 
//         //     // username:username,signupEmail: signupEmail,mobileNo:mobileNo,signupPassword:signupPassword
//         //     email,mobileNo,passowrd
//         //  });
//         // res.send({ msg: 'valid user ...!' });
//         SignUpUser.findOne({
//             signupEmail:email,mobileNo:mobileNo,signupPassword:passowrd
//         }, function(err,result){
//             if(err){
//                 return err
//             }
//             if(result) {
//                 return result
//             }
//         })
//     } 
//     catch (err) {
//         console.log(err);
//         res.status(400).send('not valid user');
//         // return next(err);
//     }
// });

// router.get('/signupuser', async (req, res, next) => {
//     try {
//       const signUpUserList = await signUpUserService.getSignUpUserList();
//       res.json(signUpUserList);
//     } catch (err) {
//       console.log(err);
//       return next(err);
//     }
//   });

// router.post('/loginuser', async (req, res, next) => {
//     try {
//         const userDetails = req.body; // name, email, mobile, pass, otp
//         const loginuser = await loginUserService.checkloginuser(userDetails);
//         if (loginuser) {
//             //   valid Otp
//             res.send({ msg: 'logiUser is valid',
//             loginuser:loginuser
//            });
//         } else {
//             //   invalid Otp
//             res.send({ msg: 'loginUser not valid' }); 
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({ err });
//         // return next(err);
//     }
// });

router.post('/findloginUser/:id', async (req, res, next) => {

    console.log(req.params.id)
    SignUpUser.findById(req.params.id)
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.json({
                    msg: 'login user is not valid',
                })
            }
            else {

                res.status(200).json({

                    msg: 'login user is valid',
                    user: user,
                })
            }

        })
        .catch(err => {
            res.json({
                error: err
            })
        })

});

// update login user detail
router.patch('/updateuserDetail/:id', (req, res) => {
    const _id = req.params.id // Assigning id to _id which is a es6 feature. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const signupEmail = req.body.signupEmail;
    const mobileNo = req.body.mobileNo;

    SignUpUser.findByIdAndUpdate(_id,
        { first_name, last_name, signupEmail, mobileNo },
        (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Failed to update Detail..'
                })
            } else {
                res.status(200).json({
                    msg: 'your Detail updated..'
                })
            }
        }
    )
})


// router.post('/loginuser', async (req, res, next) => {
//     console.log(req.body)
//     var userDetail = req.body;
//     console.log(req.body)
//     SignUpUser.find({ mobileNo: userDetail.mobileNo, signupPassword: userDetail.signupPassword })
//         .exec()
//         .then(user => {
//             if (user.length < 1) {
//                 res.json({
//                     msg: 'logiUser is not valid',
//                 })
//             }
//             else {
//                 var token = jwt.sign({
//                     username: user[0].username,
//                     user_id: user[0]._id,
//                     useremail: user[0].signupEmail,
//                     userMobile: user[0].mobileNo,
//                     userPassword: user[0].signupPassword

//                 },
//                     "secret",
//                     {})
//                 res.status(200).json({

//                     msg: 'logiUser is valid',
//                     token: token,
//                     user: user,
//                     user_id: user[0].id


//                 })
//             }

//         })
//         .catch(err => {
//             res.json({
//                 error: err
//             })
//         })

// });
router.post('/loginuser', async (req, res, next) => {
    try {
        const mobileNo = req.body.mobileNo
        const signupPassword = req.body.signupPassword

        SignUpUser.findOne({ mobileNo: mobileNo }, (err, doc) => {
            if (err) {
                res.send({
                    msg: 'something Error',
                    err: err
                })
            }
            else {

                bcrypt.compare(signupPassword, doc.signupPassword, (err, valid) => {
                    if (err) {
                        res.send({
                            msg: 'Something Error'
                        })
                    }
                    else {
                        console.log(valid)
                        if (valid === false) {
                            res.send({
                                msg: 'logiUser is not valid',
                            })
                        }
                        else {
                            res.status(200).send({
                                msg:'logiUser is valid',
                                user:doc,
                                user_id: doc._id
                            })
                        }
                    }

                })


            }
        
        });
    }
    catch (err) {
    res.send({
        msg: "Something Error",
        err: err
    })
}
})


// for change password
router.post('/loginuservalid', async (req, res, next) => {

    var mobileNo = req.body.mobileNo;
    console.log(mobileNo)
    SignUpUser.find({ mobileNo })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(404).json({
                    msg: 'User MobileNo is not valid',
                })
            }
            else {

                res.status(201).json({

                    msg: 'User MobileNo is valid',
                    user: user,


                })
            }

        })
        .catch(err => {
            res.json({
                error: err
            })
        })

});

module.exports = router;