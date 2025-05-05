import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import './index.css'
import App from './App.tsx'
import Signup from './components/authComponent/Signup.tsx'
import Home from './components/homeComponent/Home.tsx'
import { CartProvider } from './contexts/CarContext.tsx'
import CartComponent from './components/homeComponent/Cart.tsx'
import AdminDashboard from './components/dashboardComponent/Dashboard.tsx'
import CreateProduct from './components/dashboardComponent/CreateProduct.tsx'
import GetOrders from './components/dashboardComponent/GetOrders.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/cart',
    element: <CartComponent />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/dashboard',
    element: <AdminDashboard />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/create-product',
    element: <CreateProduct />,
    errorElement: <div>Not Found</div>,
  },
  {
    path: '/orders',
    element: <GetOrders />,
    errorElement: <div>Not Found</div>,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
