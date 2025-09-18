const prisma = require('../config/prismaClient.js');

class ItemCarrinhoService {
  async addItem(data) {
    return prisma.itemcarrinho.create({
      data: {
        quantidade: Number(data.quantidade),
        preco_unitario: Number(data.preco_unitario),
        carrinho: { // relacionamento com carrinho
          connect: { id: Number(data.carrinho_id) },
        },
        produto: { // relacionamento com produto
          connect: { id: Number(data.produto_id) },
        },
      },
      include: { produto: true, carrinho: true },
    });
  }

  async getItemById(id) {
    return prisma.itemcarrinho.findUnique({
      where: { id: Number(id) },
      include: {
        produto: true,
        carrinho: true,
      },
    });
  }

  async getItensByCarrinho(carrinho_id) {
    return prisma.itemcarrinho.findMany({
      where: {
        carrinho: {
          id: Number(carrinho_id),
        },
      },
      include: {
        produto: true,
        carrinho: true,
      },
    });
  }

  async updateItem(id, data) {
    return prisma.itemcarrinho.update({
      where: { id: Number(id) },
      data: {
        quantidade: data.quantidade ? Number(data.quantidade) : undefined,
        preco_unitario: data.preco_unitario ? Number(data.preco_unitario) : undefined,
        produto: data.produto_id
          ? { connect: { id: Number(data.produto_id) } }
          : undefined,
        carrinho: data.carrinho_id
          ? { connect: { id: Number(data.carrinho_id) } }
          : undefined,
      },
      include: { produto: true, carrinho: true },
    });
  }

  async deleteItem(id) {
    return prisma.itemcarrinho.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ItemCarrinhoService();
