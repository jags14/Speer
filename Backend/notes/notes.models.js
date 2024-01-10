const mongoose = require('mongoose');
// const User = require('../users/models/user.models');
const noteSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    // notesId: {type: mongoose.Schema.Types.UUID},
    title: {type: String, required: true},
    content: {type: String, required: true}

});

module.exports = mongoose.model('Notes', noteSchema);