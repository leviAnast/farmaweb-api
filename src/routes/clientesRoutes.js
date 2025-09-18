const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.get('/', (req, res) => clientesController.getAll(req, res));
router.get('/:id', (req, res) => clientesController.getById(req, res));
router.post('/', (req, res) => clientesController.create(req, res));
router.put('/:id', (req, res) => clientesController.update(req, res));
router.delete('/:id', (req, res) => clientesController.delete(req, res));

module.exports = router;