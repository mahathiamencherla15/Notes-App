const fs = require('fs')

const getNotes =  () =>{
    return "Your notes"
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title == title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        }) 
        saveNotes(notes)
        return 1
    }
    else {
        return 0
    }  
}
 const removeNote = (title) => {
    const notes = loadNotes()

    const keepingNotes = notes.filter((note) => note.title !== title)
    if (notes.length - keepingNotes.length === 1) {
        saveNotes(keepingNotes)
        return 1
    }
    else {
        return 0
    }
 }

const listNotes = () => {
    const notes = loadNotes()
    
    notes.forEach((note) => {
        console.log(note.title)        
    })
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        const parseData = JSON.parse(dataJSON)
        
        return parseData
    } catch (err) {
        return []
    }
    
}


module.exports = {
    getNotes: getNotes, 
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}