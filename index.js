const express = require('express')
const app = express()

require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const pRouter = require('./routes/PenggunaRouter')

app.get('/', (request, response) => {
    response.send("Selamat datang di RESTAPI Web JokiInformatikaYuk!")
})
app.use('/restapi/testimoni', pRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('Server berjalan di port' + process.env.PORT)
})