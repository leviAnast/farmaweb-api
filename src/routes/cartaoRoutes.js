const express = require('express');
const router = express.Router();
const cartaoController = require('../controllers/cartaoController');

router.post('/', cartaoController.createCartao);
router.get('/:id', cartaoController.getCartaoById);
router.get('/cliente/:id', cartaoController.getCartoesByCliente);
router.put('/:id', cartaoController.updateCartao);
router.delete('/:id', cartaoController.deleteCartao);

module.exports = router;
