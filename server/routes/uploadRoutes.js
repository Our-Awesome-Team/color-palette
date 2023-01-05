const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload, download, remove } = require('../controllers/uploadController');

router.route('/').post(protect, upload);
router.route('/files/:name').get(download).delete(protect, remove);

module.exports = router;
