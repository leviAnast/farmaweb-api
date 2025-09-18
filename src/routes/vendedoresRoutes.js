const express = require('express');
const router = express.Router();
const vendedoresController = require('../controllers/vendedoresController');

router.get('/', (req, res) => vendedoresController.getAll(req, res));
router.get('/:id', (req, res) => vendedoresController.getById(req, res));
router.post('/', (req, res) => vendedoresController.create(req, res));
router.put('/:id', (req, res) => vendedoresController.update(req, res));
router.delete('/:id', (req, res) => vendedoresController.delete(req, res));

module.exports = router;