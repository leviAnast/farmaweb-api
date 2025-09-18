const favoritoService = require('../services/favoritoService');

class FavoritoController {
  async addFavorito(req, res) {
    try {
      const favorito = await favoritoService.addFavorito(req.body);
      res.status(201).json(favorito);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getFavoritoById(req, res) {
    try {
      const favorito = await favoritoService.getFavoritoById(req.params.id);
      res.json(favorito);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getFavoritosByUsuario(req, res) {
    try {
      const favoritos = await favoritoService.getFavoritosByUsuario(req.params.usuarioId);
      res.json(favoritos);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteFavorito(req, res) {
    try {
      await favoritoService.deleteFavorito(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new FavoritoController();
