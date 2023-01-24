const {Router} = require('express');
const router = Router();
const {index, listado, admin, addCart, cart, removeCart, pendin, procesed, failure, support, compra, devolucion, envio, notfound} = require('../controllers/main.controller');

router.get('/',index);
router.get('/adminmarcoslistapedidos',admin);
router.get('/productos', listado);
router.get('/cart', cart);
router.get('/pendin', pendin);
router.get('/procesed', procesed);
router.get('/failure', failure);
router.get('/soporte', support);
router.get('/atencion-al-cliente/compras', compra);
router.get('/atencion-al-cliente/entregas', envio);
router.get('/atencion-al-cliente/cambios-devoluciones', devolucion);
router.post('/cart/add',addCart);
router.post('/cart/delete',removeCart);
router.get('*', notfound)
module.exports = router