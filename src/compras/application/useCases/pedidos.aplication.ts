import { Pedidos } from "../../dominio/entities/pedidos";
import { PedidosRepository } from "../../dominio/repository/pedidos.repository";

export class PedidoApplication {
    constructor(private pedidoRepository : PedidosRepository) {}

    async createPedidos(pedidos: Pedidos): Promise<any> {
        return await this.pedidoRepository.createPedidos(pedidos);
    }
}