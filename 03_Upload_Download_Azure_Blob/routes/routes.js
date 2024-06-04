const express = require('express');
const router = express.Router();
const {
    show,
    blobupload,
    blobdownload
} = require('../controllers/controllers');


// test page
router.route('/').get(show);

// upload
router.route('/blobupload').post(blobupload);

// download
router.route('/blobdownload').get(blobdownload);





module.exports = router;