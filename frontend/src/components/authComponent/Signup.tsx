import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterRequest, RegisterResponse } from '../../models/Auth';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'cliente'>('cliente'); // Default role
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent, registerRequest: RegisterRequest, navigate: ReturnType<typeof useNavigate>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerRequest),
      });

      if (!response.ok) {
        const errorData: { message: string } = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      const data: RegisterResponse = await response.json();
      alert(data.message || 'Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Error al registrarse. Inténtalo de nuevo.');
    }
  };

  return (
    <div className='signup-container'>
      <h2> Registrarse </h2>
      <form onSubmit={(e) => handleSignup(e, { username, password, role }, navigate)}>
        <input
          type='text'
          placeholder='Ingrese su nombre de usuario'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Ingrese su contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'cliente')}>
          <option value=''>Seleccione su rol</option>
          <option value='cliente'>Cliente</option>
          <option value='admin'>Admin</option>
        </select>
        <button type='submit'> Registrarse </button>
      </form>
    </div>
  );
}
