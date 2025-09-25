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
        endereco: {
          create: {
            rua: data.rua,
            numero: data.numero,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            cep: data.cep,
            complemento: data.complemento || null,
          },
        },
      },
      include: { endereco: true },
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
        endereco: data.endereco
          ? {
              update: {
                rua: data.endereco.rua,
                numero: data.endereco.numero,
                bairro: data.endereco.bairro,
                cidade: data.endereco.cidade,
                estado: data.endereco.estado,
                cep: data.endereco.cep,
                complemento: data.endereco.complemento || null,
              },
            }
          : undefined,
      },
      include: { endereco: true },
    });
  }

  async deleteCliente(id) {
    return prisma.cliente.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new ClientesService();
