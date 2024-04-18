import { Pedidos } from "../entities/pedidos";

export interface CrearPedidoInterface {
    sendPedidos(pedidos: Pedidos): Promise<any>;
}