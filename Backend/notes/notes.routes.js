const express = require('express');
const router = express.Router();
const notesController = require('./notes.controllers');
const authUser = require('../middlewares/authJwt');

router.get('/', notesController.getNotes);
router.get('/:id', authUser, notesController.getNoteById);
router.post('/', authUser, notesController.addNotes);
router.delete('/:id', authUser, notesController.deleteNote);
router.put('/:id', authUser, notesController.updateNote);
router.get('/search', authUser, notesController.searchNoteByKeywords);
router.post('/:id/share', authUser, notesController.shareNote);

module.exports = router;