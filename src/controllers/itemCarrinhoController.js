const itemCarrinhoService = require('../services/itemCarrinhoService');

class ItemCarrinhoController {
  async addItem(req, res) {
    const item = await itemCarrinhoService.addItem(req.body);
    res.status(201).json(item);
  }

  async getItemById(req, res) {
    const { id } = req.params;
    const item = await itemCarrinhoService.getItemById(id);
    res.json(item);
  }

  async getItensByCarrinho(req, res) {
    const { carrinho_id } = req.params;
    const itens = await itemCarrinhoService.getItensByCarrinho(carrinho_id);
    res.json(itens);
  }

  async updateItem(req, res) {
    const { id } = req.params;
    const item = await itemCarrinhoService.updateItem(id, req.body);
    res.json(item);
  }

  async diminuirItem(req, res) {
    const { id } = req.params;
    const item = await itemCarrinhoService.diminuirQuantidade(id);
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    res.json(item);
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    await itemCarrinhoService.deleteItem(id);
    res.status(204).send();
  }
}

module.exports = new ItemCarrinhoController();
