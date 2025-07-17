import { Router } from 'express'

import { createOrder, getOrders } from '../controllers/orderController'

const router = Router()

/**
 * @swagger
 * /orders:
 *  post:
 *    summary: Crear una nueva orden
 *    description: Crea una nueva orden con los datos proporcionados
 *    tags: [Orders]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                description: ID del usuario que realiza la orden
 *              items:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    productId:
 *                      type: string
 *                      description: ID del producto
 *                    productName:
 *                      type: string
 *                      description: Nombre del producto
 *                    price:
 *                      type: number
 *                      description: Precio del producto
 *                    quantity:
 *                      type: number
 *                      description: Cantidad del producto
 *
 *    responses:
 *      201:
 *        description: Orden creada exitosamente
 *      400:
 *        description: Datos inválidos o faltantes
 *      500:
 *        description: Error interno del servidor
 */
router.post('/', createOrder)

/**
 * @swagger
 * /orders:
 *  get:
 *    summary: Listar órdenes
 *    description: Obtiene una lista de órdenes, si es llamada por un admin, obtiene todas las órdenes, si es llamada por un cliente, obtiene solo sus órdenes
 *    tags: [Orders]
 *
 *    responses:
 *      200:
 *        description: Órdenes obtenidas exitosamente
 *      500:
 *        description: Error interno del servidor
 */
router.get('/', getOrders)

export default router
