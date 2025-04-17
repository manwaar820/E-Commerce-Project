import { render, screen, fireEvent } from '@testing-library/react'
import ProductPage from '@/components/ProductPage'
import { CartProvider } from '@/context/CartContext'

// Mock the hook and components if needed
jest.mock('@/hooks/useLocalStorage', () => {
  return () => [
    {
      name: 'Mock Product',
      description: 'Mock Description',
      price: 100,
      Details: 'Mock detailed product info.',
    },
  ]
})

jest.mock('@/components/ProductImages', () => () => <div>Mock Image</div>)
jest.mock('@/components/Add', () => () => <div>Mock Add To Cart</div>)

describe('ProductPage', () => {
  it('renders product name, description, and prices', () => {
    render(
      <CartProvider>
        <ProductPage />
      </CartProvider>
    )

    expect(screen.getByText('Mock Product')).toBeInTheDocument()
    expect(screen.getByText('Mock Description')).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()
    expect(screen.getByText('$90.00')).toBeInTheDocument()
  })
  it('toggles detailed text when "Read More..." is clicked', () => {
    render(
      <CartProvider>
        <ProductPage />
      </CartProvider>
    )

    const toggle = screen.getByText('Read More...')
    expect(
      screen.queryByText('Mock detailed product info.')
    ).not.toBeInTheDocument()

    fireEvent.click(toggle)
    expect(screen.getByText('Mock detailed product info.')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Close'))
    expect(
      screen.queryByText('Mock detailed product info.')
    ).not.toBeInTheDocument()
  })
  it('renders the ProductImages component', () => {
    render(
      <CartProvider>
        <ProductPage />
      </CartProvider>
    )
    expect(screen.getByText('Mock Image')).toBeInTheDocument()
  })
  it('renders the Add component', () => {
    render(
      <CartProvider>
        <ProductPage />
      </CartProvider>
    )
    expect(screen.getByText('Mock Add To Cart')).toBeInTheDocument()
  })
})
