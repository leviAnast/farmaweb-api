const pedidoService = require('../services/pedidoService');

class PedidoController {
  async createPedido(req, res) {
    const pedido = await pedidoService.createPedido(req.body);
    res.status(201).json(pedido);
  }

  async getPedidoById(req, res) {
    const { id } = req.params;
    const pedido = await pedidoService.getPedidoById(id);
    res.json(pedido);
  }

  async getPedidosByUsuario(req, res) {
    const { usuario_id } = req.params;
    const pedidos = await pedidoService.getPedidosByUsuario(usuario_id);
    res.json(pedidos);
  }

  async updatePedido(req, res) {
    const { id } = req.params;
    const pedido = await pedidoService.updatePedido(id, req.body);
    res.json(pedido);
  }

  async deletePedido(req, res) {
    const { id } = req.params;
    await pedidoService.deletePedido(id);
    res.status(204).send();
  }
}

module.exports = new PedidoController();
