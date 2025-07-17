import {useEffect, useState} from 'react'
import { OrderRequest } from '../../shared/models/Order'
import { useNavigate } from 'react-router-dom'
import { getAllorders } from '../services/GetOrders'

const GetOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderRequest[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    getAllorders()
      .then((data) => setOrders(data))
      .catch((error) => {
        console.error('Error fetching orders:', error)
        alert('Error al obtener las órdenes')
      })
  }, [])

  return (
    <div>
      <nav>
        <button onClick={() => navigate('/dashboard')}> Volver al dashboard </button>
      </nav>

      <h1> Órdenes recibidas </h1>
      
      {orders.map((order) => (
        <div key={order.userId}>
          <h2> Orden de {order.userId} </h2>
          <p> Productos: </p>
          <ul>
            {order.items.map((product, index) => (
              <li key={index}>
                {product.productName} - ${product.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default GetOrders
