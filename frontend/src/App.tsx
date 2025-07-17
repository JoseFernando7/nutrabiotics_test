import { Outlet } from 'react-router-dom'
import './App.css'
import Login from './auth/components/Login'

function App() {
  return (
    <div className='app-container'>
      <Login />
      <Outlet />
    </div>
  )
}

export default App
