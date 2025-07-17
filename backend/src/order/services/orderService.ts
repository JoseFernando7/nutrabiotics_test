import { Order } from '../order/models/order'
import { CreateOrderDTO } from '../order/dtos/createrOrderDto'
import { OrderResponseDTO } from '../order/dtos/orderResponseDto'
import { UserResponseDTO } from '../user/dtos/userResponseDto'
import { Types } from 'mongoose'

export const createOrder = async (orderData: CreateOrderDTO, user: UserResponseDTO): Promise<OrderResponseDTO> => {
  // Check if the user is client
  if (user.role !== 'cliente') {
    throw new Error('FORBIDDEN_ROLE')
  }

  const total = orderData.items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const order = new Order({
    userId: orderData.userId,
    items: orderData.items,
    total,
    status: 'pending'
  })

  const savedOrder = await order.save()

  return ({
    orderId: savedOrder._id.toString(),
    userId: savedOrder.userId.toString(),
    items: savedOrder.items.map(item => ({
      productId: item.productId.toString(),
      productName: item.productName,
      quantity: item.quantity,
      price: item.price
    })),
    total: savedOrder.total,
    status: savedOrder.status,
    createdAt: savedOrder.createdAt
  })
}

export const getOrdersService = async (userResponseDto: UserResponseDTO): Promise<OrderResponseDTO[] | null> => {
  let orders

  // Check if the user is an admin
  // If the user is an admin, fetch all orders
  // If the user is not an admin, fetch only their orders
  if (userResponseDto.role === 'admin') {
    orders = await Order.find()
  } else {
    orders = await Order.find({ userId: new Types.ObjectId(userResponseDto.userId) })
  }

  // Converts the mongoDb documents into OrderResponseDTO's
  return orders.map(order => ({
    orderId: order._id.toString(),
    userId: order.userId.toString(),
    items: order.items.map(item => ({
      productId: item.productId.toString(),
      productName: item.productName,
      quantity: item.quantity,
      price: item.price
    })),
    total: order.total,
    status: order.status,
    createdAt: order.createdAt
  }))
}
