const prisma = require('../config/prismaClient.js');

class PedidoService {
  async createPedido(data) {
    return prisma.pedido.create({
      data: {
        usuario_id: Number(data.usuario_id),
        endereco_entrega_id: Number(data.endereco_entrega_id),
        status: data.status,
        total: Number(data.total),
        forma_pagamento: data.forma_pagamento,
      },
    });
  }

  async getPedidoById(id) {
    return prisma.pedido.findUnique({
      where: { id: Number(id) },
      include: { itenspedido: true, pagamentos: true },
    });
  }

  async getPedidosByUsuario(usuario_id) {
    return prisma.pedido.findMany({
      where: { usuario_id: Number(usuario_id) },
      include: { itenspedido: true },
    });
  }

  async updatePedido(id, data) {
    return prisma.pedido.update({
      where: { id: Number(id) },
      data: {
        status: data.status,
        total: data.total ? Number(data.total) : undefined,
        forma_pagamento: data.forma_pagamento,
      },
    });
  }

  async deletePedido(id) {
    return prisma.pedido.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PedidoService();
