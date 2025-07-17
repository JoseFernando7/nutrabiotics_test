import { Product } from '../models/Product'

export const getAllProducts = async (): Promise<Product[]> => {
  const token = localStorage.getItem('token')

  const response = await fetch('http://localhost:3000/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    alert('Error al obtener los productos')
    throw new Error(errorData.message || 'Error al obtener los productos')
  }

  const data: Product[] = await response.json()
  return data
}
