const {json} = require('express');
const mp = require('../modules/mercadoPago');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'containers-us-west-110.railway.app',
    user: 'root',
    password: 'ooLWdIpRQAzlpwae8LwL',
    database: 'railway',
    port: '7232'
});


module.exports = {
    process: async (req, res) => {
        try {
            let items = req.session.cart.map(item => Object({...item, currency_id: 'ARS', unit_price: item.price}));
            let link = await mp(items, 12, 0);

            let cart = JSON.stringify(items);

            let {nombre, apellido, email, telefono, direccion, cp, provincia} = req.body;

            connection.connect();
            let id;
            connection.query(`INSERT INTO users (nombre,apellido,email,telefono,direccion,cp,provincia) VALUES ('${nombre}','${apellido}','${email}','${telefono}','${direccion}','${cp}','${provincia}')`, (err, rows, fields) => {
                    if (err) throw err;
                    id = rows.insertId;

                    let sql = req.session.cart.map(item => `INSERT INTO orders (id_product, name, quantity, unit_price, order_id) VALUES ('${item.id}','${item.name}','${item.quantity}','${item.price} ','${id}')`);
                    sql.forEach(statement => {
                            connection.query(statement, (err, rows, fields) => {
                                if (err) throw err;
                            });
                        }
                    );
                    connection.end();


                }
            );

            console.log(cart);

            return res.redirect(link.body.init_point);
        } catch (error) {
            return res.send(error);
        }
    },
    feedback: (req, res) => {
        return res.send(req.query);
    },
};




