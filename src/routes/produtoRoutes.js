const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', (req, res) => produtoController.getAllProdutos(req, res));
router.get('/:id', (req, res) => produtoController.getProdutoById(req, res));
router.post('/', (req, res) => produtoController.createProduto(req, res));
router.put('/:id', (req, res) => produtoController.updateProduto(req, res));
router.delete('/:id', (req, res) => produtoController.deleteProduto(req, res));

module.exports = router;