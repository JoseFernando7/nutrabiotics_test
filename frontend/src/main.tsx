import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import './index.css'
import App from './App.tsx'
import Signup from './auth/components/Signup.tsx'
import Home from './home/components/Home.tsx'
import { CartProvider } from './shared/hooks/contexts/CartContext.tsx'
import CartComponent from './home/components/Cart.tsx'
import AdminDashboard from './dashboard/components/Dashboard.tsx'
import CreateProduct from './dashboard/components/CreateProduct.tsx'
import GetOrders from './dashboard/components/GetOrders.tsx'

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
