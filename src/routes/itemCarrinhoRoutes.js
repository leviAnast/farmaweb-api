const express = require('express');
const router = express.Router();
const itemCarrinhoController = require('../controllers/itemCarrinhoController');

router.post('/', (req, res) => itemCarrinhoController.addItem(req, res));
router.get('/:id', (req, res) => itemCarrinhoController.getItemById(req, res));
router.get('/carrinho/:carrinho_id', (req, res) => itemCarrinhoController.getItensByCarrinho(req, res));
router.put('/:id', (req, res) => itemCarrinhoController.updateItem(req, res));
router.delete('/:id', (req, res) => itemCarrinhoController.deleteItem(req, res));

module.exports = router;
