import { CreateProductRequest, CreateProductResponse } from '../models/ProductDtos'

export const createProduct = async (product: CreateProductRequest): Promise<CreateProductResponse> => {
  const token = localStorage.getItem('token')

  const response = await fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    const errorData = await response.json()
    alert('Error al crear el producto')
    throw new Error(errorData.message || 'Error al crear el producto')
  }

  const data: CreateProductResponse = await response.json()
  alert('Producto creado con éxito')
  return data
}
