import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from './modules/auth/pages/LoginPage'
import { ProductsRoutes } from './modules/products/products.route'
import { ProtectedRoute } from './modules/auth/utils/ProtectedRoute'

export const router = createBrowserRouter([
    {
      path: '/products',
      element: <ProtectedRoute />,// Puedes quitar el ProtectedRoute para que sea publico
      errorElement: <div>404 Not Found</div>, 
      children: ProductsRoutes
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/*',
      element: <LoginPage />
    }
  ])

