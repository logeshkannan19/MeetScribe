const express = require('express');
const { getNotes, getNote, deleteNote } = require('../controllers/noteController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(getNotes);
router.route('/:id').get(getNote).delete(deleteNote);

module.exports = router;
