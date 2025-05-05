interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderRequest {
  userId: string;
  items: OrderItem[];
}
