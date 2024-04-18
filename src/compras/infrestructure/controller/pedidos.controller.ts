import { Request, Response } from "express";
import { PedidoApplication } from "../../application/useCases/pedidos.aplication";
import { MysqlRepository } from "../dataAccess/mysql.repository";
import { Pedidos } from "../../dominio/entities/pedidos";
import { PedidosRepository } from "../../application/service/rabbit.usecase";
import { clients } from "../../../../scoket/socket";


const mysqlRepository = new MysqlRepository();
const pagoAppService = new PedidoApplication(mysqlRepository);
const pedidosRepository = new PedidosRepository();

export class PedidosController {

    static async createPedidos(req: Request, res: Response): Promise<void> {

        try {
            const newPedidos: Pedidos = req.body;

            await pagoAppService.createPedidos(newPedidos);
            await pedidosRepository.sendPedidos(newPedidos);

            const notificacion = {
                message: 'El pago se hizo de manera correcta, el pedido se a realizado'
            };
            clients.forEach(ws => {
                ws.send(JSON.stringify(notificacion));
            })

            res.status(201).json({
                message: 'El pedido fue creado con exito',
                pedido: newPedidos
            });
        } catch ( error ) {
            console.log('Hubo un error al crear el pedido', error);
            res.status(500).json({
                 error: 'Hubo un error al crear el pedido'
            })
        }
    }
}