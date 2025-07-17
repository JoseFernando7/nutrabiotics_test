import { Request, Response } from 'express'
import * as productService from '../services/productService'
import { CreateProductDTO } from '../dtos/product/createProductDto'

export const createProduct = async (request: Request, response: Response): Promise<void> => {
  try {
    const productData: CreateProductDTO = request.body
    const product = await productService.createProduct(productData)
    response.status(201).json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    response.status(500).json({ messageError: 'Error creating the product' })
  }
}

export const getAllProducts = async (request: Request, response: Response): Promise<void> => {
  try {
    const products = await productService.getAllProducts()
    response.status(200).json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    response.status(500).json({ messageError: 'Error fetching products' })
  }
}

export const getProductById = async (request: Request, response: Response): Promise<void> => {
  try {
    const productId = request.params.id
    const product = await productService.getProductById(productId)
    if (product !== null) {
      response.status(200).json(product)
    } else {
      response.status(404).json({ messageError: 'Product not found' })
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    response.status(500).json({ messageError: 'Error fetching the product' })
  }
}

export const updateProduct = async (request: Request, response: Response): Promise<void> => {
  try {
    const productId = request.params.id
    const productData: Partial<CreateProductDTO> = request.body
    const updatedProduct = await productService.updateProduct(productId, productData)
    if (updatedProduct !== null) {
      response.status(200).json(updatedProduct)
    } else {
      response.status(404).json({ messageError: 'Product not found' })
    }
  } catch (error) {
    console.error('Error updating product:', error)
    response.status(500).json({ messageError: 'Error updating the product' })
  }
}

export const deleteProduct = async (request: Request, response: Response): Promise<void> => {
  try {
    const productId = request.params.id
    const result = await productService.deleteProduct(productId)
    response.status(200).json(result)
  } catch (error) {
    console.error('Error deleting product:', error)
    response.status(500).json({ messageError: 'Error deleting the product' })
  }
}
