const produtoService = require('../services/produtoService.js');

class ProdutoController {
  async getAllProdutos(req, res) {
    try {
      const produtos = await produtoService.getAllProdutos();
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getProdutoById(req, res) {
    try {
      const produto = await produtoService.getProdutoById(req.params.id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createProduto(req, res) {
    try {
      const produto = await produtoService.createProduto(req.body);
      return res.status(201).json(produto);
    } catch (error) {
      if (error.code === 'P2003') {
        return res.status(400).json({ error: 'Categoria inválida' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async updateProduto(req, res) {
    try {
      const produto = await produtoService.updateProduto(req.params.id, req.body);
      return res.status(200).json(produto);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteProduto(req, res) {
    try {
      const deleted = await produtoService.deleteProduto(req.params.id);
      return res.status(200).json({ message: 'Produto excluído com sucesso', deleted });
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProdutoController();
