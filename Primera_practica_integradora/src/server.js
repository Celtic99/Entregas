const express = require('express')
const router = require('./routers/')
const mongoConnect = require('./db')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/chat', (req, res) => {
    res.render('chat')
  })

app.use(express.static(process.cwd() + '/src/public'))

app.get('/chat', (req, res) => {
    res.render('chat')
})

mongoConnect()

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))

router(app)

module.exports = app