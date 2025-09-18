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
        preco: Number(data.preco),
        qtd_estoque: Number(data.qtd_estoque),
        prescricao: data.prescricao || false,
        data_validade: data.data_validade ? new Date(data.data_validade) : null,
        categoria: {
          connect: { id: Number(data.categoria_id) },
        },
      },
      include: { categoria: true },
    });
  }

  async updateProduto(id, data) {
    return prisma.produto.update({
      where: { id: Number(id) },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco ? Number(data.preco) : undefined,
        qtd_estoque: data.qtd_estoque ? Number(data.qtd_estoque) : undefined,
        prescricao: typeof data.prescricao === 'boolean' ? data.prescricao : undefined,
        data_validade: data.data_validade ? new Date(data.data_validade) : undefined,
        categoria: data.categoria_id
          ? { connect: { id: Number(data.categoria_id) } }
          : undefined,
      },
      include: { categoria: true },
    });
  }

  async deleteProduto(id) {
    return prisma.produto.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ProdutoService();