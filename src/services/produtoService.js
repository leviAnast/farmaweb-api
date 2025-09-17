const prisma = require('../config/prismaClient.js');

class ProdutoService {
  async getAllProdutos() {
    return prisma.produto.findMany({
      include: { categoria: true, favoritos: true },
    });
  }

  async getProdutoById(id) {
    return prisma.produto.findUnique({
      where: { id: Number(id) },
      include: { categoria: true, favoritos: true },
    });
  }

  async createProduto(data) {
    return prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        qtd_estoque: data.qtd_estoque,
        prescricao: data.prescricao || false,
        data_validade: data.data_validade,
        categoria: { connect: { id: Number(data.categoria_id) } },
      },
    });
  }

  async updateProduto(id, data) {
    return prisma.produto.update({
      where: { id: Number(id) },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        qtd_estoque: data.qtd_estoque,
        prescricao: data.prescricao,
        data_validade: data.data_validade,
        categoria_id: data.categoria_id ? Number(data.categoria_id) : undefined,
      },
    });
  }

  async deleteProduto(id) {
    return prisma.produto.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ProdutoService();