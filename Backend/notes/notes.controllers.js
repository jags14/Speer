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
        userId: req.user.id,
        title: req.body.title,
        content: req.body.content,
    });
    newNote.save()
        .then(result => {
            res.status(201).json({
                message: 'Note created successfully'
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}

var deleteNote = (req, res, next) => {
    Notes.findById({notesId: req.params.id})
        .exec()
        .then(result => {

        })
    res.status(204);
}

var updateNote = (req, res, next) => {
    Notes.find({_id: req.body._id})
        .exec()
        .then()
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