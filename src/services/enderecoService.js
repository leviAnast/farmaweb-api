const prisma = require('../config/prismaClient.js');

class EnderecoService {
  async getAllEnderecos() {
    return prisma.endereco.findMany({
      include: { clientes: true, pedidos: true },
    });
  }

  async getEnderecoById(id) {
    return prisma.endereco.findUnique({
      where: { id: Number(id) },
      include: { clientes: true, pedidos: true },
    });
  }

  async createEndereco(data) {
    return prisma.endereco.create({
      data,
    });
  }

  async updateEndereco(id, data) {
    return prisma.endereco.update({
      where: { id: Number(id) },
      data,
    });
  }

  async deleteEndereco(id) {
    return prisma.endereco.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new EnderecoService();
