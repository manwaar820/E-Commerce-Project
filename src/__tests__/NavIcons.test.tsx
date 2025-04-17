import { render, screen, fireEvent } from '@testing-library/react'
import NavIcons from '@/components/NavIcons'
import { CartProvider } from '@/context/CartContext'
import mockCart from '@/__mocks__/mockCart'

global.localStorage.setItem('cart', JSON.stringify(mockCart))

describe('NavIcons', () => {
  test('should display "Cart is Empty" when there are no items in the cart', () => {
    // Mock the cart as empty
    global.localStorage.setItem('cart', JSON.stringify([]))
    render(
      <CartProvider>
        <NavIcons />
      </CartProvider>
    )

    // Get the cart button container (use correct role or data-testid)
    const cartButton = screen.getByRole('button', { name: /cart/i })

    // Click on the cart button to open the modal
    fireEvent.click(cartButton)

    // Assert that the modal shows "Cart is Empty"
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument()

    // Click again to close the modal
    fireEvent.click(cartButton)

    // Assert that the CartModal is no longer visible
    expect(screen.queryByText(/cart is empty/i)).not.toBeInTheDocument()
  })

  test('should display cart items when there are items in the cart', () => {
    // Mock the cart with items
    global.localStorage.setItem('cart', JSON.stringify(mockCart))

    render(
      <CartProvider>
        <NavIcons />
      </CartProvider>
    )

    // Get the cart button container (use correct role or data-testid)
    const cartButton = screen.getByRole('button', { name: /cart/i })

    // Click on the cart button to open the modal
    fireEvent.click(cartButton)
    // screen.debug()

    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument()

    // Click again to close the modal
    fireEvent.click(cartButton)

    expect(screen.queryByText(/Shopping Cart/i)).not.toBeInTheDocument()
  })
})
