import { Outlet } from 'react-router-dom'
import './App.css'
import Login from './components/authComponent/Login'

function App() {
  return (
    <div className='app-container'>
      <Login />
      <Outlet />
    </div>
  )
}

export default App
