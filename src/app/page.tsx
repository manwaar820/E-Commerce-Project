import ProductPage from '@/components/ProductPage'
import { CartProvider } from '../context/CartContext'
import ErrorBoundary from '../components/ErrorBoundary'

const HomePage = () => {
  return (
    <ErrorBoundary>
      <CartProvider>
        <ProductPage />
      </CartProvider>
    </ErrorBoundary>
  )
}

export default HomePage
