export interface OrderResponseDTO {
  orderId: string
  userId: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  total: number | null | undefined
  status: string
  createdAt: Date
}
