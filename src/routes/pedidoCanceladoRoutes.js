const express = require('express');
const router = express.Router();
const pedidoCanceladoController = require('../controllers/pedidoCanceladoController');

router.post('/', pedidoCanceladoController.criarPedidoCancelado);
router.get('/', pedidoCanceladoController.listarPedidosCancelados);
router.get('/:id', pedidoCanceladoController.obterPedidoCancelado);
router.put('/:id', pedidoCanceladoController.atualizarPedidoCancelado);
router.delete('/:id', pedidoCanceladoController.excluirPedidoCancelado);

module.exports = router;
