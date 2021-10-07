const express = require('express');
const router = express.Router();
const estore_addonsService = require('../services/estore_addons');

router.get('/e_store_addoneList', async (req, res, next) => {
    try {
      const e_store_addoneList = await estore_addonsService.getEstore_addonsList();
      res.json(e_store_addoneList);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });


module.exports = router;