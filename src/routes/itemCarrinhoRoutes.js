const express = require('express');
const router = express.Router();
const itemCarrinhoController = require('../controllers/itemCarrinhoController');

router.post('/', itemCarrinhoController.addItem);
router.get('/:id', itemCarrinhoController.getItemById);
router.get('/carrinho/:carrinho_id', itemCarrinhoController.getItensByCarrinho);
router.put('/:id', itemCarrinhoController.updateItem);
router.delete('/:id', itemCarrinhoController.deleteItem);

module.exports = router;
