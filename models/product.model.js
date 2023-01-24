const {readFileSync, writeFileSync} = require('fs');
const {join} = require('path');
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'containers-us-west-110.railway.app',
    user: 'root',
    password: 'ooLWdIpRQAzlpwae8LwL',
    database: 'railway',
    port: '7232'
});

let products;

connection.connect();

connection.query('SELECT * FROM products', (err, rows, fields) => {
    if (err) throw err

    products = JSON.stringify(rows);
})

connection.end();


const model = {
    index: () => JSON.parse(products),
    one: id => model.index().find(e => e.id == id),
};
module.exports = model;
