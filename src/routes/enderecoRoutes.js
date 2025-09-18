const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');

router.get('/', (req, res) => enderecoController.getAllEnderecos(req, res));
router.get('/:id', (req, res) => enderecoController.getEnderecoById(req, res));
router.post('/', (req, res) => enderecoController.createEndereco(req, res));
router.put('/:id', (req, res) => enderecoController.updateEndereco(req, res));
router.delete('/:id', (req, res) => enderecoController.deleteEndereco(req, res));

module.exports = router;