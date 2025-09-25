const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const clientesRoutes = require('./routes/clientesRoutes');
const vendedoresRoutes = require('./routes/vendedoresRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriasRoutes = require('./routes/categoriaRoutes');
const favoritoRoutes = require('./routes/favoritoRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const itemCarrinhoRoutes = require('./routes/itemCarrinhoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const pedidoCanceladoRoutes = require('./routes/pedidoCanceladoRoutes');
const itemPedidoRoutes = require('./routes/itemPedidoRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const cartaoRoutes = require('./routes/cartaoRoutes');
const authRoutes = require('./auth/authRoutes');

app.use('/clientes', clientesRoutes);
app.use('/vendedores', vendedoresRoutes);
app.use('/enderecos', enderecoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/favoritos', favoritoRoutes);
app.use('/carrinhos', carrinhoRoutes);
app.use('/itens-carrinho', itemCarrinhoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/pedidos-cancelados', pedidoCanceladoRoutes);
app.use('/itens-pedido', itemPedidoRoutes);
app.use('/pagamentos', pagamentoRoutes);
app.use('/cartoes', cartaoRoutes);
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("FarmaWeb funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em: http://localhost:${PORT}`));
