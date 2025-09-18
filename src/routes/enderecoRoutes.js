const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

router.get('/', enderecoController.getAllEnderecos);
router.get('/:id', enderecoController.getEnderecoById);
router.post('/', enderecoController.createEndereco);
router.put('/:id', enderecoController.updateEndereco);
router.delete('/:id', enderecoController.deleteEndereco);

module.exports = router;