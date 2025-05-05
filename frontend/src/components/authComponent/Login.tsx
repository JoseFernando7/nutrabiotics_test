import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginRequest, LoginResponse } from '../../models/Auth'
import { JwtPayload } from '../../models/JwtPayload'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent, loginRequest: LoginRequest, navigate: ReturnType<typeof useNavigate>): Promise<void> => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const data: LoginResponse = await response.json()
      console.log('Data:', data)
      localStorage.setItem('token', data.token) // Store the token in local storage

      // Decode the JWT token to get user role
      const base64Payload = data.token.split('.')[1]
      const decodedPayload = atob(base64Payload)
      const parsedPayload: JwtPayload = JSON.parse(decodedPayload)

      if (parsedPayload.role === 'admin') {
        navigate('/dashboard') // Redirect to admin page
      } else {
        navigate('/home') // Default redirect
      }

    } catch (error) {
      console.error('Login error:', error)
      alert('Inicio de sesión fallido. Verifica tus credenciales.')
    }
  }

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={(e) => handleLogin(e, { username, password }, navigate)}>
        <h2> Iniciar Sesión </h2>
        <input
          type='text'
          placeholder='Ingresa tu nombre de usuario'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Ingresa tu contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'> Entrar </button>
      </form>

      <div>
        <h3> ¿No tienes una cuenta? </h3>
        <button onClick={() => navigate('/signup')}> Regístrate aquí </button>
      </div>
    </div>
  )
}
