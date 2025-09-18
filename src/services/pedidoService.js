const prisma = require('../config/prismaClient.js');

class PedidoService {
  async createPedido(data) {
    return prisma.pedido.create({
      data: {
        status: data.status,
        total: Number(data.total),
        forma_pagamento: data.forma_pagamento,
        usuario: {
          connect: { id: Number(data.usuario_id) },
        },
        endereco: {
          connect: { id: Number(data.endereco_entrega_id) },
        },
      },
      include: { itenspedido: true, pagamentos: true, usuario: true, endereco: true },
    });
  }

  async getPedidoById(id) {
    return prisma.pedido.findUnique({
      where: { id: Number(id) },
      include: { itenspedido: true, pagamentos: true, usuario: true, endereco: true },
    });
  }

  async getPedidosByUsuario(usuario_id) {
    return prisma.pedido.findMany({
      where: {
        usuario: { id: Number(usuario_id) },
      },
      include: { itenspedido: true, usuario: true, endereco: true },
    });
  }

  async updatePedido(id, data) {
    return prisma.pedido.update({
      where: { id: Number(id) },
      data: {
        status: data.status,
        total: data.total ? Number(data.total) : undefined,
        forma_pagamento: data.forma_pagamento,
        usuario: data.usuario_id
          ? { connect: { id: Number(data.usuario_id) } }
          : undefined,
        endereco: data.endereco_entrega_id
          ? { connect: { id: Number(data.endereco_entrega_id) } }
          : undefined,
      },
      include: { usuario: true, endereco: true },
    });
  }

  async deletePedido(id) {
    return prisma.pedido.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new PedidoService();
