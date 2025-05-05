import ProductCard from './ProductCard'
import { Product } from '../../models/Product'
import { useCart } from '../../contexts/CarContext'
import { useNavigate } from 'react-router-dom'

import { ReactNode, useEffect, useState } from 'react'

const Home: React.FC = (): ReactNode | Promise<ReactNode> => {
  const { addToCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])

  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:3000/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
  }, [])

  const handleOrder = (productId: string) => {
    const productToOrder = products.find((product) => product.productId === productId)
    if (productToOrder) {
      addToCart(productToOrder)
      console.log(`Product ordered: ${productToOrder.name}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <>
      <div className="product-container">
        <nav>
          <button onClick={handleLogout}> Cerrar Sesión </button>
          <button onClick={() => navigate('/cart')}> Ver Carrito </button>
        </nav>
        <h1> Bienvenido! </h1>
        <h3> Nuestros productos </h3>
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            onOrder={handleOrder}
          />
        ))}
      </div>
    </>
  )
}

export default Home
