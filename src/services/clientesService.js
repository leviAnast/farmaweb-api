const prisma = require('../config/prismaClient.js');

class ClientesService {
  async getAllClientes() {
    return prisma.cliente.findMany({
      include: { pedidos: true, favoritos: true, endereco: true },
    });
  }

  async getClienteById(id) {
    return prisma.cliente.findUnique({
      where: { id: Number(id) },
      include: { pedidos: true, favoritos: true, endereco: true },
    });
  }

  async createCliente(data) {
    return prisma.cliente.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone,
        endereco: { connect: { id: Number(data.endereco_id) } },
      },
    });
  }

  async updateCliente(id, data) {
    return prisma.cliente.update({
      where: { id: Number(id) },
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone,
        endereco_id: data.endereco_id ? { connect: { id: Number(data.endereco_id) } } : undefined,
      },
    });
  }

  async deleteCliente(id) {
    return prisma.cliente.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ClientesService();
