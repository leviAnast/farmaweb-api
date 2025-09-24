const cartaoService = require('../services/cartaoService');

class CartaoController {
  async createCartao(req, res) {
    const cartao = await cartaoCredito.createCartao(req.body);
    res.status(201).json(cartao);
  }

  async getCartaoById(req, res) {
    const { id } = req.params;
    const cartao = await cartaoCredito.getCartaoById(id);
    res.json(cartao);
  }

  async getCartoesByCliente(req, res) {
    const { cliente_id } = req.params;
    const cartoes = await cartaoCredito.getCartoesByCliente(cliente_id);
    res.json(cartoes);
  }

  async updateCartao(req, res) {
    const { id } = req.params;
    const cartao = await cartaoCredito.updateCartao(id, req.body);
    res.json(cartao);
  }

  async deleteCartao(req, res) {
    const { id } = req.params;
    await cartaoCredito.deleteCartao(id);
    res.status(204).send();
  }
}

module.exports = new CartaoController();
