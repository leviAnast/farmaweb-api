const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.post('/', (req, res) => carrinhoController.createCarrinho(req, res));
router.get('/:id', (req, res) => carrinhoController.getCarrinhoById(req, res));
router.get('/usuario/:usuario_id', (req, res) => carrinhoController.getCarrinhosByUsuario(req, res));
router.delete('/:id', (req, res) => carrinhoController.deleteCarrinho(req, res));

module.exports = router;
