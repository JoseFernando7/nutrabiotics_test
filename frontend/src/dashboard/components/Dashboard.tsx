import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../shared/models/Product'
import ProductCard from '../../home/components/ProductCard'
import { getAllProducts } from '../../shared/Services/GetProducts'

const AdminDashboard: React.FC = () => {
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
