const {index, one} = require('../models/product.model');
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'containers-us-west-110.railway.app',
    user: 'root',
    password: 'ooLWdIpRQAzlpwae8LwL',
    database: 'railway',
    port: '7232'
});


let orders;
let users;

connection.connect();
connection.query('SELECT * FROM orders', (err, rows, fields) => {
        if (err) throw err;
        orders = JSON.parse(JSON.stringify(rows));
    }
);

connection.query('SELECT * FROM users', (err, rows, fields) => {
        if (err) throw err;
        users = JSON.parse(JSON.stringify(rows));
    }
);

connection.end();


module.exports = {
    index: (req, res) => res.render('home', {}),
    admin: (req, res) => res.render('admin', {

        orders: orders,
        users: users,
        cache: false
    }),
    listado: (req, res) => res.render('index', {
        products: index(),
        styles: ['head']
    }),
    cart: (req, res) => res.render('cart', {}),
    procesed: (req, res) => res.render('procesed', {}),
    failure: (req, res) => res.render('failure', {}),
    pendin: (req, res) => res.render('pendin', {}),
    support: (req, res) => res.render('support', {}),
    notfound:(req, res) => res.render('Page-not-found', {}),
    compra:(req, res) => res.render('compra', {}),
    envio:(req, res) => res.render('envio', {}),
    devolucion:(req, res) => res.render('devoluciones', {}),
    addCart: (req, res) => {
        let product = one(req.body.id);

        if (req.session.cart.find(item => item.id == product.id)) {
            req.session.cart = req.session.cart.map(item => {
                if (item.id == product.id) {
                    item.quantity = item.quantity + 1;
                }
                return item;
            });
        } else {
            const carrito = req.session.cart.push({...product, quantity: 1});

        }
        return res.redirect('/productos');
    },
    removeCart: (req, res) => {
        req.session.cart = req.session.cart.filter(item => item.id != req.body.id);
        return res.redirect('/cart');
    },
};
