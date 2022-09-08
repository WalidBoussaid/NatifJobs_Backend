require('dotenv').config();
const debug = require('debug')
const {Sequelize} = require('sequelize');


//const from .env 
const DB_HOSTNAME = process.env.DB_HOSTNAME;
const DB_DBNAME = process.env.DB_DBNAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DIALECT = process.env.DB_DIALECT;

const sequelize = new Sequelize(DB_DBNAME,DB_USERNAME,DB_PASSWORD,{
    host:DB_HOSTNAME,
    dialect : DB_DIALECT,
    port:3306,
    logging: (msg) => debug(msg),
    logging : (msg ) => console.log(msg)

})

module.exports = sequelize