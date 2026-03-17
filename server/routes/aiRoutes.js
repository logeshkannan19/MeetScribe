const express = require('express');
const { processMeeting } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/process', protect, upload.single('audio'), processMeeting);

module.exports = router;
