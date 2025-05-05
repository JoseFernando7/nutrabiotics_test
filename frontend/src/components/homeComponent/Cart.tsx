import { ReactNode } from 'react'
import { useCart } from '../../contexts/CarContext'
import { OrderRequest } from '../../models/Order'

const CartComponent: React.FC = (): ReactNode | Promise<ReactNode> => {
  const { cart, clearCart } = useCart()
  const token = localStorage.getItem('token')

  const handleConfirmOrder = () => {
    if (token === null) {
      alert('No estás autenticado')
      return
    }

    // Get the user id from the token
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    const userId = decodedToken.userId

    const orderRequest: OrderRequest = {
      userId: userId,
      items: cart.map((product) => ({
        productId: product.productId,
        productName: product.name,
        quantity: 1, // Assuming quantity is always 1 for simplicity
        price: product.price,
      })),
    }

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(orderRequest),
    })
      .then((response) => {
        if (response.ok) {
          clearCart()
          alert('Órden realizada con éxito')
        } else {
          alert('Falló al realizar la orden')
        }
      })
      .catch((error) => {
        console.error('Error al realizar la orden:', error)
      })
    }

  return (
    <div>
      <h2> Carrito de Compras </h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.productId}>
              {product.name} - ${product.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleConfirmOrder}> Confirmar orden </button>
    </div>
  )
}

export default CartComponent
