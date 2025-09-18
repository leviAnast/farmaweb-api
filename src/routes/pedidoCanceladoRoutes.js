const express = require('express');
const router = express.Router();
const pedidoCanceladoController = require('../controllers/pedidoCanceladoController');

router.post('/', pedidoCanceladoController.criarPedidoCancelado); 
router.get('/:id', pedidoCanceladoController.getPedidoCanceladoById); 
router.get('/pedido/:pedidoId', pedidoCanceladoController.getPedidoCanceladoByPedido); 
router.put('/:id', pedidoCanceladoController.atualizarPedidoCancelado);
router.delete('/:id', pedidoCanceladoController.deletarPedidoCancelado); 

module.exports = router;
