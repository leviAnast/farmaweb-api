const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favoritoController');

router.post('/', favoritoController.addFavorito);
router.get('/:id', favoritoController.getFavoritoById);
router.get('/usuario/:usuarioId', favoritoController.getFavoritosByUsuario);
router.delete('/:id', favoritoController.deleteFavorito);

module.exports = router;
