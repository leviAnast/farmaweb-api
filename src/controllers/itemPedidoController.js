const itemPedidoService = require('../services/itemPedidoService');

class ItemPedidoController {
  async addItemPedido(req, res) {
    const item = await itemPedidoService.addItemPedido(req.body);
    res.status(201).json(item);
  }

  async getItemPedidoById(req, res) {
    const { id } = req.params;
    const item = await itemPedidoService.getItemPedidoById(id);
    res.json(item);
  }

  async getItensByPedido(req, res) {
    const { pedido_id } = req.params;
    const itens = await itemPedidoService.getItensByPedido(pedido_id);
    res.json(itens);
  }

  async updateItemPedido(req, res) {
    const { id } = req.params;
    const item = await itemPedidoService.updateItemPedido(id, req.body);
    res.json(item);
  }

  async deleteItemPedido(req, res) {
    const { id } = req.params;
    await itemPedidoService.deleteItemPedido(id);
    res.status(204).send();
  }
}

module.exports = new ItemPedidoController();
