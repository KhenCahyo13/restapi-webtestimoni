const { request, response, json } = require('express')
const pool = require('../config/Database')

const PenggunaController = {
    getAllPengguna: async (request, response) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM pengguna")
            response.status(201).json({ data: rows })
        } catch (error) {
            console.log(error)
            response.json({
                status: error
            })
        }
    },

    getPenggunaById: async (request, response) => {
        try {
            const { id } = request.params
            const [rows, fields] = await pool.query("SELECT * FROM pengguna WHERE id = ?", [id])
            response.status(201).json({ data: rows })
        } catch (error) {
            console.log(error)
            response.json({
                status: "error"
            })
        }
    },

    createPengguna: async (request, response) => {
        try {
            const { nama_pengguna, email, password, konfPassword } = request.body
            if (konfPassword !== password) {
                response.status(501).json({ msg: "Password dan Konfirmasi Password harus sama" })
            } else {
                const query = "INSERT INTO pengguna (nama_pengguna, email, password) values (?, ?, ?)"
                const [rows, fields] = await pool.query(query, [nama_pengguna, email, password])
                response.status(200).json({ msg: "Akun berhasil dibuat" })
            }
        } catch (error) {
            console.log(error)
            response.json({
                status: "error"
            })
        }
    },

    updatePengguna: async (request, response) => {
        try {
            const { nama_pengguna, email, password, konfPassword } = request.body
            const { id } = request.params
            if (konfPassword !== password) {
                response.status(501).json({ msg: "Password dan Konfirmasi Password harus sama" })
            } else {
                const query = "UPDATE pengguna SET nama_pengguna = ?, email = ?, password = ? WHERE id = ?"
                const [rows, fields] = await pool.query(query, [nama_pengguna, email, password, id])
                response.status(201).json({ msg: "Data berhasil di update" })
            }
        } catch (error) {
            console.log(error)
            response.json({
                status: "error"
            })
        }
    },

    deletePengguna: async (request, response) => {
        try {  
            const { id } = request.params
            const [rows, fields] = await pool.query("DELETE FROM pengguna WHERE id_pengguna = ?", [ id ])
            response.status(200).json({ msg: "Data berhasil di hapus" })
        } catch (error) {
            console.log(error)
            json.response({
                status: "error"
            })
        }
    }
}

module.exports = PenggunaController