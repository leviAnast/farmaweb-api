const prisma = require('../config/prismaClient.js');

class PedidoCanceladoService {
  async createPedidoCancelado(data) {
    return prisma.pedidocancelado.create({
      data: {
        motivo: data.motivo,
        data_cancelamento: data.data_cancelamento || new Date(),
        pedido: { connect: { id: Number(data.pedido_id) } }, 
      },
    });
  }

  async getPedidoCanceladoById(id) {
    return prisma.pedidocancelado.findUnique({
      where: { id: Number(id) },
      include: { pedido: true },
    });
  }

  async getPedidoCanceladoByPedido(pedido_id) {
    return prisma.pedidocancelado.findUnique({
      where: { pedido_id: Number(pedido_id) },
      include: { pedido: true },
    });
  }

  async updatePedidoCancelado(id, data) {
    return prisma.pedidocancelado.update({
      where: { id: Number(id) },
      data: {
        motivo: data.motivo,
        data_cancelamento: data.data_cancelamento || undefined,
      },
    });
  }

  async deletePedidoCancelado(id) {
    return prisma.pedidocancelado.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PedidoCanceladoService();
