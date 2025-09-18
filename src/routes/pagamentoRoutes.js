const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.post('/', pagamentoController.createPagamento);
router.get('/:id', pagamentoController.getPagamentoById);
router.get('/pedido/:pedidoId', pagamentoController.getPagamentosByPedido);
router.put('/:id', pagamentoController.updatePagamento);
router.delete('/:id', pagamentoController.deletePagamento);

module.exports = router;
