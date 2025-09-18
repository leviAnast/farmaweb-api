const prisma = require('../config/prismaClient.js');

class PagamentoService {
  async createPagamento(data) {
    return prisma.pagamento.create({
      data: {
        metodo: data.metodo,
        status: data.status,
        valor: Number(data.valor),
        data_pagamento: data.data_pagamento || new Date(),
        pedido: { connect: { id: Number(data.pedido_id) } },
      },
    });
  }

  async getPagamentoById(id) {
    return prisma.pagamento.findUnique({
      where: { id: Number(id) },
      include: { pedido: true },
    });
  }

  async getPagamentosByPedido(pedido_id) {
    return prisma.pagamento.findMany({
      where: { pedido_id: Number(pedido_id) },
      include: { pedido: true },
    });
  }

  async updatePagamento(id, data) {
    return prisma.pagamento.update({
      where: { id: Number(id) },
      data: {
        metodo: data.metodo,
        status: data.status,
        valor: data.valor ? Number(data.valor) : undefined,
        data_pagamento: data.data_pagamento || undefined,
      },
    });
  }

  async deletePagamento(id) {
    return prisma.pagamento.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PagamentoService();
