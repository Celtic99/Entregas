const express = require('express')
const router = require('./routers/')
const mongoConnect = require('./db')

const app = express()

mongoConnect()

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))

router(app);

module.exports = app