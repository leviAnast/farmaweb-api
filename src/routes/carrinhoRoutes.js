const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.post('/', carrinhoController.createCarrinho);
router.get('/:id', carrinhoController.getCarrinhoById);
router.get('/usuario/:usuario_id', carrinhoController.getCarrinhosByUsuario);
router.put('/:id/finalizar', carrinhoController.finalizarCarrinho);
router.post('/:id/itens', carrinhoController.addItem);
router.put('/:id/itens', carrinhoController.updateItem);
router.delete('/:id/itens/:produto_id', carrinhoController.removeItem);
router.delete('/:id', carrinhoController.deleteCarrinho);

module.exports = router;
