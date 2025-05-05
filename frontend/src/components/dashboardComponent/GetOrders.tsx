import {useEffect, useState} from 'react'
import { OrderRequest } from '../../models/Order'
import { useNavigate } from 'react-router-dom'

const GetOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderRequest[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch('http://localhost:3000/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data)
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
