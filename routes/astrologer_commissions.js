const express = require('express');
const router = express.Router();
const astrologer_commissionsService = require('../services/astrologer_commissions');

router.get('/astrologer_commissions', async (req, res, next) => {
    try {
      const astrologer_commissions = await astrologer_commissionsService.getAstrologer_commissionsList();
      res.json(astrologer_commissions);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });


module.exports = router;