const prisma = require('../config/prismaClient.js');

class ItemPedidoService {
  async addItemPedido(data) {
    return prisma.itempedido.create({
      data: {
        quantidade: Number(data.quantidade),
        preco_unitario: Number(data.preco_unitario),
        pedido: {
          connect: { id: Number(data.pedido_id) },
        },
        produto: {
          connect: { id: Number(data.produto_id) },
        },
      },
      include: { produto: true, pedido: true },
    });
  }

  async getItemPedidoById(id) {
    return prisma.itempedido.findUnique({
      where: { id: Number(id) },
      include: { produto: true, pedido: true },
    });
  }

  async getItensByPedido(pedido_id) {
    return prisma.itempedido.findMany({
      where: {
        pedido: { id: Number(pedido_id) },
      },
      include: { produto: true, pedido: true },
    });
  }

  async updateItemPedido(id, data) {
    return prisma.itempedido.update({
      where: { id: Number(id) },
      data: {
        quantidade: data.quantidade ? Number(data.quantidade) : undefined,
        preco_unitario: data.preco_unitario ? Number(data.preco_unitario) : undefined,
        pedido: data.pedido_id
          ? { connect: { id: Number(data.pedido_id) } }
          : undefined,
        produto: data.produto_id
          ? { connect: { id: Number(data.produto_id) } }
          : undefined,
      },
      include: { produto: true, pedido: true },
    });
  }

  async deleteItemPedido(id) {
    return prisma.itempedido.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ItemPedidoService();
