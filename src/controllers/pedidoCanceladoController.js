const pedidoCanceladoService = require('../services/pedidoCanceladoService');

class PedidoCanceladoController {
  async criarPedidoCancelado(req, res) {
    try {
      const pedidoCancelado = await pedidoCanceladoService.createPedidoCancelado(req.body);
      res.status(201).json(pedidoCancelado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPedidoCanceladoById(req, res) {
    try {
      const pedidoCancelado = await pedidoCanceladoService.getPedidoCanceladoById(req.params.id);
      res.json(pedidoCancelado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPedidoCanceladoByPedido(req, res) {
    try {
      const pedidoCancelado = await pedidoCanceladoService.getPedidoCanceladoByPedido(req.params.pedidoId);
      res.json(pedidoCancelado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async atualizarPedidoCancelado(req, res) {
    try {
      const pedidoCancelado = await pedidoCanceladoService.updatePedidoCancelado(req.params.id, req.body);
      res.json(pedidoCancelado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletarPedidoCancelado(req, res) {
    try {
      await pedidoCanceladoService.deletePedidoCancelado(req.params.id);
      res.json({ message: 'Pedido cancelado deletado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PedidoCanceladoController();
