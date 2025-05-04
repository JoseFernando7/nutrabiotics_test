import { Router } from 'express'

import { createOrder, getOrderById } from '../controllers/orderController'

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
 * /orders/{id}:
 *  get:
 *    summary: Obtener una orden por ID
 *    description: Obtiene los detalles de una orden específica utilizando su ID
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID de la orden a obtener
 *        schema:
 *          type: string
 *
 *    responses:
 *      200:
 *        description: Detalles de la orden obtenidos exitosamente
 *      404:
 *        description: Orden no encontrada
 *      500:
 *        description: Error interno del servidor
 */
router.get('/:id', getOrderById)

export default router
