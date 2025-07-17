import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterRequest } from '../models/Auth';
import { registerService } from '../services/signupService';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'cliente'>('cliente'); // Default role
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent, registerRequest: RegisterRequest, navigate: ReturnType<typeof useNavigate>): Promise<void> => {
    e.preventDefault();
    
    try {
      const data = await registerService(registerRequest);
      alert(data.message || 'Registro exitoso. Ahora puede iniciar sesión.');
      navigate('/'); // Redirect to login or home page after successful signup
    } catch (error) {
      console.error('Signup error:', error);
      alert("Error al registrarse. Por favor, inténtelo de nuevo.");
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
