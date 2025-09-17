const express = require('express');
const router = express.Router();
const vendedoresController = require('../controllers/vendedoresController');    

router.get('/', vendedoresController.getAll);
router.get('/:id', vendedoresController.getById);
router.post('/', vendedoresController.create);
router.put('/:id', vendedoresController.update);
router.delete('/:id', vendedoresController.delete);

module.exports = router;
