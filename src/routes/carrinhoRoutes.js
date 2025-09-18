const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.post('/', carrinhoController.createCarrinho);
router.get('/:id', carrinhoController.getCarrinhoById);
router.get('/usuario/:usuario_id', carrinhoController.getCarrinhosByUsuario);
router.delete('/:id', carrinhoController.deleteCarrinho);

module.exports = router;
