const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', (req, res) => categoriaController.getAll(req, res));
router.get('/:id', (req, res) => categoriaController.getById(req, res));
router.post('/', (req, res) => categoriaController.create(req, res));
router.put('/:id', (req, res) => categoriaController.update(req, res));
router.delete('/:id', (req, res) => categoriaController.delete(req, res));

module.exports = router;