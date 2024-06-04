const express = require('express');
const router = express.Router();
const {
    getAllProducts, 
    testing
} = require('../controllers/controllers');



router.route('/').get(getAllProducts);
router.route('/static').get(testing);



module.exports = router;