const express = require('express');
const router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');

router.post('/', itemPedidoController.addItemPedido);
router.get('/:id', itemPedidoController.getItemPedidoById);
router.get('/pedido/:pedido_id', itemPedidoController.getItensByPedido);
router.put('/:id', itemPedidoController.updateItemPedido);
router.delete('/:id', itemPedidoController.deleteItemPedido);

module.exports = router;
