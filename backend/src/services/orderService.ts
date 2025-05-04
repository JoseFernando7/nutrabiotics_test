import { Order } from '../models/order'
import { CreateOrderDTO } from '../dtos/order/createrOrderDto'
import { OrderResponseDTO } from '../dtos/order/orderResponseDto'

export const createOrder = async (orderData: CreateOrderDTO): Promise<OrderResponseDTO> => {
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

export const getOrderById = async (orderId: string): Promise<OrderResponseDTO | null> => {
  const order = await Order.findById(orderId)
  if (order === null) {
    return null
  }

  return ({
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
  })
}
