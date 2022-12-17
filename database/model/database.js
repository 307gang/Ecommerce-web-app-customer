const e = require('express');
const {Pool} = require('pg');
require('dotenv').config();

const config = {
    host: process.env.DB_HOST,
    user:  process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const db = new Pool(config);

db.connect((err) => {
    if (err)
        console.log(err)
    else   
        console.log("Database connected");
});

module.exports = db;