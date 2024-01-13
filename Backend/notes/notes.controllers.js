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
var getNoteById = async(req, res) => {
    const note = await Notes.findById({_id: req.params.id});
    if(!note){
        res.status(404).json({
            message: "Note by given ID doesn't exist"
        });
    }
    try {
       res.status(200).json({
        message: "Note found",
        note: note
       });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

var addNotes = (req, res, next) => {
    const newNote = new Notes({
        userId: req.userId,
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

var deleteNote = async (req, res) => {
    try {
        await Notes.findByIdAndDelete({id: req.body._id});
        res.status(204).json({
            message: "Note deleted"
        });
    } catch (error) {
        res.status(500).json({
            err: error
        });
    }
}

var updateNote = async (req, res) => {
    console.log("inside update notes controller");
    const noteId = req.params.id;
    const userId = req.user.id
    try {
        const note = await Notes.findOne({_id: noteId, user: userId});
        console.log("note: ",note);
        if (!note) {
            return res.status(404).json({ message: 'Note not found or you do not have permission to update it' });
        }
        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;
        await note.save();
        res.status(200).json({
            message: "Note updated",
            updatedNote: note
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

var searchNoteByKeywords = async (req, res) => {
    const filters = req.query;
    // console.log(filters);
    const notes = await Notes.findById({userId: req.body.userId});
    const filteredNotes = notes.notes.filter(note => {
        let isValid = true;
        for(key in filters){
            console.log(key, notes[key], filters[key]);
            isValid = isValid && note[key] == filters[key]
        }
        return isValid;
    });
    res.status(200).send(filteredNotes);
}

var shareNote = (req, res, next) => {
    res.status(200).json({

    })
}

module.exports = {
    getNotes,
    getNoteById,
    addNotes,
    deleteNote,
    updateNote,
    searchNoteByKeywords,
    shareNote
}