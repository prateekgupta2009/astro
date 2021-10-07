const express = require('express');
const router = express.Router();
const astrologerService = require('../services/astrologer');

router.post('/astrologerList', async (req, res, next) => {
    try {
      const name= req.body.name;
      const gender= req.body.gender;
      const dob = req.body.dob;
      const religion = req.body.religion;
      const email = req.body.email;
      const mobile = req.body.mobile;
      const password = req.body.password;
      const address = req.body.address;
      const country_id = req.body.country_id;
      const city_id = req.body.city_id;
      const state_id = req.body.state_id;
      const status = req.body.status;
      const about_us = req.body.about_us;
      const featuredStatus = req.body.featuredStatus;
      const experience = req.body.experience;
      const rating = req.body.rating;
      const salutation = req.body.salutation;
      const image = req.body.image;
      const image_path= req.body.image_path; 
      const created_by = req.body.created_by;
      const astrologerList = await astrologerService.saveAstrologer({
        name,gender,dob,religion,email,mobile,password,address,country_id,city_id,status,about_us,featuredStatus,experience,
        rating,salutation,image,image_path,created_by,state_id
      });
      res.json(astrologerList);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });


module.exports = router;