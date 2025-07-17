export interface CreateOrderDTO {
  userId: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
}
