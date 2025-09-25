const pedidoService = require('../services/pedidoService');

class PedidoController {
  async createPedido(req, res) {
    try {
      const { usuario_id, endereco_entrega_id, itens } = req.body;

      if (!usuario_id || !endereco_entrega_id || !itens || itens.length === 0) {
        return res.status(400).json({ error: "Campos obrigatórios: usuario_id, endereco_entrega_id e itens" });
      }

      const pedido = await pedidoService.createPedido(req.body);
      res.status(201).json(pedido);
    } catch (err) {
      console.error("Erro ao criar pedido:", err);
      res.status(500).json({ error: "Erro ao criar pedido" });
    }
  }

  async getPedidoById(req, res) {
    try {
      const { id } = req.params;
      const pedido = await pedidoService.getPedidoById(id);

      if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });

      res.json(pedido);
    } catch (err) {
      console.error("Erro ao buscar pedido:", err);
      res.status(500).json({ error: "Erro ao buscar pedido" });
    }
  }

  async getPedidosByUsuario(req, res) {
    try {
      const { usuario_id } = req.params;
      const pedidos = await pedidoService.getPedidosByUsuario(usuario_id);
      res.json(pedidos);
    } catch (err) {
      console.error("Erro ao listar pedidos:", err);
      res.status(500).json({ error: "Erro ao listar pedidos" });
    }
  }

  async updatePedido(req, res) {
    try {
      const { id } = req.params;
      const pedido = await pedidoService.updatePedido(id, req.body);

      if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });

      res.json(pedido);
    } catch (err) {
      console.error("Erro ao atualizar pedido:", err);
      res.status(500).json({ error: "Erro ao atualizar pedido" });
    }
  }

  async deletePedido(req, res) {
    try {
      const { id } = req.params;
      await pedidoService.deletePedido(id);
      res.status(204).send();
    } catch (err) {
      console.error("Erro ao deletar pedido:", err);
      res.status(500).json({ error: "Erro ao deletar pedido" });
    }
  }

  async cancelarPedido(req, res) {
    try {
      const { id } = req.params;
      const pedido = await pedidoService.cancelarPedido(id);

      if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });

      res.json(pedido);
    } catch (err) {
      console.error("Erro ao cancelar pedido:", err);
      res.status(500).json({ error: "Erro ao cancelar pedido" });
    }
  }
}

module.exports = new PedidoController();
