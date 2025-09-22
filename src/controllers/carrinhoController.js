const carrinhoService = require('../services/carrinhoService');

class CarrinhoController {
  async createCarrinho(req, res) {
    const carrinho = await carrinhoService.createCarrinho(req.body);
    res.status(201).json(carrinho);
  }

  async getCarrinhoById(req, res) {
    const { id } = req.params;
    const carrinho = await carrinhoService.getCarrinhoById(id);
    res.json(carrinho);
  }

  async getCarrinhosByUsuario(req, res) {
    const { usuario_id } = req.params;
    const carrinhos = await carrinhoService.getCarrinhosByUsuario(usuario_id);
    res.json(carrinhos);
  }

  async deleteCarrinho(req, res) {
    const { id } = req.params;
    await carrinhoService.deleteCarrinho(id);
    res.status(204).send();
  }

  async finalizarCarrinho(req, res) {
    const { id } = req.params;
    const carrinho = await carrinhoService.finalizarCarrinho(id);
    res.json(carrinho);
  }
}

module.exports = new CarrinhoController();
