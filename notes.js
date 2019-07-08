exports.addNote = addNote
exports.removeNote = removeNote
exports.listNotes = listNotes
exports.readNote = readNote

const fs = require('fs')
const color = require('ansi-colors')

const opts = { encoding: 'utf8' }
const logError = (msg) => console.error(color.red.bold.inverse(msg))
const logSuccess = (msg) => console.info(color.green.bold.inverse(msg))

function addNote (title, body) {
  const notes = loadNotes()
  const found = notes.find(note => note.title === title)

  if (found) {
    logError('note title already in use')
  } else {
    notes.push({ title: title, body: body })
    saveNotes(notes)
    logSuccess('new note added')
  }
}

function removeNote (title) {
  const notes = loadNotes()
  const notesToKeep = notes.filter(note => note.title !== title)
  if (notesToKeep.length === notes.length) {
    logError('no title found')
  } else {
    saveNotes(notesToKeep)
    logSuccess('removed note', title)
  }
}

function loadNotes () {
  try {
    return JSON.parse(fs.readFileSync('notes.json', opts))
  } catch (error) {
    return []
  }
}

function saveNotes (notes) {
  fs.writeFileSync('notes.json', JSON.stringify(notes))
}

function listNotes (title) {
  logSuccess('Your Notes')
  const notes = loadNotes()
  notes.map(note => console.log(note.title))
}

function readNote (title) {
  const notes = loadNotes()
  const found = notes.find(note => note.title === title)
  if (found) {
    console.info(`Title: ${color.bold.green(found.title)} -- Body: ${found.body}`)
  } else {
    logError('Note not found')
  }
}
