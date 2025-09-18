const prisma = require('../config/prismaClient.js');

class ItemPedidoService {
  async addItemPedido(data) {
    return prisma.itempedido.create({
      data: {
        pedido_id: Number(data.pedido_id),
        produto_id: Number(data.produto_id),
        quantidade: Number(data.quantidade),
        preco_unitario: Number(data.preco_unitario),
      },
    });
  }

  async getItemPedidoById(id) {
    return prisma.itempedido.findUnique({
      where: { id: Number(id) },
      include: { produto: true },
    });
  }

  async getItensByPedido(pedido_id) {
    return prisma.itempedido.findMany({
      where: { pedido_id: Number(pedido_id) },
      include: { produto: true },
    });
  }

  async updateItemPedido(id, data) {
    return prisma.itempedido.update({
      where: { id: Number(id) },
      data: {
        quantidade: data.quantidade ? Number(data.quantidade) : undefined,
        preco_unitario: data.preco_unitario ? Number(data.preco_unitario) : undefined,
      },
    });
  }

  async deleteItemPedido(id) {
    return prisma.itempedido.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ItemPedidoService();
