import { coneccToRabbitMQ } from "../../../rabbit/rabbitmqtt.config";
import { Pedidos } from "../../dominio/entities/pedidos";
import { CrearPedidoInterface } from "../../dominio/service/pedidos.service";

export class PedidosRepository implements CrearPedidoInterface {
    async  sendPedidos(pedidos: Pedidos): Promise<boolean> {
         try {
            const channel = await coneccToRabbitMQ();
            await channel.sendToQueue('pedidos', Buffer.from(JSON.stringify({message: 'Pedido enviado', pedidos})));
            console.log('RabbitMQ', pedidos);
            await channel.close();
            return true;
         } catch ( error ){
            console.error('Error al enviar el pedido a RabbitMQ', error);
            return false;
    }
}
}