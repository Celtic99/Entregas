const express = require('express')
const router = require('./routers/index')

const app = express()

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))

router(app);

module.exports = app