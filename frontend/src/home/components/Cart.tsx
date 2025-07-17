import { ReactNode } from 'react'
import { useCart } from '../../shared/hooks/UseCart'
import { OrderRequest } from '../../shared/models/Order'
import { confirmOrder } from '../services/ConfirmOrderService'
import { decodeToken } from '../utils/JwtUtils'
import { DecodedToken } from '../models/DecodedToken'

const CartComponent: React.FC = (): ReactNode | Promise<ReactNode> => {
  const { cart, clearCart } = useCart()
  const token = localStorage.getItem('token')

  const handleConfirmOrder = () => {
    if (token === null) {
      alert('No estás autenticado')
      return
    }

    // Get the user id from the token
    const decodedToken: DecodedToken | null = decodeToken(token);

    if (!decodedToken || !decodedToken.userId) {
      alert('Token inválido o usuario no encontrado')
      return
    }

    const orderRequest: OrderRequest = {
      userId: decodedToken.userId,
      items: cart.map((product) => ({
        productId: product.productId,
        productName: product.name,
        quantity: 1, // Assuming quantity is always 1 for simplicity
        price: product.price,
      })),
    }

    confirmOrder(orderRequest)
      .then(() => {
        alert('Orden confirmada con éxito')
        clearCart()
      })
      .catch((error) => {
        console.error('Error al confirmar la orden:', error)
        alert('Error al confirmar la orden, inténtalo nuevamente.')
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
