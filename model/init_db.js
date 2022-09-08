require('dotenv').config();
const debug = require('debug');
const mysql = require('mysql2');
const sequelize = require('./connection')
require('./schema');

//const from .env 
const DB_HOSTNAME = process.env.DB_HOSTNAME;
const DB_DBNAME = process.env.DB_DBNAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DIALECT = process.env.B_DIALECT;

const connection = mysql.createConnection({
    host: DB_HOSTNAME,
    user:DB_DBNAME,
    password:DB_PASSWORD,
    database: DB_DBNAME,
    port:3306
})

connection.query("create database" + process.env.DB_DBNAME, function (err, results, fields) {
    connection.close();
  });

//create tables
(async () => {

    debug("Synchronizing database...");
    await sequelize.sync({ force: true });
    debug("Database synchronized.");

    await sequelize.close();
  })()