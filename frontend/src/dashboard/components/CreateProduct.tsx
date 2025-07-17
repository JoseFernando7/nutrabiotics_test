import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../services/CreateProductService'

const CreateProduct: React.FC = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = await createProduct({ name, price })
      alert(`Producto creado: ${data.name} con precio ${data.price}`)
      setName('')
      setPrice(0)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error al crear el producto:', error)
      alert('Error al crear el producto. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <div>
      <nav>
        <button onClick={() => navigate('/dashboard')}> Volver al dashboard </button>
      </nav>
      
      <h1>Crear Producto</h1>
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Precio del producto"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  )
}

export default CreateProduct
