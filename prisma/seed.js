const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(" enviando dados pra teste");

  const categoria = await prisma.categoria.create({
    data: { nome: "Medicamentos" },
  });

  const cliente = await prisma.cliente.create({
    data: {
      nome: "Usuário Teste",
      email: "teste@farmaweb.com",
      senha: "123456",
      telefone: "999999999",
      endereco: {
        create: {
          rua: "Rua Teste",
          numero: "123",
          bairro: "Centro",
          cidade: "Fortaleza",
          estado: "CE",
          cep: "60000000",
        },
      },
    },
  });

  const produto = await prisma.produto.create({
    data: {
      nome: "Dipirona 500mg",
      descricao: "Medicamento para dor e febre",
      preco: 12.90,
      qtd_estoque: 100,
      categoria_id: categoria.id,
      imagemPrincipal: "https://example.com/dipirona.jpg"
    },
  });

  console.log(" the end");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
