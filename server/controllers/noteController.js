const Note = require('../models/Note');

/**
 * @desc    Get all meeting notes for the current user
 * @route   GET /api/notes
 * @access  Private
 */
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Get a single meeting note
 * @route   GET /api/notes/:id
 * @access  Private
 */
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Delete a meeting note
 * @route   DELETE /api/notes/:id
 * @access  Private
 */
exports.deleteNote = async (req, res) => {
  try {
    console.log(`[Notes] Deleting note: ${req.params.id}`);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    await note.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
