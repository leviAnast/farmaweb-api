const express = require('express');
const app = express();
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



app.use(express.json());

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

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Servidor rodando em:  http://localhost:${PORT}`));
