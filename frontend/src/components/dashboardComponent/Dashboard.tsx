import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../models/Product'
import ProductCard from '../homeComponent/ProductCard'

const AdminDashboard: React.FC = () => {
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="admin-dashboard">
      <nav>
        <button onClick={handleLogout}> Cerrar Sesión </button>
        <button onClick={() => navigate('/create-product')}>
          Crear Producto
        </button>
        <button onClick={() => navigate('/orders')}>
          Ver Órdenes
        </button>
      </nav>

      <h1> Bienvenid@, admin </h1>
      <h3> Nuestros productos </h3>
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
          />
        ))}
    </div>
  )
}

export default AdminDashboard
