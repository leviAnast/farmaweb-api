const prisma = require('../config/prismaClient.js');

class VendedoresService {
  async getAllVendedores() {
    return prisma.vendedor.findMany({
      include: { produtos: true },
    });
  }

  async getVendedorById(id) {
    return prisma.vendedor.findUnique({
      where: { id: Number(id) },
      include: { produtos: true }, 
    });
  }

  async createVendedor(data) {
    return prisma.vendedor.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone,
        departamento: data.departamento,
      },
    });
  }

  async updateVendedor(id, data) {
    return prisma.vendedor.update({
      where: { id: Number(id) },
      data: {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        telefone: data.telefone,
        departamento: data.departamento,
      },
    });
  }

  async deleteVendedor(id) {
    return prisma.vendedor.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new VendedoresService();
