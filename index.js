const express = require('express')
const app = express()
const bodyParser = require('body-parser')

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const pRouter = require('./routes/PenggunaRouter')

app.get('/', (request, response) => {
    response.send("Selamat datang di RESTAPI Web JokiInformatikaYuk!")
})
app.use('/restapi/pengguna', pRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('Server berjalan di port ' + process.env.PORT)
})