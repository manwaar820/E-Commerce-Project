import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CartModal from '@/components/CartModal'
import { CartProvider } from '@/context/CartContext'
import mockCart from '@/__mocks__/mockCart'

describe('CartModal', () => {
  it('renders the cart modal with hardcoded data', async () => {
    // Setting mock data into localStorage
    global.localStorage.setItem('cart', JSON.stringify(mockCart))
    // Mocking the removeItem function on localStorage
    const consoleLogSpy = jest.spyOn(console, 'log')

    // Rendering the CartModal component
    render(
      <CartProvider>
        <CartModal />
      </CartProvider>
    )

    // Debugging the rendered output
    // screen.debug()

    // Find and click the Remove button
    const removeButton = screen.getByText('Remove')
    expect(removeButton).toBeInTheDocument()
    fireEvent.click(removeButton)

    // Assert console.log was called
    expect(consoleLogSpy).toHaveBeenCalledWith('Cart removed')

    // Clean up
    consoleLogSpy.mockRestore()
  })
})
