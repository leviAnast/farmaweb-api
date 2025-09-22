const prisma = require('../config/prismaClient.js');

class ItemCarrinhoService {
  async addItem(data) {
    const existente = await prisma.itemcarrinho.findFirst({
      where: {
        carrinho_id: Number(data.carrinho_id),
        produto_id: Number(data.produto_id),
      },
    });

    if (existente) {
      return prisma.itemcarrinho.update({
        where: { id: existente.id },
        data: {
          quantidade: existente.quantidade + Number(data.quantidade || 1),
        },
        include: { produto: true, carrinho: true },
      });
    }

    const produto = await prisma.produto.findUnique({
      where: { id: Number(data.produto_id) },
    });

    return prisma.itemcarrinho.create({
      data: {
        quantidade: Number(data.quantidade) || 1,
        preco_unitario: Number(produto.preco),
        carrinho: { connect: { id: Number(data.carrinho_id) } },
        produto: { connect: { id: Number(data.produto_id) } },
      },
      include: { produto: true, carrinho: true },
    });
  }

  async getItemById(id) {
    return prisma.itemcarrinho.findUnique({
      where: { id: Number(id) },
      include: { produto: true, carrinho: true },
    });
  }

  async getItensByCarrinho(carrinho_id) {
    return prisma.itemcarrinho.findMany({
      where: { carrinho_id: Number(carrinho_id) },
      include: { produto: true, carrinho: true },
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

  async diminuirQuantidade(id) {
    const item = await prisma.itemcarrinho.findUnique({ where: { id: Number(id) } });
    if (!item) return null;

    if (item.quantidade > 1) {
      return prisma.itemcarrinho.update({
        where: { id: Number(id) },
        data: { quantidade: item.quantidade - 1 },
        include: { produto: true, carrinho: true },
      });
    } else {
      return prisma.itemcarrinho.delete({ where: { id: Number(id) } });
    }
  }

  async deleteItem(id) {
    return prisma.itemcarrinho.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ItemCarrinhoService();
