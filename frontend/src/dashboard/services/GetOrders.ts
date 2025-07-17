import { OrderRequest } from '../../shared/models/Order'

export const getAllorders = async (): Promise<OrderRequest[]> => {
  const token = localStorage.getItem('token')

  const response = await fetch('http://localhost:3000/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    alert('Error al obtener las órdenes')
    throw new Error(errorData.message || 'Error al obtener las órdenes')
  }

  const data: OrderRequest[] = await response.json()
  return data
}
