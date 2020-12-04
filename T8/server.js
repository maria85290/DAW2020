const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const jsonfile = require('jsonfile')
const templates = require('./html-templates.js')
const logger = require('morgan')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    let d = new Date().toISOString().substr(0, 16)
    let files = jsonfile.readFileSync('./dbFiles.json')

    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.write(templates.fileList(files, d))
    res.end()
})

app.get('/files/upload', (req, res) => {
    let d = new Date().toISOString().substr(0, 16)
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.write(templates.fileForm(d))
    res.end()
})


app.get ('files/download/:fname', (req,res) => 
        res.download(_dirname + 'public/fileStore/' + req.params.fname))



app.post('/files', upload.single('myFile'), (req, res) => {
    let oldPath = __dirname + '/' + req.file.path
    let newPath = __dirname + '/public/fileStore/' + req.file.originalname

    fs.rename(oldPath, newPath, err => {
        if(err) throw err
    })

    let d = new Date().toISOString().substr(0, 16)
    let files = jsonfile.readFileSync('./dbFiles.json')

    files.push({
        date: d,
        name: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        description: req.body.description
    })

    jsonfile.writeFileSync('./dbFiles.json', files)

    res.redirect('/')
})

app.listen(7701, () => console.log('Servidor à escuta na porta 7701...'))
