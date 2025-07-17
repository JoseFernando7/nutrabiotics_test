import { Product } from '../product/models/product'
import { CreateProductDTO } from '../product/dtos/createProductDto'
import { ProductResponseDTO } from '../product/dtos/productResponseDto'

export const createProduct = async (productData: CreateProductDTO): Promise<ProductResponseDTO> => {
  const product = new Product({
    name: productData.name,
    price: productData.price
  })

  const savedProduct = await product.save()

  return ({
    productId: savedProduct._id.toString(),
    name: savedProduct.name,
    price: savedProduct.price
  })
}

export const getAllProducts = async (): Promise<ProductResponseDTO[]> => {
  const products = await Product.find()

  return products.map(product => ({
    productId: product._id.toString(),
    name: product.name,
    price: product.price
  }))
}

export const getProductById = async (productId: string): Promise<ProductResponseDTO | null> => {
  const product = await Product.findById(productId)
  if (product === null) {
    return null
  }

  return {
    productId: product._id.toString(),
    name: product.name,
    price: product.price
  }
}

export const updateProduct = async (productId: string, productData: Partial<CreateProductDTO>): Promise<ProductResponseDTO | null> => {
  const product = await Product.findByIdAndUpdate(productId, productData, { new: true })
  if (product === null) {
    return null
  }

  return {
    productId: product._id.toString(),
    name: product.name,
    price: product.price
  }
}

export const deleteProduct = async (productId: string): Promise<{ message: string }> => {
  const deletedProduct = await Product.findByIdAndDelete(productId)

  if (deletedProduct === null) {
    return { message: 'Product not found' }
  }

  return { message: 'Product deleted successfully' }
}
