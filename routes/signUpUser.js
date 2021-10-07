const express = require('express');
const router = express.Router();
const signUpUserService = require('../services/signUpUser');
const SignUpUser = require('../models/signUpUser');
var bcrypt = require('bcryptjs');
var ObjectId = require('mongodb').ObjectId;
const saltRounds = 10;






router.post('/createsignupuser', async (req, res, next) => {
  console.log(req.body)
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const signupEmail = req.body.signupEmail;
    const mobileNo = req.body.mobileNo;
    const signupPassword = req.body.signupPassword;
    bcrypt.hash(signupPassword, saltRounds, async (err, hash) => {
      if (err) {
        res.send({
          msg: 'password create wrong',
          err: err
        })
        // console.log(err)
      }
      else {
        console.log(hash)
        await signUpUserService.saveSignUpUser({
          first_name, last_name, signupEmail, mobileNo, signupPassword: hash
        }).then(SignUpUser => {
          res.json({
            msg: 'SignUpUser added ...!', user: { first_name, last_name, signupEmail, mobileNo, signupPassword: hash }
            , SignUpUser: SignUpUser
          });
        })
          .catch(err => {
            res.send({
              msg: 'password create wrong or mobileNo already exist ',
              err: err
            })
          })
      }
    })
  }
  catch (err) {
    console.log(err)
    res.json(
      {
        msg: 'Account not Created'
      }
    );
  }


  // try {
  //   const first_name = req.body.first_name;
  //   const last_name = req.body.last_name;
  //   const signupEmail = req.body.signupEmail;
  //   const mobileNo = req.body.mobileNo;
  //   const signupPassword = req.body.signupPassword;

  //   await signUpUserService.saveSignUpUser({
  //     first_name,last_name, signupEmail, mobileNo, signupPassword
  //   }).then(SignUpUser=>{
  //     res.json({ msg: 'SignUpUser added ...!',user:{first_name,last_name, signupEmail, mobileNo, signupPassword}
  //        , SignUpUser:SignUpUser });
  //   })

  // } catch (err) {
  //   console.log(err);
  //   res.status(400).send({ err });
  // }
});
router.put('/updateuserpassword', (req, res, next) => {
  const mobileNo = req.body.mobileNo;
  const signupPassword = req.body.signupPassword;
  const user_id = req.body.user_id;
  const oldpassword = req.body.oldpassword
  console.log(req.body)

  try {
    SignUpUser.findOne({ "_id": ObjectId(user_id) }, (err, doc) => {
      if (err) {
        console.log(err,"4")
        res.send({
          msg: 'something Error',
          err: err
        })
      }
      else {

        bcrypt.compare(oldpassword, doc.signupPassword, (err, valid) => {
          if (err) {
            console.log(err,"3")

            res.send({
              msg: 'Something Error'
            })
          }
          else {
            console.log(valid)
            if (valid === false) {
              res.send({
                msg: 'Your old password is incorrect'
              })
            }
            else {
              bcrypt.hash(signupPassword, saltRounds, async (err, hash) => {
                if (err) {
                  console.log(err,"2")

                  res.send({
                    msg: 'password update wrong',
                    err:err
                  })
                }
                else {
                  SignUpUser.updateOne({ "_id": ObjectId(user_id) }, { signupPassword: hash }, (err, result) => {
                    if (err) {
                      console.log(err,"1")

                      res.status(400).send({
                        msg: "password update wrong",
                        err: err
                      })
                    }
                    else {

                      res.status(200).send({
                        msg: 'update your Password',
                        result: result
                      })
                    }
                  })
                }
              });
            }
          }

          })


      }
    })
  }
  catch (err) {
    console.log('Error' + err)
    res.send({
      msg: 'something error'
    })
  }
  // SignUpUser.updateOne({ mobileNo: mobileNo }, { signupPassword: signupPassword }, (err, result) => {
  //   if (err) {
  //     res.status(400).send({
  //       msg: err
  //     })
  //   }
  //   else {
  //     res.status(200).send({
  //       msg: 'update your Password',
  //       result: result
  //     })
  //   }
  // })
});


// router.post('/createsignupuser', async (req, res, next) => {
//   try {
//     const username = req.body.username;
//     const signupEmail = req.body.signupEmail;
//     const mobileNo = req.body.mobileNo;
//     const signupPassword = req.body.signupPassword;

//     await signUpUserService.saveSignUpUser({
//       // username:username,signupEmail: signupEmail,mobileNo:mobileNo,signupPassword:signupPassword
//       username, signupEmail, mobileNo, signupPassword
//     });

//     res.json({ msg: 'SignUpUser added ...!',user:{username, signupEmail, mobileNo, signupPassword} });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ err });
//     // return next(err);
//   }
// });

router.get('/signupuser', async (req, res, next) => {
  try {
    const signUpUserList = await signUpUserService.getSignUpUserList();
    res.json(signUpUserList);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

router.route('/updateuserdata/:id').patch((req, res) => {
  SignUpUser.findById(req.params.id)
    .then(userdata => {
      userdata.username = req.body.username;
      userdata.signupEmail = req.body.signupEmail;
      userdata.mobileNo = req.body.mobileNo;


      userdata.save()
        .then(() => res.json('Userdata updated !'))
        .catch(err => res.status(400).json('Error :' + err))

    })
    .catch(err => res.status(400).json('Error :' + err))
})

// find user by email and phoneno
router.post('/findusernumber', async (req, res, next) => {

  var userDetail = req.body;
  console.log(req.body)
  SignUpUser.find({ mobileNo: userDetail.mobileNo })
    .exec()
    .then(user => {
      if (user.length < 1) {
        res.json({
          msg: 'loginUser is not valid',
        })
      }
      else {

        res.status(200).json({

          msg: 'loginUser is valid',
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


// find emailid 
router.get('/signupuser', async (req, res, next) => {
  try {
    const signUpUserList = await signUpUserService.getSignUpUserList();
    res.json(signUpUserList);
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

router.route('/updateuserdata/:id').patch((req, res) => {
  SignUpUser.findById(req.params.id)
    .then(userdata => {
      userdata.username = req.body.username;
      userdata.signupEmail = req.body.signupEmail;
      userdata.mobileNo = req.body.mobileNo;


      userdata.save()
        .then(() => res.json('Userdata updated !'))
        .catch(err => res.status(400).json('Error :' + err))

    })
    .catch(err => res.status(400).json('Error :' + err))
})

// find user by email and phoneno
// router.post('/finduseremail', async (req, res, next) => {

//   var userDetail = req.body;
//   console.log(req.body)
//   SignUpUser.find({ signupEmail: userDetail.signupEmail })
//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         res.json({
//           msg: 'loginUser is not valid',
//         })
//       }
//       else {

//         res.status(200).json({

//           msg: 'loginUser is valid',
//           user: user,
//         })
//       }

//     })
//     .catch(err => {
//       res.json({
//         error: err
//       })
//     })

// });

// router.post('/finduseremail', async (req, res, next) => {

//   var userDetail = req.body;
//   console.log(req.body)
//   SignUpUser.find({ signupEmail: userDetail.signupEmail })
//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         res.json({
//           msg: 'loginUser is not valid',
//         })
//       }
//       else {

//         res.status(200).json({

//           msg: 'loginUser is valid',
//           user: user,
//         })
//       }

//     })
//     .catch(err => {
//       res.json({
//         error: err
//       })
//     })

// });
router.post('/finduseremail', async (req, res, next) => {

  const signupEmail=req.body.signupEmail;
  const mobileNo=req.body.mobileNo
  console.log(req.body)
  SignUpUser.find({ signupEmail:signupEmail})
    .exec()
    .then(user => {
      if (user.length < 1) {
        res.json({
          msg: 'loginUser email is not valid',
        })
      }
      else {

        res.status(200).json({

          msg: 'loginUser email is valid',
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

router.post('/finduserphoneno', async (req, res, next) => {

  const signupEmail=req.body.signupEmail;
  const mobileNo=req.body.mobileNo
  console.log(req.body)
  SignUpUser.find({ mobileNo:mobileNo})
    .exec()
    .then(user => {
      if (user.length < 1) {
        res.json({
          msg: 'loginUser mobile is not valid',
        })
      }
      else {

        res.status(200).json({

          msg: 'loginUser mobilenno is valid',
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


/// new signup api for web

// router.post('/findemailandmobileno', async (req, res, next) => {

// )}




module.exports = router;

