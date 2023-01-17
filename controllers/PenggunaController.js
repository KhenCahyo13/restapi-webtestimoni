const pool = require('../config/Database')
const bcrypt = require('bcrypt')

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
            const [rows, fields] = await pool.query("SELECT * FROM pengguna WHERE id_pengguna = ?", [id])
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
            const { nama, email, password, konfPassword } = request.body
            const saltRounds = 10;
            const hashedPassword =  await bcrypt.hash(password, saltRounds)

            if (password !== konfPassword) {
                response.status(400).json({ msg: "Password dan Konfirmasi Password harus sama" })
            } else {
                const query = 'INSERT INTO pengguna (nama_pengguna, email, password, level) VALUES (?, ?, ?, ?)'
                const [result] = await pool.query(query, [nama, email, hashedPassword, "Admin"]);
                response.status(201).json({ msg: "Data berhasil dibuat", data: result })
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({ status: error })
        }
    },

    updatePengguna: async (request, response) => {
        try {
            const { nama, email, password, konfPassword } = request.body
            const saltRounds = 10;
            const hashedPassword =  await bcrypt.hash(password, saltRounds)
            const { id } = request.params
            if (konfPassword !== password) {
                response.status(400).json({ msg: "Password dan Konfirmasi Password harus sama" })
            } else {
                const query = 'UPDATE pengguna SET nama_pengguna = ?, email = ?, password = ? WHERE id_pengguna = ?'
                const [rows, fields] = await pool.query(query, [nama, email, hashedPassword, id])
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