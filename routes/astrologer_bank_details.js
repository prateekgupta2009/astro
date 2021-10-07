const express = require('express');
const router = express.Router();
const astrologer_bankDetailService = require('../services/astrologer_bank_details');

router.get('/astrologer_bankDetail', async (req, res, next) => {
    try {
      const astrologer_bankDetail = await astrologer_bankDetailService.getAstrologer_bankDetailList();
      res.json(astrologer_bankDetail);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });


module.exports = router;