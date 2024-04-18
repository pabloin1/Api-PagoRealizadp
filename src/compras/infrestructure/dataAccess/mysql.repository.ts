import { query } from "../../../database/db.config";
import { Pedidos } from "../../dominio/entities/pedidos";
import { PedidosRepository } from "../../dominio/repository/pedidos.repository";

export class MysqlRepository implements PedidosRepository {

    createPedidos = async(pedidos: Pedidos): Promise<any> => {
         const sql = 'INSERT INTO pedidos(datos_pago) VALUES (?)';
         const params = [pedidos.datos_pago];

         try {
            const result = await query(sql, params);
            return result;
         } catch ( error ){
            console.log('Hubo un error al crear el pedido en mysql', error);
            throw new Error('Error al crear el pedido en Mysql');
         }
    }
}