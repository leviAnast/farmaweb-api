const pagamentoService = require('../services/pagamentoService');

class PagamentoController {
  async createPagamento(req, res) {
    try {
      const pagamento = await pagamentoService.createPagamento(req.body);
      res.status(201).json(pagamento);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getPagamentoById(req, res) {
    try {
      const pagamento = await pagamentoService.getPagamentoById(req.params.id);
      res.json(pagamento);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getPagamentosByPedido(req, res) {
    try {
      const pagamentos = await pagamentoService.getPagamentosByPedido(req.params.pedidoId);
      res.json(pagamentos);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async updatePagamento(req, res) {
    try {
      const pagamento = await pagamentoService.updatePagamento(req.params.id, req.body);
      res.json(pagamento);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deletePagamento(req, res) {
    try {
      await pagamentoService.deletePagamento(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new PagamentoController();
