const cartaoService = require('../services/cartaoService');

class CartaoController {
  async createCartao(req, res) {
    try {
      const cartao = await cartaoService.createCartao(req.body);
      res.status(201).json(cartao);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getCartaoById(req, res) {
    try {
      const { id } = req.params;
      const cartao = await cartaoService.getCartaoById(id);
      if (!cartao) return res.status(404).json({ message: "Cartão não encontrado" });
      res.json(cartao);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getCartoesByCliente(req, res) {
    try {
      const { id } = req.params;
      const cartoes = await cartaoService.getCartoesByCliente(id);
      res.json(cartoes);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async updateCartao(req, res) {
    try {
      const { id } = req.params;
      const cartao = await cartaoService.updateCartao(id, req.body);
      res.json(cartao);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteCartao(req, res) {
    try {
      const { id } = req.params;
      await cartaoService.deleteCartao(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new CartaoController();
