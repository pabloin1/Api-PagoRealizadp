import express from  'express';
import { PedidosController } from '../controller/pedidos.controller';
import { accountLimiter } from '../../../peticiones/limit.peticiones';
export const router = express.Router();

router.post('/', accountLimiter, PedidosController.createPedidos);

export default router;