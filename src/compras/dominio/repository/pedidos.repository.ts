import { Pedidos } from "../entities/pedidos";

export interface PedidosRepository {
    createPedidos(pedidos: Pedidos): Promise<any>;
}