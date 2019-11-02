const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const api = require('./routes/api')
const port = 3468

app.use(cookieParser())

app.all('/api/*', (req, res, next) => {
    console.log('what')
    next()
})

app.use('/api', api)

app.use(express.static('./build'))

app.listen(port)

console.log(`Server listening on ${port}`)