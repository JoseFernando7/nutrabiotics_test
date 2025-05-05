import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateProduct: React.FC = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price }),
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Producto creado:', data)
      
      alert('Producto creado con éxito')
      setName('')
      setPrice(0)
    } else {
      alert('Error al crear el producto')
      console.error('Error al crear el producto')
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
