import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginRequest } from '../models/Auth'
import { JwtPayload } from '../models/JwtPayload'
import { login, decodeJwt } from '../services/loginService'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent, loginRequest: LoginRequest, navigate: ReturnType<typeof useNavigate>): Promise<void> => {
    e.preventDefault()
    
    try {
      const data = await login(loginRequest)

      localStorage.setItem('token', data.token)
      const parsedPayload: JwtPayload = decodeJwt(data.token)

      if (parsedPayload.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/home')
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.')
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
