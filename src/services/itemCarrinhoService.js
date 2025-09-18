const prisma = require('../config/prismaClient.js');

class ItemCarrinhoService {
  async addItem(data) {
    return prisma.itemcarrinho.create({
      data: {
        carrinho_id: Number(data.carrinho_id),
        produto_id: Number(data.produto_id),
        quantidade: Number(data.quantidade),
        preco_unitario: Number(data.preco_unitario),
      },
    });
  }

  async getItemById(id) {
    return prisma.itemcarrinho.findUnique({
      where: { id: Number(id) },
      include: { produto: true },
    });
  }

  async getItensByCarrinho(carrinho_id) {
    return prisma.itemcarrinho.findMany({
      where: { carrinho_id: Number(carrinho_id) },
      include: { produto: true },
    });
  }

  async updateItem(id, data) {
    return prisma.itemcarrinho.update({
      where: { id: Number(id) },
      data: {
        quantidade: data.quantidade ? Number(data.quantidade) : undefined,
        preco_unitario: data.preco_unitario ? Number(data.preco_unitario) : undefined,
      },
    });
  }

  async deleteItem(id) {
    return prisma.itemcarrinho.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ItemCarrinhoService();
