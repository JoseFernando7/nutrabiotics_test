import { Request, Response } from 'express'
import * as orderService from '../services/orderService'
import { CreateOrderDTO } from '../dtos/createrOrderDto'
import { AuthRequest } from '../../shared/requests/authRequest'

export const createOrder = async (request: Request, response: Response): Promise<void> => {
  const { user } = request as AuthRequest
  const orderData: CreateOrderDTO = request.body

  try {
    const newOrder = await orderService.createOrder(orderData, user)
    response.status(201).json(newOrder)
  } catch (error) {
    if (error instanceof Error && error.message === 'FORBIDDEN_ROLE') {
      response.status(403).json({ messageError: 'Solo los clientes pueden crear órdenes' })
      return
    }
    console.error('Error creating order:', error)
    response.status(500).json({ messageError: 'Error creating the order' })
  }
}

export const getOrders = async (request: Request, response: Response): Promise<void> => {
  try {
    const { user } = request as AuthRequest

    const orders = await orderService.getOrdersService({
      userId: user.userId,
      username: '',
      role: user.role
    })

    response.status(200).json(orders)
  } catch (error) {
    response.status(500).json({ messageError: 'Error al obtener las órdenes' })
  }
}
