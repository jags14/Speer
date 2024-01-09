const Notes = require('./notes.models');

var getNotes = (req, res, next) => {
    Notes.find()
        .exec()
        .then(notes => {
            if(!notes){
                res.status(404).json({
                    message: 'Notes not found'
                })
            } else {
                res.status(200).send({
                    notes: notes
                })
            }
        })
        .catch(err => {
            res.status(403).json({
                message: err
            })
        })
}

var addNotes = (req, res, next) => {
    const newNote = new Notes({
        
    })
}

var deleteNote = (req, res, next) => {
    res.status(204);
}

var updateNote = (req, res, next) => {
    res.status(201).json({
        'message': 'Note updated !'
    })
}

var shareNote = (req, res, next) => {
    res.status(200).json({})
}

module.exports = {
    getNotes,
    addNotes,
    deleteNote,
    updateNote,
    shareNote
}