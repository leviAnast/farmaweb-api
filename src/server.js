const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientesRoutes');

app.use(express.json());

app.use('/clientes', clientesRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
