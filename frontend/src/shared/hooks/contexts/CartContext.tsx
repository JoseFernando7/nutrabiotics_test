import React, { createContext, useState } from 'react'
import { Product } from '../../models/Product'

export interface CartContextType {
  cart: Product[]
  addToCart: (product: Product) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product])
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
