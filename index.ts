import express from 'express';
import cors from 'cors';
import http from 'http';
import pedidosRouter from './src/compras/infrestructure/routes/pedidos.router';
import { conectarWebSocket } from './scoket/socket';
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());


app.use('/pedidos', pedidosRouter);


const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

conectarWebSocket();