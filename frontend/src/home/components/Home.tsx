import ProductCard from './ProductCard'
import { Product } from '../../shared/models/Product'
import { useCart } from '../../shared/hooks/UseCart'
import { useNavigate } from 'react-router-dom'

import { ReactNode, useEffect, useState } from 'react'
import { getAllProducts } from '../../shared/Services/GetProducts'
import { addProductToCart } from '../services/CartService'

const Home: React.FC = (): ReactNode | Promise<ReactNode> => {
  const { addToCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])

  const navigate = useNavigate()
  
  useEffect(() => {
        getAllProducts()
          .then((setProducts))
          .catch((error) => {
              console.error('Error fetching products:', error)
              alert('Error al obtener los productos')
            })
      }, [])

  // const handleOrder = (productId: string) => {
  //   const productToOrder = products.find((product) => product.productId === productId)
  //   if (productToOrder) {
  //     addToCart(productToOrder)
  //     console.log(`Product ordered: ${productToOrder.name}`)
  //   }
  // }

  const handleOrder = (productId: string) => {
    addProductToCart(productId, products, addToCart)
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
