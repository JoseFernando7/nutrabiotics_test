import { Request, Response } from 'express'
import * as orderService from '../services/orderService'
import { CreateOrderDTO } from '../dtos/order/createrOrderDto'

export const createOrder = async (request: Request, response: Response): Promise<void> => {
  try {
    const orderData: CreateOrderDTO = request.body
    const order = await orderService.createOrder(orderData)
    response.status(201).json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    response.status(500).json({ messageError: 'Error creating the order' })
  }
}

export const getOrderById = async (request: Request, response: Response): Promise<void> => {
  try {
    const orderId = request.params.id
    const order = await orderService.getOrderById(orderId)
    if (order === null) {
      response.status(404).json({ messageError: 'Order not found' })
      return
    }
    response.status(200).json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    response.status(500).json({ messageError: 'Error fetching the order' })
  }
}
