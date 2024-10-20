const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')

dotenv.config({path: `.env`})


const username =  process.env.DB_USER
const password = process.env.DB_PASS
const database = process.env.DB_NAME
const host = process.env.DB_HOST
const dialect = process.env.DB_DIALECT
const port = process.env.DB_PORT



const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: dialect,
})

module.exports = sequelize