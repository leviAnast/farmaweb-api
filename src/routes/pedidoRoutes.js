const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', (req, res) => pedidoController.createPedido(req, res));
router.get('/:id', (req, res) => pedidoController.getPedidoById(req, res));
router.get('/usuario/:usuario_id', (req, res) => pedidoController.getPedidosByUsuario(req, res));
router.put('/:id', (req, res) => pedidoController.updatePedido(req, res));
router.delete('/:id', (req, res) => pedidoController.deletePedido(req, res));

module.exports = router;
