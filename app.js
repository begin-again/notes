const chalk = require('ansi-colors')
const yargs = require('yargs')

const notes = require('./notes')

yargs.version('1.1.0')

yargs.command('add', 'Add a new note',
  (yargs) => {
    const opts = yargs
      .option('title', {
        describe: 'note title',
        type: 'string',
        demandOption: true,
        group: 'Required:'
      })
      .option('body', {
        describe: 'note body',
        type: 'string',
        demandOption: true,
        group: 'Required:'
      })
    return opts
  }, (argv) => notes.addNote(argv.title, argv.body)
)
yargs.command('remove', 'remove note',
  (yargs) => {
    const opts = yargs
      .option('title', {
        describe: 'note title',
        type: 'string',
        demandOption: true,
        group: 'Required:'
      })
    return opts
  }, (argv) => notes.removeNote(argv.title)
)
yargs.command('list', 'list note', (argv) => notes.listNotes(argv.title))

yargs.command('read', 'read note',
  (yargs) => {
    const opts = yargs
      .option('title', {
        describe: 'note title',
        type: 'string',
        demandOption: true,
        group: 'Required:'
      })
    return opts
  },
  (argv) => notes.readNote(argv.title))

yargs.parse()
// console.info(yargs.argv)
