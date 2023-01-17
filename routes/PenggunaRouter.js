const express = require('express')
const pRouter = express.Router()

const PenggunaController = require('../controllers/PenggunaController')

pRouter.get('/', PenggunaController.getAllPengguna)
pRouter.get('/:id', PenggunaController.getPenggunaById)
pRouter.post('/', PenggunaController.createPengguna)
pRouter.put('/:id', PenggunaController.updatePengguna)
pRouter.delete('/:id', PenggunaController.deletePengguna)

module.exports = pRouter