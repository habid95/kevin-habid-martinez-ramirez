
import { OneProduct } from './pages/OneProduct'
import { Product } from './pages/Product'

export const ProductsRoutes = [
  {
    path: '*',
    element: <Product />,
    index: true
  },
  {
    path: ':Id',
    element: <OneProduct />,
    index: true
  }
]
