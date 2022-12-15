const {Pool} = require('pg');
const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: '307shopdb',
};

const db = new Pool(config);

module.exports = db;