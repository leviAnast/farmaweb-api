const express = require('express');
const router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');

router.post('/', (req, res) => itemPedidoController.addItemPedido(req, res));
router.get('/:id', (req, res) => itemPedidoController.getItemPedidoById(req, res));
router.get('/pedido/:pedido_id', (req, res) => itemPedidoController.getItensByPedido(req, res));
router.put('/:id', (req, res) => itemPedidoController.updateItemPedido(req, res));
router.delete('/:id', (req, res) => itemPedidoController.deleteItemPedido(req, res));

module.exports = router;
